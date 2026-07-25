Với góc nhìn **QA reviewer**, script hiện tại khá tốt cho **happy-path contract validation**, nhưng có vài assertion đang **quá phụ thuộc dữ liệu seed cụ thể** và chưa kiểm tra đầy đủ các behaviour đã biết trong `KNOWN_BEHAVIOURS`.

Vì `METHOD`, `PATH`, `KNOWN_BEHAVIOURS` đang là placeholder, tôi sẽ review theo hướng **GET collection endpoint** dựa trên script hiện tại.

## 1. Review từng assertion

| Assertion                                | Cần thiết?               | Rủi ro false-positive/negative                                                                         | Đề xuất sửa                                                                                                 |
| ---------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| Status code = 200                        | **Có**                   | Thấp. Đây là assertion chính của happy path                                                            | Giữ nguyên                                                                                                  |
| Response time < 1000ms                   | **Không bắt buộc**       | **False-negative cao**: CI/Newman hoặc máy chậm có thể fail dù API đúng                                | Nếu cần performance test thì tách khỏi functional test. Có thể dùng threshold 2000–3000ms hoặc chỉ cảnh báo |
| Content-Type chứa `application/json`     | **Có**                   | Thấp                                                                                                   | Giữ, nhưng nên normalize header và kiểm tra `Content-Type` tồn tại                                          |
| Body là JSON array                       | **Có**                   | Thấp                                                                                                   | Giữ                                                                                                         |
| Body không empty                         | **Không nên bắt buộc**   | **False-negative**: API hợp lệ có thể trả `[]` khi không có product                                    | Chỉ giữ nếu API contract đảm bảo luôn có ít nhất 1 product                                                  |
| Mỗi product có `id`, `type`, `name`      | **Có**                   | Có thể **false-negative** nếu schema cho phép nullable/optional                                        | Nên validate theo API contract thực tế                                                                      |
| Required fields đúng type                | **Có**                   | Có thể **false-negative** nếu `id` thực tế là number hoặc field có thể null                            | Dùng đúng schema API, không hard-code theo sample response                                                  |
| Seed `09,10,11` có `version`             | **Không nên**            | **False-negative cao** khi seed thay đổi hoặc data bị xoá                                              | Không nên test GET API dựa trên hard-coded DB seed. Nếu cần, test riêng bằng request/query cụ thể           |
| Save first product ID                    | **Không phải assertion** | Có thể tạo state không mong muốn cho các request sau; lấy product đầu tiên không đảm bảo deterministic | Chỉ lưu nếu request tiếp theo thực sự cần ID. Tốt hơn lấy ID theo điều kiện xác định                        |
| `pm.response.json()` gọi nhiều lần       | **Nên sửa**              | Không nghiêm trọng nhưng dư thừa                                                                       | Parse một lần ở đầu script                                                                                  |
| `forEach` khi response không phải array  | **Có rủi ro**            | Nếu assertion array fail, test sau có thể throw exception thay vì fail có message rõ ràng              | Có guard `Array.isArray(jsonData)`                                                                          |
| Không kiểm tra duplicate ID              | **Thiếu**                | API có thể trả dữ liệu trùng mà test vẫn pass                                                          | Thêm nếu `id` phải unique                                                                                   |
| Không kiểm tra `id/type/name` không rỗng | **Thiếu**                | `{id:"", name:""}` vẫn pass                                                                            | Thêm nếu contract yêu cầu non-empty                                                                         |
| Không kiểm tra `type` thuộc enum hợp lệ  | **Thiếu**                | `"INVALID_TYPE"` vẫn pass                                                                              | Thêm nếu API có enum                                                                                        |
| Không kiểm tra `version` format          | **Thiếu**                | `"abc"` vẫn pass                                                                                       | Chỉ thêm nếu contract quy định format/version pattern                                                       |

### Kết luận QA

Tôi sẽ phân loại:

* **Giữ:** status, content type, JSON array, schema cơ bản.
* **Sửa:** response time, empty array, schema validation.
* **Bỏ khỏi generic GET test:** seed IDs `09`, `10`, `11`.
* **Bổ sung:** negative/auth cases, boundary, schema constraints, duplicate ID.
* **Quan trọng nhất:** `KNOWN_BEHAVIOURS` phải được chuyển thành các **test case riêng**, không nên nhét tất cả vào một happy-path request.

---

# 2. Các case còn thiếu

## A. Negative cases

Nếu `KNOWN_BEHAVIOURS` đã xác nhận:

| Case                   |                          Expected |
| ---------------------- | --------------------------------: |
| Thiếu `type`           |                               400 |
| Thiếu `name`           |                               400 |
| `type = null`          |                               400 |
| `name = null`          |                               400 |
| `type = ""`            |                               400 |
| `name = ""`            |                               400 |
| `type` sai enum        |                               400 |
| `name` vượt max length |                               400 |
| Body không phải JSON   |                         400 / 415 |
| JSON malformed         |                               400 |
| Unknown field          | Theo contract: reject hoặc ignore |

**Lưu ý:** Nếu endpoint hiện tại là `GET /products`, các case trên không thuộc request này. Chúng phải được test trong `POST /products` hoặc endpoint tương ứng.

---

## B. Authentication / Authorization

Theo behaviour bạn cung cấp, nên có:

| Case                                   |                      Expected |
| -------------------------------------- | ----------------------------: |
| Không có `Authorization`               |                           401 |
| `Authorization: Bearer` không có token |                           401 |
| Token invalid                          |                           401 |
| Token expired                          |                           401 |
| Sai scheme, ví dụ `Basic ...`          |                           401 |
| Token hợp lệ                           |                           200 |
| Token hợp lệ nhưng không đủ permission | 403, nếu API có authorization |

Đây là nhóm test **rất quan trọng** nhưng script hiện tại hoàn toàn chưa cover.

---

## C. Boundary / Data validation

Với response:

* `id` là `string` nhưng có thể là `""`
* `type` là `string` nhưng có thể là `""`
* `name` là `string` nhưng có thể là `""`
* `version` là `string` nhưng có thể là `""`

Nếu contract yêu cầu non-empty thì nên test.

Ngoài ra:

* Duplicate `id`
* Null field
* Unexpected field
* Wrong data type
* Empty array
* Large response
* Pagination nếu endpoint hỗ trợ `page`, `limit`, `offset`
* Sorting nếu có
* Filtering nếu có

---

# 3. Script đã chỉnh — Full Postman Tests

Đây là version tôi khuyên dùng cho **happy-path `GET /products`**. Tôi cố ý **loại bỏ assertion seed `09/10/11`** vì đó là data-specific test và nên tách thành test riêng.

```javascript
// ============================================================
// GET /products - Postman Tests
// Purpose:
// - Validate HTTP status
// - Validate response headers
// - Validate response JSON structure
// - Validate product schema
// - Validate data integrity
// ============================================================


// ------------------------------------------------------------
// 1. HTTP Status
// ------------------------------------------------------------

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});


// ------------------------------------------------------------
// 2. Response Content-Type
// ------------------------------------------------------------

pm.test("Content-Type is application/json", function () {
    const contentType = pm.response.headers.get("Content-Type");

    pm.expect(
        contentType,
        "Response should contain Content-Type header"
    ).to.exist;

    pm.expect(
        contentType.toLowerCase(),
        "Content-Type should be application/json"
    ).to.include("application/json");
});


// ------------------------------------------------------------
// 3. Parse Response Body
// ------------------------------------------------------------

let jsonData;

pm.test("Response body is valid JSON", function () {
    jsonData = pm.response.json();

    pm.expect(jsonData).to.exist;
});


// ------------------------------------------------------------
// 4. Response is an Array
// ------------------------------------------------------------

pm.test("Response body is a JSON array", function () {
    pm.expect(jsonData).to.be.an("array");
});


// ------------------------------------------------------------
// 5. Product Schema Validation
// ------------------------------------------------------------

pm.test("Every product has required fields", function () {
    pm.expect(jsonData).to.be.an("array");

    jsonData.forEach(function (product, index) {
        pm.expect(
            product,
            `Product at index ${index} should be an object`
        ).to.be.an("object");

        pm.expect(
            product,
            `Product at index ${index} should have id`
        ).to.have.property("id");

        pm.expect(
            product,
            `Product at index ${index} should have type`
        ).to.have.property("type");

        pm.expect(
            product,
            `Product at index ${index} should have name`
        ).to.have.property("name");
    });
});


// ------------------------------------------------------------
// 6. Product Field Types
// ------------------------------------------------------------

pm.test("Product required fields have correct types", function () {
    pm.expect(jsonData).to.be.an("array");

    jsonData.forEach(function (product, index) {
        pm.expect(
            product.id,
            `Product at index ${index}: id should be a string`
        ).to.be.a("string");

        pm.expect(
            product.type,
            `Product at index ${index}: type should be a string`
        ).to.be.a("string");

        pm.expect(
            product.name,
            `Product at index ${index}: name should be a string`
        ).to.be.a("string");
    });
});


// ------------------------------------------------------------
// 7. Required Fields Must Not Be Empty
// ------------------------------------------------------------

pm.test("Product required fields are not empty", function () {
    pm.expect(jsonData).to.be.an("array");

    jsonData.forEach(function (product, index) {
        pm.expect(
            product.id.trim(),
            `Product at index ${index}: id should not be empty`
        ).to.not.equal("");

        pm.expect(
            product.type.trim(),
            `Product at index ${index}: type should not be empty`
        ).to.not.equal("");

        pm.expect(
            product.name.trim(),
            `Product at index ${index}: name should not be empty`
        ).to.not.equal("");
    });
});


// ------------------------------------------------------------
// 8. Product IDs Should Be Unique
// ------------------------------------------------------------

pm.test("Product IDs are unique", function () {
    const productIds = jsonData.map(function (product) {
        return product.id;
    });

    const uniqueProductIds = new Set(productIds);

    pm.expect(
        uniqueProductIds.size,
        "Product IDs should not be duplicated"
    ).to.equal(productIds.length);
});


// ------------------------------------------------------------
// 9. Optional: Validate Known Product Types
// ------------------------------------------------------------
// Only enable this test if the API contract defines
// a fixed enum for product.type.
//
// Example:
// const allowedTypes = [
//     "CREDIT_CARD",
//     "DEBIT_CARD"
// ];
//
// jsonData.forEach(function (product, index) {
//     pm.expect(
//         allowedTypes,
//         `Product at index ${index}: invalid product type`
//     ).to.include(product.type);
// });


// ------------------------------------------------------------
// 10. Optional: Response Time
// ------------------------------------------------------------
// Recommended: Keep performance assertions separate from
// functional API contract tests.
//
// If this is intentionally a smoke/performance threshold:
//
// pm.test("Response time is less than 2000ms", function () {
//     pm.expect(pm.response.responseTime).to.be.below(2000);
// });


// ------------------------------------------------------------
// 11. Save Product ID for Subsequent Requests
// ------------------------------------------------------------
// This is NOT an assertion.
//
// Only save the first ID if subsequent requests really need it.
// The first item may not be deterministic if API ordering changes.

if (
    Array.isArray(jsonData) &&
    jsonData.length > 0 &&
    jsonData[0].id
) {
    pm.environment.set(
        "product_id",
        jsonData[0].id
    );
}
```

### Một điểm QA quan trọng

Nếu đây là test cho **`GET /products`**, tôi **không khuyến nghị** assertion:

```javascript
const seedProductIds = ["09", "10", "11"];
```

vì test sẽ bị coupling với database seed. Ví dụ API hoàn toàn đúng nhưng team đổi seed từ:

```text
09, 10, 11
```

sang:

```text
101, 102, 103
```

thì test fail không phải vì API bug.

Thay vào đó, nếu requirement thực sự là:

> Product `09`, `10`, `11` bắt buộc phải tồn tại và có `version`

thì nên viết **một test data integrity riêng**, ví dụ:

```javascript
pm.test("Seed products 09, 10, 11 exist and have version", function () {
    const products = pm.response.json();

    const requiredProductIds = ["09", "10", "11"];

    requiredProductIds.forEach(function (requiredId) {
        const product = products.find(function (item) {
            return item.id === requiredId;
        });

        pm.expect(
            product,
            `Product ${requiredId} should exist`
        ).to.exist;

        pm.expect(
            product,
            `Product ${requiredId} should have version`
        ).to.have.property("version");

        pm.expect(
            product.version,
            `Product ${requiredId}: version should be a string`
        ).to.be.a("string");
    });
});
```

**Verdict:** Script AI sinh ra hiện tại đạt khoảng **7/10 cho happy-path**, nhưng chưa đủ để gọi là một bộ **QA API test hoàn chỉnh**. Lỗi lớn nhất là nó đang trộn **contract test**, **performance test**, **seed-data test** và **test setup** vào cùng một script. Với Postman/Newman CI, tôi sẽ tách thành 4 lớp: **Smoke/Auth → Contract → Negative validation → Data integrity**, như vậy kết quả fail sẽ rõ nguyên nhân hơn.
