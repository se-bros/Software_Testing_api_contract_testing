---
name: contract-testing
description: >
  Sinh bộ contract test theo mô hình consumer-driven với Pact-JS: consumer test sinh pact JSON,
  provider verification kèm state handlers, và cấu hình Pact Broker + can-i-deploy. Skill áp
  dụng quy ước của Nhóm 3 - SEBros: mỗi endpoint một cặp interaction success/error, matcher
  theo kiểu thay vì theo giá trị, provider state đặt tên mô tả. Dùng khi cần kiểm tra tính
  tương thích giữa Consumer và Provider, hoặc mô phỏng breaking change.
---

# Contract Testing Generator (Pact, consumer-driven)

## Mục đích

Sinh bộ contract test kiểm chứng **tính tương thích** giữa một cặp Consumer–Provider, gồm:

1. **Consumer test** — chạy code client thật với mock provider, sinh ra `pact.json`.
2. **Provider verification** — phát lại interaction vào API thật, kèm state handlers.
3. **Cấu hình Broker** — publish pact, publish kết quả verification, `can-i-deploy` gate.

## Khi nào sử dụng

Dùng skill này khi có **đủ cả ba** điều kiện:

- Có ít nhất hai thành phần giao tiếp qua API và **phát triển độc lập**.
- **Bạn kiểm soát được phía Provider** — chạy được test trong CI của Provider và dựng được
  dữ liệu tiên quyết.
- Rủi ro cần chặn là **breaking change tại ranh giới**, không phải lỗi nghiệp vụ.

**Không dùng skill này khi:**

| Tình huống | Lý do | Dùng gì thay thế |
| --- | --- | --- |
| Kiểm tra chức năng một endpoint | Sai lớp test | skill `api-testing` |
| Kiểm tra logic nghiệp vụ, tính toán | Contract chỉ kiểm tra **hình dạng** dữ liệu | Unit test |
| Provider là **API công cộng bạn không sở hữu** | Không dựng được provider state, không chạy được verification trong CI của họ | Xem mục dưới |
| Ứng dụng một khối, một đội, deploy cùng lúc | Không có ranh giới tiến hóa độc lập | Không cần contract test |
| Kiểm tra hạ tầng: DNS, TLS, gateway, timeout | Ngoài phạm vi | Smoke test / monitoring |
| Hành trình qua nhiều service | Một pact chỉ chứng minh **một** ranh giới | E2E |

### Trường hợp Provider là API bên ngoài

Vòng lặp consumer-driven đầy đủ **không áp dụng được** cho API bạn không sở hữu (Swagger
PetStore, API đối tác). Cụ thể: không đăng ký được state handler nên không bảo đảm được điều
kiện tiên quyết, không chạy được verification trong pipeline của họ, không publish được kết
quả. Chạy verifier trực tiếp vào sandbox công cộng sẽ cho kết quả bấp bênh và **sai về mặt
khái niệm**.

Hai phương án hợp lệ khi vẫn muốn demo:

1. **Chỉ làm phía Consumer** — sinh pact file để chứng minh quy trình và công cụ hoạt động,
   nêu rõ rằng bước verification không thực hiện được vì không sở hữu Provider.
2. **Bi-Directional Contract Testing** — nếu Provider công bố OpenAPI spec, đối chiếu chéo
   consumer pact với spec đó thay vì chạy verification. Đây là cách duy nhất tận dụng được
   contract testing với API bên ngoài.

Luôn ghi rõ phương án đã chọn và lý do trong báo cáo.

## Đầu vào bắt buộc

Nếu thiếu, **hỏi gộp một lần**:

| Thông tin | Ví dụ |
| --- | --- |
| Tên Consumer / Provider | `FrontendWebsite` / `ProductService` |
| Code client thật của Consumer | `consumer/src/api.js` — hàm `getProduct(id)` |
| Endpoint Consumer **thực sự dùng** | 5 endpoint CRUD |
| Trường Consumer **thực sự đọc** | chỉ `id`, `name` hay cả 4 trường |
| Cơ chế auth | Bearer ISO-8601 |
| Cách dựng dữ liệu phía Provider | repository in-memory, hàm seed |
| Có dùng Broker không | PactFlow URL + token, hay chỉ file cục bộ |

Câu hỏi **"Consumer thực sự đọc trường nào"** là quan trọng nhất. Mô tả thừa trường không dùng
sẽ khóa tay Provider một cách vô cớ.

## Quy trình 5 bước

### Bước 1 — Lập danh sách interaction

Quy ước của nhóm: **mỗi nhóm API có đúng hai interaction — một luồng thành công và một luồng lỗi.**

| Nhóm API | Interaction 1 | Interaction 2 |
| --- | --- | --- |
| `GET /products` | có dữ liệu | danh sách rỗng |
| `GET /product/:id` | tồn tại | không tồn tại |
| `POST /products` | tạo thành công | lỗi validation |
| `PUT /product/:id` | cập nhật thành công | không tồn tại |
| `DELETE /product/:id` | xóa thành công | không tồn tại |

Lưu ý **danh sách rỗng là một interaction riêng**: với Consumer, "trả mảng rỗng" và "trả mảng
có phần tử" là hai hành vi khác nhau mà giao diện xử lý khác nhau. Nếu Provider đổi từ mảng
rỗng sang `404`, chỉ interaction này bắt được.

### Bước 2 — Đặt tên provider state

Provider state là **điều kiện dữ liệu phải đúng** thì interaction mới có nghĩa. Quy ước đặt tên:

- Viết thành **câu mô tả trạng thái**, không phải câu lệnh: `"product with ID 10 exists"`,
  không phải `"setupProduct10"`.
- Mô tả **dữ liệu**, không mô tả thao tác: `"no products exist"`, không phải `"clear database"`.
- Dùng nhất quán ở cả hai phía — chuỗi này là khóa nối consumer test với state handler.

Bộ state chuẩn của bản tham chiếu:

```text
"products exist"
"no products exist"
"product with ID 10 exists"
"product with ID 99 does not exist"
"a product can be created"
"product validation is enabled"
```

### Bước 3 — Sinh Consumer test

Khuôn mẫu Pact-JS V3:

```javascript
import path from "path";
import { PactV3, MatchersV3, SpecificationVersion } from "@pact-foundation/pact";
import { API } from "./api";

const { eachLike, like, regex } = MatchersV3;

// Auth: khớp theo ĐỊNH DẠNG, không khớp theo giá trị — token đổi mỗi lần chạy
const authorization = regex(
  "^Bearer \\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$",
  "Bearer 2019-01-14T11:34:18.045Z"
);

const productExample = { id: "10", type: "CREDIT_CARD", name: "28 Degrees", version: "v1" };
const productMatcher = {
  id: like(productExample.id),
  type: like(productExample.type),
  name: like(productExample.name),
  version: like(productExample.version),
};

const provider = new PactV3({
  consumer: "FrontendWebsite",
  provider: "ProductService",
  dir: path.resolve(process.cwd(), "pacts"),
  spec: SpecificationVersion.SPECIFICATION_VERSION_V2,
  host: "127.0.0.1",
});

test("returns the requested product", async () => {
  await provider.addInteraction({
    states: [{ description: "product with ID 10 exists" }],
    uponReceiving: "a request for product 10",
    withRequest: {
      method: "GET",
      path: "/product/10",
      headers: { Authorization: authorization },
    },
    willRespondWith: {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: productMatcher,
    },
  });

  await provider.executeTest(async (mockService) => {
    const api = new API(mockService.url);          // <- code client THẬT
    await expect(api.getProduct("10")).resolves.toStrictEqual(productExample);
  });
});
```

**Quy tắc quan trọng nhất:** trong `executeTest`, phải gọi **code client thật của Consumer**
(`new API(...)` rồi `api.getProduct(...)`), không được tự dựng HTTP request bằng tay. Nếu tự
dựng request, pact file sinh ra mô tả một Consumer **tưởng tượng** và contract trở nên vô giá
trị. Đây là lỗi phổ biến nhất khi mới dùng Pact.

### Bước 4 — Sinh Provider verification

```javascript
const { Verifier } = require('@pact-foundation/pact');
const server = createApp().listen(8080);

const opts = {
  providerBaseUrl: "http://127.0.0.1:8080",
  provider: "ProductService",
  providerVersion: process.env.GIT_COMMIT || "local",
  providerVersionBranch: process.env.GIT_BRANCH || "local",

  stateHandlers: {
    "product with ID 10 exists": () => {
      controller.repository.products = new Map([
        ["10", new Product("10", "CREDIT_CARD", "28 Degrees", "v1")]
      ]);
    },
    "no products exist": () => {
      controller.repository.products = new Map();
    },
  },

  // Token trong pact là giá trị đã ghi lại nên đã hết hạn khi verify.
  // requestFilter thay bằng token tươi, giữ nguyên trường hợp KHÔNG có header.
  requestFilter: (req, res, next) => {
    if (!req.headers["authorization"]) { next(); return; }
    req.headers["authorization"] = `Bearer ${new Date().toISOString()}`;
    next();
  },
};

// Ưu tiên Broker, fallback về file cục bộ
if (process.env.PACT_BROKER_URL) {
  Object.assign(opts, {
    pactBrokerUrl: process.env.PACT_BROKER_URL,
    pactBrokerToken: process.env.PACT_BROKER_TOKEN,
    consumerVersionSelectors: [{ latest: true }],
    publishVerificationResult: process.env.PACT_PUBLISH_RESULTS === "true",
  });
} else {
  opts.pactUrls = [path.resolve("../consumer/pacts/FrontendWebsite-ProductService.json")];
}
```

Ba điểm cần giữ:

- **`stateHandlers` phải phủ hết mọi `providerState`** xuất hiện trong pact. Thiếu một cái là
  verification fail với lỗi khó đọc.
- **`requestFilter` xử lý token hết hạn** — token trong pact là bản ghi lại từ lúc sinh contract.
  Nhánh `if (!req.headers["authorization"])` phải giữ nguyên, nếu không sẽ vô tình thêm token
  vào interaction cố ý test trường hợp thiếu token.
- **Fallback về file cục bộ** khi không có Broker, để CI chạy được cho PR từ fork mà không cần secret.

### Bước 5 — Cấu hình Broker và gate

Pipeline ba job nối tiếp:

```text
Job 1 consumer-pact       → chạy consumer test → sinh pact.json → publish lên Broker
Job 2 provider-verification → fetch pact → verify với API thật → publish kết quả
Job 3 can-i-deploy         → tra compatibility matrix → chặn nếu chưa tương thích
```

`can-i-deploy` có **ba** kết quả, không phải hai:

| Kết quả | Hành động | Lý do |
| --- | --- | --- |
| `compatible` | Cho deploy | Đã xác nhận tương thích |
| `failed` | Chặn | Có verification hỏng |
| `unknown` | **Chặn** | Chưa có kết quả — xử lý như thất bại (nguyên tắc fail-safe) |

Nhánh `unknown` chặn deploy là có chủ đích: nếu mặc định cho qua khi thiếu dữ liệu, chỉ cần
một job publish lỗi là cổng an toàn tự mở mà không ai biết.

Biến môi trường: `PACT_BROKER_URL`, `PACT_BROKER_TOKEN` (hoặc `PACT_BROKER_USERNAME` +
`PACT_BROKER_PASSWORD`), `PACT_PUBLISH_RESULTS`. Luôn khai báo dưới dạng CI secret, không
ghi thẳng vào workflow.

## Kỷ luật dùng matcher

Đây là kỹ năng cốt lõi khi viết contract. Mặc định Pact so khớp **chính xác từng giá trị**;
matcher nới lỏng điều đó.

| Loại dữ liệu | Matcher | Lý do |
| --- | --- | --- |
| Trường Consumer đọc, giá trị thay đổi | `like(...)` | Cần đúng kiểu, không cần đúng giá trị |
| Mảng, Consumer lặp qua | `eachLike(...)` | Mô tả phần tử đại diện |
| Token, timestamp, id sinh tự động | `regex(...)` | Chỉ định dạng mới quan trọng |
| Giá trị là giao ước cứng (enum, status) | để nguyên | Đổi là breaking change thật |

Hai lỗi đối xứng cần tránh:

- **Over-specify** — mô tả quá chặt, khóa cả những thứ Consumer không dùng. Hậu quả: Provider
  không tiến hóa được, pipeline đỏ vì thay đổi vô hại.
- **Under-specify** — mô tả quá lỏng, contract không bắt được lỗi thật. Hậu quả: lưới an toàn giả.

Giá trị ví dụ trong `like()` **chỉ là dữ liệu mẫu** để mock provider có cái trả về khi chạy
consumer test; nó không phải điều kiện Provider phải đáp ứng.

## Mô phỏng breaking change

Dùng cho demo và bài tập. Kịch bản chuẩn:

1. Sinh pact và chạy verification — xác nhận **pass**.
2. Ở Provider, đổi tên một trường Consumer đang dùng: `name` → `title`.
3. Chạy lại verification — **fail**, Pact chỉ rõ: mong đợi `name`, nhận được `title`.
4. Khôi phục `name` — verification **pass** trở lại.

Bài học cần rút ra: HTTP status vẫn `200` và API vẫn trả JSON hợp lệ, nhưng đây là breaking
change. Functional test chỉ assert status code sẽ **không** bắt được; contract test bắt được
**theo thiết kế**.

## Đầu ra và vị trí file

```
src/sample-api/{project}/
├── consumer/src/api.pact.spec.js              # consumer test
├── consumer/pacts/{Consumer}-{Provider}.json  # pact sinh ra
└── provider/product/product.pact.test.js      # provider verification
.github/workflows/pact-verification.yml        # CI 3 job
```

## Checklist nghiệm thu

- [ ] Mỗi nhóm API có đủ cặp interaction success + error.
- [ ] Consumer test gọi **code client thật**, không tự dựng HTTP request.
- [ ] Contract chỉ mô tả trường Consumer **thực sự dùng**.
- [ ] Provider state đặt tên mô tả trạng thái, nhất quán hai phía.
- [ ] `stateHandlers` phủ hết mọi provider state trong pact.
- [ ] Token/timestamp dùng `regex`, không so khớp giá trị.
- [ ] `requestFilter` giữ nguyên nhánh không có header Authorization.
- [ ] Có fallback đọc pact từ file khi không cấu hình Broker.
- [ ] `can-i-deploy` chặn cả nhánh `unknown`.
- [ ] Secret Broker khai báo qua CI secret, không nằm trong workflow.
- [ ] Đã chạy thử kịch bản breaking change và xác nhận verification fail đúng chỗ.

## Cạm bẫy thường gặp

| Cạm bẫy | Hậu quả | Cách tránh |
| --- | --- | --- |
| Test tự dựng HTTP request | Contract mô tả Consumer không tồn tại | Gọi API client thật trong `executeTest` |
| Mô tả cả trường không dùng | Khóa tay Provider vô cớ | Chỉ mô tả trường Consumer đọc |
| Thiếu state handler | Verification fail với lỗi khó hiểu | Đối chiếu danh sách state hai phía |
| So khớp token theo giá trị | Fail mỗi lần chạy | Dùng `regex` cho định dạng |
| `requestFilter` thêm token cho mọi request | Interaction test thiếu token bị vô hiệu | Kiểm tra header trước khi ghi đè |
| Quên publish kết quả verification | `can-i-deploy` không có dữ liệu | Đặt `PACT_PUBLISH_RESULTS=true` trong CI |
| Coi `unknown` là an toàn | Cổng deploy tự mở khi publish lỗi | Chặn cả `unknown` |
| Chạy verifier vào API công cộng | Kết quả bấp bênh, sai khái niệm | Xem mục "Provider là API bên ngoài" |
| Kỳ vọng contract test bắt lỗi nghiệp vụ | Hiểu sai phạm vi | Contract kiểm tra hình dạng, không kiểm tra giá trị đúng |

## Bản tham chiếu

- Consumer test: `src/sample-api/pact-workshop-js/consumer/src/api.pact.spec.js`
- Provider verification: `src/sample-api/pact-workshop-js/provider/product/product.pact.test.js`
- Pact sinh ra: `consumer/pacts/FrontendWebsite-ProductService.json` — 10 interaction,
  10 regex matcher cho `Authorization`
- CI: `.github/workflows/pact-verification.yml`
- Hướng dẫn: `src/pact/README.md`

Lý thuyết nền: slide `docs/slides/pages/4.contract_testing/` (4.2 vấn đề, 4.3 định nghĩa,
4.5 kiến trúc, 4.6 consumer-driven, 4.7 giới hạn) và `docs/slides/pages/5.demo_pact/`
(5.2 consumer, 5.3 anatomy, 5.4 provider, 5.5 broker, 5.7 breaking change).
