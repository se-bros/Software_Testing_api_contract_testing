import path from "path";
import {
  PactV3,
  MatchersV3,
  SpecificationVersion,
} from "@pact-foundation/pact";
import { API } from "./api";

const { eachLike, like, regex } = MatchersV3;

const authorization = regex(
  "^Bearer \\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$",
  "Bearer 2019-01-14T11:34:18.045Z"
);
const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
};
const authenticatedRequestHeaders = {
  Authorization: authorization,
};
const authenticatedJsonRequestHeaders = {
  ...authenticatedRequestHeaders,
  "Content-Type": "application/json",
};

const productExample = {
  id: "10",
  type: "CREDIT_CARD",
  name: "28 Degrees",
  version: "v1",
};
const productMatcher = {
  id: like(productExample.id),
  type: like(productExample.type),
  name: like(productExample.name),
  version: like(productExample.version),
};

const provider = new PactV3({
  consumer: "eShopConsumer",
  provider: "eShopProductService",
  log: path.resolve(process.cwd(), "logs", "pact.log"),
  logLevel: "warn",
  dir: path.resolve(process.cwd(), "pacts"),
  spec: SpecificationVersion.SPECIFICATION_VERSION_V2,
  host: "127.0.0.1",
});

describe("Product API consumer contract", () => {
  describe("GET /products", () => {
    test("returns all products", async () => {
      await provider.addInteraction({
        states: [{ description: "products exist" }],
        uponReceiving: "a request for all products",
        withRequest: {
          method: "GET",
          path: "/products",
          headers: authenticatedRequestHeaders,
        },
        willRespondWith: {
          status: 200,
          headers: jsonHeaders,
          body: eachLike(productMatcher),
        },
      });

      await provider.executeTest(async (mockService) => {
        const api = new API(mockService.url);

        await expect(api.getAllProducts()).resolves.toStrictEqual([
          productExample,
        ]);
      });
    });

    test("returns an empty list when no products exist", async () => {
      await provider.addInteraction({
        states: [{ description: "no products exist" }],
        uponReceiving: "a request for all products when none exist",
        withRequest: {
          method: "GET",
          path: "/products",
          headers: authenticatedRequestHeaders,
        },
        willRespondWith: {
          status: 200,
          headers: jsonHeaders,
          body: [],
        },
      });

      await provider.executeTest(async (mockService) => {
        const api = new API(mockService.url);

        await expect(api.getAllProducts()).resolves.toStrictEqual([]);
      });
    });
  });

  describe("GET /product/:id", () => {
    test("returns the requested product", async () => {
      await provider.addInteraction({
        states: [{ description: "product with ID 10 exists" }],
        uponReceiving: "a request for product 10",
        withRequest: {
          method: "GET",
          path: "/product/10",
          headers: authenticatedRequestHeaders,
        },
        willRespondWith: {
          status: 200,
          headers: jsonHeaders,
          body: productMatcher,
        },
      });

      await provider.executeTest(async (mockService) => {
        const api = new API(mockService.url);

        await expect(api.getProduct("10")).resolves.toStrictEqual(
          productExample
        );
      });
    });

    test("returns 404 when the product does not exist", async () => {
      await provider.addInteraction({
        states: [{ description: "product with ID 99 does not exist" }],
        uponReceiving: "a request for missing product 99",
        withRequest: {
          method: "GET",
          path: "/product/99",
          headers: authenticatedRequestHeaders,
        },
        willRespondWith: {
          status: 404,
          headers: jsonHeaders,
          body: {
            message: like("Product not found"),
          },
        },
      });

      await provider.executeTest(async (mockService) => {
        const api = new API(mockService.url);

        await expect(api.getProduct("99")).rejects.toMatchObject({
          response: {
            status: 404,
            data: { message: "Product not found" },
          },
        });
      });
    });
  });

  describe("POST /products", () => {
    const newProduct = {
      type: "CREDIT_CARD",
      name: "New Rewards Card",
      version: "v1",
    };
    const createdProduct = {
      id: "12",
      ...newProduct,
    };

    test("creates a product", async () => {
      await provider.addInteraction({
        states: [{ description: "a product can be created" }],
        uponReceiving: "a request to create a product",
        withRequest: {
          method: "POST",
          path: "/products",
          headers: authenticatedJsonRequestHeaders,
          body: {
            type: like(newProduct.type),
            name: like(newProduct.name),
            version: like(newProduct.version),
          },
        },
        willRespondWith: {
          status: 201,
          headers: jsonHeaders,
          body: {
            id: like(createdProduct.id),
            type: like(createdProduct.type),
            name: like(createdProduct.name),
            version: like(createdProduct.version),
          },
        },
      });

      await provider.executeTest(async (mockService) => {
        const api = new API(mockService.url);

        await expect(api.createProduct(newProduct)).resolves.toStrictEqual(
          createdProduct
        );
      });
    });

    test("returns 400 when required fields are missing", async () => {
      const invalidProduct = { version: "v1" };

      await provider.addInteraction({
        states: [{ description: "product validation is enabled" }],
        uponReceiving: "an invalid request to create a product",
        withRequest: {
          method: "POST",
          path: "/products",
          headers: authenticatedJsonRequestHeaders,
          body: invalidProduct,
        },
        willRespondWith: {
          status: 400,
          headers: jsonHeaders,
          body: {
            message: like("type and name are required"),
          },
        },
      });

      await provider.executeTest(async (mockService) => {
        const api = new API(mockService.url);

        await expect(api.createProduct(invalidProduct)).rejects.toMatchObject({
          response: {
            status: 400,
            data: { message: "type and name are required" },
          },
        });
      });
    });
  });

  describe("PUT /product/:id", () => {
    const update = {
      type: "CREDIT_CARD",
      name: "28 Degrees Platinum",
      version: "v2",
    };
    const updatedProduct = {
      id: "10",
      ...update,
    };

    test("updates an existing product", async () => {
      await provider.addInteraction({
        states: [{ description: "product with ID 10 exists" }],
        uponReceiving: "a request to update product 10",
        withRequest: {
          method: "PUT",
          path: "/product/10",
          headers: authenticatedJsonRequestHeaders,
          body: {
            type: like(update.type),
            name: like(update.name),
            version: like(update.version),
          },
        },
        willRespondWith: {
          status: 200,
          headers: jsonHeaders,
          body: {
            id: like(updatedProduct.id),
            type: like(updatedProduct.type),
            name: like(updatedProduct.name),
            version: like(updatedProduct.version),
          },
        },
      });

      await provider.executeTest(async (mockService) => {
        const api = new API(mockService.url);

        await expect(api.updateProduct("10", update)).resolves.toStrictEqual(
          updatedProduct
        );
      });
    });

    test("returns 404 when the product does not exist", async () => {
      await provider.addInteraction({
        states: [{ description: "product with ID 99 does not exist" }],
        uponReceiving: "a request to update missing product 99",
        withRequest: {
          method: "PUT",
          path: "/product/99",
          headers: authenticatedJsonRequestHeaders,
          body: update,
        },
        willRespondWith: {
          status: 404,
          headers: jsonHeaders,
          body: {
            message: like("Product not found"),
          },
        },
      });

      await provider.executeTest(async (mockService) => {
        const api = new API(mockService.url);

        await expect(api.updateProduct("99", update)).rejects.toMatchObject({
          response: {
            status: 404,
            data: { message: "Product not found" },
          },
        });
      });
    });
  });

  describe("DELETE /product/:id", () => {
    test("deletes an existing product", async () => {
      await provider.addInteraction({
        states: [{ description: "product with ID 10 exists" }],
        uponReceiving: "a request to delete product 10",
        withRequest: {
          method: "DELETE",
          path: "/product/10",
          headers: authenticatedRequestHeaders,
        },
        willRespondWith: {
          status: 204,
        },
      });

      await provider.executeTest(async (mockService) => {
        const api = new API(mockService.url);

        await expect(api.deleteProduct("10")).resolves.toBe("");
      });
    });

    test("returns 404 when the product does not exist", async () => {
      await provider.addInteraction({
        states: [{ description: "product with ID 99 does not exist" }],
        uponReceiving: "a request to delete missing product 99",
        withRequest: {
          method: "DELETE",
          path: "/product/99",
          headers: authenticatedRequestHeaders,
        },
        willRespondWith: {
          status: 404,
          headers: jsonHeaders,
          body: {
            message: like("Product not found"),
          },
        },
      });

      await provider.executeTest(async (mockService) => {
        const api = new API(mockService.url);

        await expect(api.deleteProduct("99")).rejects.toMatchObject({
          response: {
            status: 404,
            data: { message: "Product not found" },
          },
        });
      });
    });
  });
});
