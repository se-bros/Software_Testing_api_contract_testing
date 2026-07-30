# Slide Content Draft — API Testing & Contract Testing

> **Nhóm 03 — SEBros** | Học phần: Kiểm thử phần mềm
> Bản draft nội dung slide. Mỗi section = một hoặc nhiều slide. Ghi chú speaker notes in nghiêng.

---

## SLIDE 1 — Trang bìa (Title)

**Tiêu đề:** API Testing & Contract Testing

**Subtitle:** Nhóm 03 — SEBros

**Thông tin:**

- Học phần: Kiểm thử phần mềm
- Giảng viên: Dr. Lâm Quang Vũ / Dr. Trần Duy Hoàng / ThS. Trần Thị Bích Hạnh / ThS. Trương Phước Lộc / ThS. Hồ Tuấn Thanh
- Repository: github.com/Anhnguyenk835/Software_Testing_api_contract_testing

**Thành viên:**
| MSSV | Họ tên |
|------|--------|
| 23127115 | Mạch Quốc Tấn |
| 23127065 | Ngô Nguyễn Thế Khoa |
| 23127211 | Nguyễn Lê Hồ Anh Khoa |
| 23127148 | Ân Tiến Nguyên An |
| 23127152 | Nguyễn Tuấn Anh |

---

## SLIDE 2 — Agenda (Mục lục trình bày)

1. Giới thiệu & Mục tiêu
2. API Testing — Khái niệm & Kỹ thuật
3. Công cụ: Postman & VS Code REST Client
4. Demo: API Testing thực hành
5. Automation với Newman & CI/CD
6. Contract Testing — Vấn đề & Giải pháp
7. Pact: Consumer → Provider → Broker
8. Demo: Contract Testing & Breaking Change
9. AI hỗ trợ kiểm thử
10. Tổng kết & Q&A

_Ghi chú: Seminar gồm 3 video (Lý thuyết, Cài đặt, Demo thực hành) + 90 phút thực hành tại lớp._

---

## SLIDE 3 — Giới thiệu & Mục tiêu

**Bối cảnh:**

- Hệ thống hiện đại chia thành nhiều service độc lập (microservices)
- Mỗi service có API riêng → cần kiểm thử ở nhiều lớp
- Kiểm thử thủ công không đủ → cần automation & CI/CD

**Mục tiêu seminar:**

- Hiểu và thực hành **API Testing** (functional testing ở tầng API)
- Hiểu và thực hành **Contract Testing** (kiểm tra tính tương thích Consumer–Provider)
- Tự động hóa bằng **Newman + GitHub Actions**
- Trải nghiệm quy trình AI-assisted testing

**Phạm vi:**

- API mẫu: Product Service (Node.js/Express) — CRUD 5 endpoints
- Công cụ: Postman, Newman, Pact, GitHub Actions
- Phương án thay thế: VS Code REST Client (.http)

---

# PHẦN A — API TESTING

---

## SLIDE 4 — API là gì? (Nhắc lại)

**Định nghĩa:**

- API (Application Programming Interface): giao diện lập trình cho phép các hệ thống giao tiếp
- REST API: dùng HTTP protocol — method, URL, headers, body

**Cấu trúc Request/Response:**

```
Request:  Method + URL + Headers + Body
Response: Status Code + Headers + Body
```

**HTTP Methods phổ biến:**
| Method | Ý nghĩa | Ví dụ |
|--------|----------|-------|
| GET | Đọc dữ liệu | `GET /products` |
| POST | Tạo mới | `POST /products` |
| PUT | Cập nhật toàn bộ | `PUT /product/10` |
| DELETE | Xóa | `DELETE /product/10` |

**HTTP Status Codes:**
| Mã | Ý nghĩa |
|----|----------|
| 200 | OK — thành công |
| 201 | Created — tạo mới thành công |
| 204 | No Content — xóa thành công |
| 400 | Bad Request — dữ liệu không hợp lệ |
| 401 | Unauthorized — thiếu/sai token |
| 404 | Not Found — không tồn tại |

---

## SLIDE 5 — API có Authentication vs Không

**API không authenticate:**

- Truy cập tự do, không cần token
- Ví dụ: public API thời tiết, health check endpoint

**API có authenticate (Token-based):**

- Yêu cầu header: `Authorization: Bearer <token>`
- Token có thể là JWT, OAuth2, hoặc custom (như ISO-8601 timestamp)
- Thiếu/sai/hết hạn token → `401 Unauthorized`

**Ví dụ trong Product Service:**

```
Authorization: Bearer 2026-07-15T10:00:00.000Z
```

- Timestamp phải trong vòng 1 giờ so với server
- Sai định dạng hoặc hết hạn → 401

_Ghi chú: Nhấn mạnh rằng test API phải bao gồm cả test authentication — không chỉ happy path._

---

## SLIDE 6 — Các loại Test Case cho API

**Phân loại theo mục tiêu:**

| Loại             | Mô tả                          | Ví dụ                                |
| ---------------- | ------------------------------ | ------------------------------------ |
| Happy Path       | Request hợp lệ → response đúng | GET /product/10 + valid token → 200  |
| Negative / Error | Input sai → xử lý lỗi đúng     | GET /product/99999 → 404             |
| Authentication   | Thiếu/sai/hết hạn token → 401  | Không gửi Authorization header       |
| Validation       | Body thiếu field → 400         | POST thiếu "name" → 400              |
| Schema           | Response đúng cấu trúc kỳ vọng | Body có đủ id, type, name, version   |
| Boundary         | Giá trị biên                   | Token đúng 1 giờ trước (vừa hết hạn) |

**Kỹ thuật thiết kế:**

- Domain Partitioning: chia input thành các lớp tương đương
- Boundary Value Analysis: kiểm tra giá trị biên
- State Transition: kiểm tra chuyển trạng thái (với API có workflow)

---

## SLIDE 7 — Công cụ Postman: Tổng quan

**Postman là gì:**

- Nền tảng kiểm thử API phổ biến nhất
- GUI trực quan + hỗ trợ automation
- Miễn phí cho cá nhân, có bản trả phí cho team

**Các khái niệm chính:**
| Khái niệm | Vai trò |
|-----------|---------|
| **Collection** | Gom nhóm các request theo chức năng |
| **Environment** | Bộ biến môi trường (baseUrl, token...) |
| **Variable** | Giá trị động dùng lại trong nhiều request |
| **Pre-request Script** | Chạy trước mỗi request (sinh token, setup) |
| **Test Script** | Assertion kiểm tra response |
| **Collection Runner** | Chạy nhiều request liên tiếp với data file |
| **Data-driven** | Chạy 1 request với nhiều bộ dữ liệu (CSV/JSON) |

---

## SLIDE 8 — Postman: Tổ chức Collection

**Cấu trúc Collection trong dự án:**

```
Product Service - Data Driven Tests
├── _Setup (Pre-flight)         ← sinh token
├── GET — Happy Path            ← 4 iterations
├── GET — Negative              ← 7 iterations
├── POST — Happy Path           ← 2 iterations
├── POST — Negative             ← 5 iterations
├── PUT — Happy Path            ← 2 iterations
├── PUT — Negative              ← 4 iterations
├── DELETE — Happy Path         ← 1 iteration
└── DELETE — Negative           ← 4 iterations
```

**Tổng: 29 test cases, 5 endpoints, 9 folders**

**Nguyên tắc tổ chức:**

- Tách theo HTTP method
- Tách Happy Path / Negative riêng
- Folder `_Setup` chạy trước để chuẩn bị token

---

## SLIDE 9 — Postman: Script & Assertion

**Pre-request Script (Collection level):**

- Tự động sinh Bearer token hợp lệ mỗi iteration
- Map `auth_header` từ data file:
  - `"{{validToken}}"` → Bearer hợp lệ
  - `"Bearer 2020-..."` → token hết hạn (negative case)
  - `""` → xóa header (no token case)

**Test Script (ví dụ):**

```javascript
pm.test('Status is 200', () => {
  pm.response.to.have.status(200);
});

pm.test('Response has required fields', () => {
  const json = pm.response.json();
  pm.expect(json).to.have.property('id');
  pm.expect(json).to.have.property('name');
  pm.expect(json).to.have.property('type');
});
```

_Ghi chú: Demo trực tiếp trong Video 3 hoặc tại lớp._

---

## SLIDE 10 — Data-driven Testing

**Khái niệm:**

- Chạy cùng 1 request với nhiều bộ dữ liệu khác nhau
- Data file: JSON hoặc CSV
- Mỗi dòng = 1 iteration

**Ví dụ data file (get-product-by-id.data.json):**

```json
{
  "tc_id": "GET_ID_01",
  "description": "Existing product with valid token",
  "product_id": "10",
  "auth_header": "{{validToken}}",
  "expected_status": 200,
  "expect_field_id": "10",
  "expect_field_name": "28 Degrees"
}
```

**Lợi ích:**

- Tách test logic khỏi test data
- Dễ thêm case mới mà không sửa script
- Phù hợp chạy automation (Newman)

---

## SLIDE 11 — Phương án thay thế: VS Code REST Client

**REST Client (extension Huachao Mao):**

- File `.http` hoặc `.rest` — viết request trực tiếp trong VS Code
- Không cần mở Postman GUI
- Hỗ trợ biến, chaining, assertion cơ bản

**Ví dụ:**

```http
@baseUrl = http://localhost:8080
@token = {{$datetime iso8601 -1 m}}

### GET /products — Happy Path → 200
GET {{baseUrl}}/products
Authorization: Bearer {{token}}
Accept: application/json
```

**So sánh nhanh:**
| Tiêu chí | Postman | REST Client |
|----------|---------|-------------|
| GUI | Đầy đủ | Tối giản |
| Data-driven | Có (Collection Runner) | Không |
| Script | JS đầy đủ | Hạn chế |
| CI/CD | Export → Newman | Không trực tiếp |
| Tiện lợi | Cần mở app | Ngay trong editor |

_Ghi chú: REST Client phù hợp dev test nhanh; Postman phù hợp test suite đầy đủ._

---

## SLIDE 12 — API mẫu: Product Service

**Thông tin:**

- Node.js + Express
- Port: 8080
- Auth: Bearer ISO-8601 timestamp (trong vòng 1 giờ)
- Data: In-memory (reset khi restart server)

**Endpoints:**
| Method | Path | Auth | Success | Error |
|--------|------|------|---------|-------|
| GET | /products | ✓ | 200 + array | 401 |
| GET | /product/:id | ✓ | 200 + object | 401, 404 |
| POST | /products | ✓ | 201 + created | 400, 401 |
| PUT | /product/:id | ✓ | 200 + updated | 401, 404 |
| DELETE | /product/:id | ✓ | 204 | 401, 404 |

**Product schema:**

```json
{ "id": "10", "type": "CREDIT_CARD", "name": "28 Degrees", "version": "v1" }
```

---

# PHẦN B — AUTOMATION & CI/CD

---

## SLIDE 13 — Newman: Chạy Postman Collection bằng CLI

**Newman là gì:**

- Command-line runner cho Postman Collection
- Chạy test mà không cần mở Postman GUI
- Xuất báo cáo: CLI, HTML, JSON

**Lệnh cốt lõi:**

```bash
newman run product-service.postman_collection.json \
  -e local.postman_environment.json \
  --reporters cli,htmlextra,json \
  --reporter-htmlextra-export report.html \
  --reporter-json-export report.json
```

**Luồng tự động hóa:**

1. Khởi động Provider tại `localhost:8080`
2. Readiness probe: gọi `/health` đến khi nhận 200
3. Chạy Newman với collection + environment
4. Xuất báo cáo HTML + JSON
5. Upload artifact (kể cả khi test fail)

---

## SLIDE 14 — GitHub Actions: Newman Pipeline

**Workflow: `newman-api-test.yml`**

**Trigger:** push/PR vào `main` + manual dispatch

**Pipeline:**

```
Checkout → Setup Node 20 → Install deps → Start Provider
→ Wait /health (30s timeout) → Install Newman
→ Run Newman → Upload report artifact
```

**Đặc điểm:**

- `permissions: contents: read` — giới hạn quyền
- `timeout-minutes: 10`
- `concurrency: cancel-in-progress` — hủy run cũ
- `if: always()` — luôn upload report để debug
- Artifact giữ 7 ngày

_Ghi chú: Không cần secret vì token do Pre-request script tự sinh._

---

## SLIDE 15 — GitHub Actions: Pact Verification Pipeline

**Workflow: `pact-verification.yml`**

**3 jobs nối tiếp:**

```
┌─────────────────┐     ┌──────────────────────┐     ┌──────────────────┐
│ Consumer Pact   │────▶│ Provider Verification │────▶│ can-i-deploy     │
│ (sinh pact.json)│     │ (verify pact thật)    │     │ (quality gate)   │
└─────────────────┘     └──────────────────────┘     └──────────────────┘
```

**Job 1 — Consumer:**

- Chạy `npm run test:pact` → sinh `FrontendWebsite-ProductService.json`
- Upload artifact `consumer-pacts`
- Publish pact lên Pactflow Broker

**Job 2 — Provider:**

- Download artifact pact
- Chạy Provider verifier với API thật
- Publish kết quả verification

**Job 3 — can-i-deploy:**

- Cài Pact CLI standalone
- Kiểm tra compatibility matrix
- Chặn deploy nếu chưa tương thích

---

## SLIDE 16 — Giá trị của Automation

**Hai lớp bảo vệ:**

| Lớp           | Công cụ        | Phát hiện                                  |
| ------------- | -------------- | ------------------------------------------ |
| Functional    | Newman/Postman | Lỗi chức năng, validation, auth, payload   |
| Compatibility | Pact           | Breaking change tại biên Consumer–Provider |

**Lợi ích:**

- Phản hồi sớm: chạy trên mỗi push/PR
- Tái lập: log + artifact lưu lại
- Giảm phụ thuộc kiểm tra thủ công
- Bằng chứng: reviewer truy ngược version, test result, contract

---

# PHẦN C — CONTRACT TESTING

---

## SLIDE 17 — Vấn đề: Khi mỗi service đều "xanh"

**Tình huống:**

- Consumer kỳ vọng field `product.name`
- Provider đổi thành `displayName`
- Unit test cả hai phía đều PASS
- Lỗi chỉ lộ khi tích hợp (staging/production)

**Câu hỏi cốt lõi:**

> "Hai phía có còn hiểu cùng một giao thức hay không?"

**Tại sao unit test không đủ:**

- Unit test kiểm tra logic nội bộ
- Không kiểm chứng giả định xuyên biên giới
- Integration/E2E test phát hiện muộn, chi phí cao

_Ghi chú: Đây là motivation slide — tạo nhu cầu cho Contract Testing._

---

## SLIDE 18 — Contract Testing là gì?

**Định nghĩa:**

> Contract là đặc tả **có thể thực thi** về những request Consumer gửi và response Provider cam kết đáp ứng.

**Nội dung contract:**

- Request: method, path, query, headers, body
- Response: status, headers, schema, matching rules
- Context: provider state (điều kiện trước)

**Ví dụ interaction:**

```
Given  product 10 exists
When   GET /product/10
Then   200 + Product schema
```

**Phạm vi:**

- Xác minh **tính tương thích** — không chứng minh toàn bộ nghiệp vụ đúng
- Không thay thế security test, performance test, E2E test

---

## SLIDE 19 — So sánh các lớp kiểm thử

| Tiêu chí   | API Testing        | Contract Testing      | Integration     | E2E            |
| ---------- | ------------------ | --------------------- | --------------- | -------------- |
| Câu hỏi    | Endpoint đúng?     | Còn tương thích?      | Phối hợp đúng?  | Journey chạy?  |
| Phạm vi    | 1+ endpoint        | 1 cặp C–P             | Nhóm thành phần | Toàn hệ thống  |
| Môi trường | API thật/mock      | Cô lập, local/CI      | Bán tích hợp    | Gần production |
| Feedback   | Nhanh–TB           | Nhanh, rõ             | Trung bình      | Chậm           |
| Điểm mạnh  | Chức năng, auth    | Chống breaking change | Wiring          | User journey   |
| Điểm mù    | Phụ thuộc consumer | Business logic        | Ngoài scope     | Flaky, đắt     |

**Thông điệp:** Contract Test **bổ sung** — không thay thế tất cả.

---

## SLIDE 20 — Mô hình Consumer–Provider

**Consumer (FrontendWebsite):**

- Ứng dụng gọi API (web, mobile, service khác)
- Mô tả chính xác phần API nó sử dụng
- Sinh ra Pact file (JSON)

**Provider (ProductService):**

- Dịch vụ cung cấp API
- Chứng minh implementation đáp ứng mọi interaction
- Chạy verification với API thật

**Pact file:**

- Artifact JSON chứa interactions + matching rules
- Đường dẫn: `consumer/pacts/FrontendWebsite-ProductService.json`

**Pact Broker / Pactflow:**

- Lưu contract + version + kết quả verification
- Tạo compatibility matrix
- Hỗ trợ `can-i-deploy` gate

_Ghi chú: Consumer-driven ≠ Consumer đơn phương áp đặt. Mỗi Consumer chỉ nêu nhu cầu thực tế._

---

## SLIDE 21 — Bước 1: Consumer tạo Contract

**Quy trình:**

1. Consumer test đăng ký interaction với Pact Mock Provider
2. Test gọi **API client thật** của Consumer vào mock server
3. Pact kiểm tra request nhận được
4. Pact cung cấp response mẫu theo matching rules
5. Test thành công → Pact sinh file JSON

**Sequence:**

```
Consumer test → Register interaction → Pact Mock Provider
Consumer test → Exercise client → Real API client code
Real API client → GET /product/10 → Pact Mock Provider
Pact Mock Provider → 200 + matching response → Real API client
Pact Mock Provider → Validate request → Consumer test
Consumer test → Write pact.json
```

**Lưu ý:** Mock Provider không thay thế code Consumer — test phải gọi API client thật.

---

## SLIDE 22 — Cấu trúc một Interaction (Pact JSON)

```json
{
  "description": "get product 10",
  "providerState": "product 10 exists",
  "request": {
    "method": "GET",
    "path": "/product/10"
  },
  "response": {
    "status": 200,
    "body": {
      "id": "10",
      "name": "28 Degrees",
      "type": "CREDIT_CARD"
    }
  },
  "matchingRules": {
    "$.body.id": "type:string",
    "$.body.name": "type:string"
  }
}
```

**Nguyên tắc Matcher:**

- **Strict** với điều Consumer phụ thuộc: status code, path, field bắt buộc
- **Linh hoạt** với dữ liệu động: dùng type/regex matcher
- Không over-specify (giòn) cũng không under-specify (mất giá trị)

**Trong repo:** 10 interactions, 10 Authorization regex matchers (Bearer ISO-8601)

---

## SLIDE 23 — Bước 2: Provider xác minh Contract

**Quy trình:**

1. Pact Verifier tải pact (từ file hoặc Broker)
2. Thiết lập provider state ("product 10 exists")
3. Replay request vào **Provider API thật**
4. So sánh response thực tế với contract
5. Mismatch → chỉ rõ field bị gãy
6. Publish kết quả verification

**Sequence:**

```
Pact Verifier → Fetch pact.json → Broker/File
Pact Verifier → Set up state → Provider State Handler
Pact Verifier → Replay GET /product/10 → Real Provider API
Real Provider API → Actual 200 response → Pact Verifier
Pact Verifier → Match status, headers, body
Pact Verifier → Publish result → Broker
```

**Đặc điểm:**

- Provider verification KHÔNG gọi Consumer
- Verifier đóng vai Consumer để replay
- Provider state tạo điều kiện có thể tái lập

---

## SLIDE 24 — Broker & Deployment Gate

**Pact Broker không chỉ lưu JSON:**

- Liên kết version Consumer + version Provider + kết quả verification
- Tạo compatibility matrix

**Quy trình lý tưởng:**

1. Consumer CI chạy contract tests → sinh pact
2. Publish pact + version metadata lên Broker
3. Provider CI tải pact → chạy verification
4. Publish kết quả lại Broker
5. Pipeline gọi `can-i-deploy` trước khi triển khai

**can-i-deploy:**

- Truy vấn ma trận tương thích
- Compatible → cho phép deploy
- Failed/Unknown → chặn pipeline

_Ghi chú: Trong repo, CI dùng artifact handoff (không bắt buộc Broker). Pactflow là đường nâng cấp._

---

## SLIDE 25 — Case Study: Product Service

**Demo sử dụng:**

- Consumer: `FrontendWebsite`
- Provider: `ProductService`

**Bộ contract (10 interactions):**
| Nhóm API | Interactions | Trạng thái |
|----------|:---:|---|
| GET /products | 2 | Có dữ liệu + danh sách rỗng |
| GET /product/:id | 2 | Tồn tại + không tồn tại |
| POST /products | 2 | Tạo thành công + validation error |
| PUT /product/:id | 2 | Cập nhật + không tồn tại |
| DELETE /product/:id | 2 | Xóa thành công + không tồn tại |

**Kết quả (25/07/2026):**

- Consumer suite: **10/10 interactions** pass
- Provider verification: xác minh thành công toàn bộ contract

**Lệnh chạy:**

```bash
# Consumer test
npm run test:pact --prefix src/sample-api/pact-workshop-js/consumer

# Provider verification
npm run test:pact --prefix src/sample-api/pact-workshop-js/provider
```

---

## SLIDE 26 — Breaking Change Demo

**Kịch bản:**

- Provider đổi field `name` → `title` trong response
- HTTP status vẫn 200 — API "có vẻ" hoạt động
- Nhưng Consumer contract yêu cầu field `name`

**Kết quả:**

- Provider verification **FAIL** — thiếu field `name`
- Pact chỉ rõ mismatch: expected `name`, got `title`

**Khôi phục:**

- Sửa lại `name` → verification **PASS** trở lại

**Bài học:**

> Đổi tên field là breaking change dù HTTP status không đổi.
> Functional test có thể không phát hiện nếu không assert đúng field.
> Contract test phát hiện ngay tại provider verification.

_Ghi chú: Đây là nội dung chính của Mini Exercise phần C — sinh viên tự thực hiện._

---

## SLIDE 27 — Consumer-Driven: Vì sao?

**Provider-Driven:**

- Provider công bố toàn bộ schema
- Consumer phải thích nghi
- Provider khó biết phần nào đang được sử dụng

**Consumer-Driven:**

- Mỗi Consumer phát hành interaction mình phụ thuộc
- Provider xác minh tập hợp nhu cầu thực tế
- Provider biết field nào đang dùng → tránh xóa/sửa nhầm

**Quy trình hợp tác:**

1. Consumer nêu nhu cầu (pact)
2. Provider xác minh
3. Hai đội cùng tiến hóa API có kiểm soát

**Lưu ý:** Công cụ hỗ trợ cuộc hội thoại — không thay thế thiết kế API và giao tiếp giữa các đội.

---

## SLIDE 28 — Giới hạn của Contract Testing

**Contract Testing KHÔNG nhìn thấy:**

| Giới hạn                 | Giải thích                                             |
| ------------------------ | ------------------------------------------------------ |
| Business logic nội bộ    | Response đúng schema nhưng tính sai tổng tiền vẫn pass |
| Hạ tầng production       | DNS, TLS, gateway, timeout cần lớp test/monitor khác   |
| Hành trình nhiều service | Một pact chỉ chứng minh một ranh giới                  |
| Chất lượng API design    | Tương thích ≠ dễ dùng, nhất quán, an toàn              |

**Chiến lược cân bằng:**

- **Unit test** → logic
- **Contract test** → compatibility
- **Integration test** → wiring
- **E2E test** → critical user journeys

---

# PHẦN D — AI HỖ TRỢ KIỂM THỬ

---

## SLIDE 29 — AI trong quy trình Testing

**Vai trò AI:**

- Sinh test case từ API specification
- Gợi ý cấu trúc Postman Collection
- Review contract và phát hiện thiếu sót
- Tạo sơ đồ, tài liệu, workflow mẫu

**Công cụ đã dùng:**

- Claude, ChatGPT, Gemini — research & drafting
- Postman Postbot — sinh test script trong Postman
- Agent Skill (custom) — tự động sinh test từ API spec

**Nguyên tắc AI-First (từ HW06):**

1. Hướng dẫn AI từng bước — không prompt chung chung
2. Human review mọi output — gắn nhãn VALID/INVALID/INCOMPLETE
3. AI Audit Report — ghi log toàn bộ quá trình
4. Quality over completion

---

## SLIDE 30 — Agent Skill: AI-driven Test Generator

**Kiến trúc:**

- Input: API Specification (OpenAPI/Markdown)
- Process: Phân tích endpoint → sinh test cases → tạo Postman Collection
- Output: Collection JSON + data files + test scripts

**Tính tái sử dụng:**

- Ước tính **>80%** mã nguồn/prompt tái sử dụng cho dự án mới
- 100% tái sử dụng: Agent Skill script, prompt templates, GitHub Actions workflows, Newman runner
- Cần cấu hình: API spec input, biến môi trường, test data

**Demo:** Chạy Agent Skill trên Swagger PetStore API (API ngoài Product Service) → chứng minh reusability

---

# PHẦN E — TỔNG KẾT

---

## SLIDE 31 — So sánh API Testing vs Contract Testing

|                | API Testing                     | Contract Testing                     |
| -------------- | ------------------------------- | ------------------------------------ |
| **Câu hỏi**    | Endpoint hoạt động đúng?        | Consumer & Provider còn tương thích? |
| **Công cụ**    | Postman + Newman                | Pact                                 |
| **Phạm vi**    | Nhiều endpoint, nhiều case      | Một cặp Consumer–Provider            |
| **Data**       | Data-driven (CSV/JSON)          | Pact interactions + matchers         |
| **Automation** | Newman trong GitHub Actions     | Pact verification + can-i-deploy     |
| **Phát hiện**  | Lỗi chức năng, validation, auth | Breaking change tại biên             |
| **Bổ sung**    | ✓ Cả hai cùng cần thiết         | ✓                                    |

---

## SLIDE 32 — Khi nào dùng gì?

**Dùng API Testing khi:**

- Kiểm tra chức năng endpoint
- Validation input/output
- Authentication & Authorization
- Regression suite cho API

**Dùng Contract Testing khi:**

- Nhiều service phát triển độc lập
- Hay có breaking change khi tích hợp
- Cần deployment gate (can-i-deploy)
- Muốn feedback sớm trước staging

**Chiến lược tối ưu:**

- Unit test cho logic nội bộ
- Contract test cho compatibility tại biên
- API/Integration test cho chức năng & wiring
- Ít E2E test cho critical journeys

---

## SLIDE 33 — Adoption Path (Bắt đầu thế nào?)

1. **Chọn một ranh giới rủi ro** — cặp Consumer–Provider hay thay đổi/hay gãy
2. **Contract 1–2 luồng quan trọng** — success + một error behavior
3. **Chạy trong CI** — consumer test + provider verification
4. **Thêm Broker + can-i-deploy** — khi workflow ổn định
5. **Đo hiệu quả** — lỗi phát hiện trước staging, thời gian feedback, số deploy bị chặn đúng

_Ghi chú: Đừng bắt đầu bằng cách contract hóa mọi endpoint. Chọn một seam có giá trị và học workflow._

---

## SLIDE 34 — Tổng kết (Takeaway)

**3 từ khóa:**

|             |                                                    |
| ----------- | -------------------------------------------------- |
| **Fast**    | Feedback sớm tại local và CI                       |
| **Focused** | Khoanh đúng ranh giới Consumer–Provider            |
| **Safe**    | Cho phép các service tiến hóa độc lập có kiểm soát |

**Kết luận:**

- API Testing + Contract Testing giải quyết hai nhóm rủi ro khác nhau
- Newman + GitHub Actions = regression suite tự động
- Pact = contract artifact + provider verification + compatibility gate
- Phân tầng kiểm thử hợp lý > cố gắng thay thế mọi thứ bằng một loại test

---

## SLIDE 35 — Deliverables & Resources

**Videos:**

- Video 1: Lý thuyết & Thuật ngữ API / Contract Testing
- Video 2: Hướng dẫn cài đặt môi trường
- Video 3: Demo thực hành (Postman + Newman CI/CD + Pact & AI Skill)

**Tài liệu thực hành:**

- Activity Worksheet (90 phút tại lớp)
- Mini Exercise: Từ API Test đến Contract Breaking Change

**Repository:**

- Source code: `src/sample-api/pact-workshop-js/`
- Postman: `src/postman/` (collections + data)
- Newman: `src/newman/` (runner scripts)
- CI/CD: `.github/workflows/`

---

## SLIDE 36 — Q&A

**Cảm ơn thầy/cô và các bạn đã lắng nghe!**

Mời câu hỏi & thảo luận.

---

# PHỤ LỤC — GHI CHÚ CHO NGƯỜI LÀM SLIDE

## Thiết kế

- Theme: Slidev `seriph`, dark mode
- Font: Inter (sans), JetBrains Mono (code)
- Accent color: Cyan (#22d3ee)
- Aspect ratio: 16:9

## Phân bổ thời gian gợi ý (trên lớp)

| Phần               | Slides        | Thời lượng   |
| ------------------ | ------------- | ------------ |
| Mở đầu + Agenda    | 1–3           | 3 phút       |
| API Testing        | 4–12          | 15 phút      |
| Automation & CI/CD | 13–16         | 8 phút       |
| Contract Testing   | 17–28         | 20 phút      |
| AI hỗ trợ          | 29–30         | 5 phút       |
| Tổng kết + Q&A     | 31–36         | 9 phút       |
| **Tổng**           | **36 slides** | **~60 phút** |

## Video chèn vào slide

- Sau Slide 12: chiếu Video 3 (đoạn Postman demo) hoặc demo trực tiếp
- Sau Slide 16: chiếu Video 3 (đoạn Newman CI/CD)
- Sau Slide 26: chiếu Video 3 (đoạn Pac demo)

## Demo trực tiếp tại lớp (nếu có thời gian)

1. Khởi động Provider → gửi GET /products bằng Postman
2. Chạy Newman CLI → đọc report
3. Chạy Consumer Pact test → mở pact.json
4. Tạo breaking change → Provider verification FAIL
5. Khôi phục → PASS

## Tài liệu tham khảo

1. Pact Foundation — docs.pact.io
2. Postman Learning Center — learning.postman.com
3. Newman — github.com/postmanlabs/newman
4. GitHub Actions — docs.github.com/en/actions
5. Pact Workshop JS — github.com/pact-foundation/pact-workshop-js
6. Slidev — sli.dev
