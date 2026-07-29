# SLIDE 1 — Trang bìa

# API Testing & Contract Testing

**Nhóm 03 — SEBros**

Học phần: Kiểm thử phần mềm

| MSSV | Họ tên |
|------|--------|
| 23127115 | Mạch Quốc Tấn |
| 23127065 | Ngô Nguyễn Thế Khoa |
| 23127211 | Nguyễn Lê Hồ Anh Khoa |
| 23127148 | Ân Tiến Nguyên An |
| 23127152 | Nguyễn Tuấn Anh |

---

# SLIDE 2 — Agenda

## Agenda

1. Giới thiệu & Mục tiêu
2. API Testing — Khái niệm & Kỹ thuật
3. Công cụ: Postman & VS Code REST Client
4. Automation với Newman & CI/CD
5. Contract Testing — Vấn đề & Giải pháp
6. Demo: Contract Testing với Pact & Breaking Change
7. AI hỗ trợ kiểm thử
8. Tổng kết & Q&A

---

# SLIDE 3 — Giới thiệu & Mục tiêu

## Giới thiệu & Mục tiêu

**Bối cảnh**
- Hệ thống hiện đại → nhiều service độc lập (microservices)
- Mỗi service có API riêng → cần kiểm thử ở nhiều lớp
- Kiểm thử thủ công không đủ → cần automation & CI/CD

**Mục tiêu seminar**
- Hiểu & thực hành **API Testing** (functional testing ở tầng API)
- Hiểu & thực hành **Contract Testing** (tương thích Consumer–Provider)
- Tự động hóa bằng **Newman + GitHub Actions**
- Trải nghiệm **AI-assisted testing**

**Phạm vi**
- API mẫu: Product Service (Node.js/Express) — CRUD 5 endpoints
- Công cụ: Postman, Newman, Pact, GitHub Actions

---

# PHẦN A — API TESTING

---

# SLIDE 4 — API là gì?

## API là gì?

- API = giao diện lập trình cho phép các hệ thống giao tiếp
- REST API: dùng HTTP — method, URL, headers, body

```
Request:  Method + URL + Headers + Body
Response: Status Code + Headers + Body
```

| Method | Ý nghĩa | Ví dụ |
|--------|----------|-------|
| GET | Đọc dữ liệu | `GET /products` |
| POST | Tạo mới | `POST /products` |
| PUT | Cập nhật | `PUT /product/10` |
| DELETE | Xóa | `DELETE /product/10` |

---

# SLIDE 5 — HTTP Status Codes

## HTTP Status Codes

| Mã | Ý nghĩa |
|----|----------|
| 200 | OK — thành công |
| 201 | Created — tạo mới thành công |
| 204 | No Content — xóa thành công |
| 400 | Bad Request — dữ liệu không hợp lệ |
| 401 | Unauthorized — thiếu/sai token |
| 404 | Not Found — không tồn tại |

---

# SLIDE 6 — Authentication

## Authentication

**Không authenticate:**
- Truy cập tự do, không cần token
- VD: public API, health check

**Có authenticate (Token-based):**
- Header: `Authorization: Bearer <token>`
- Thiếu / sai / hết hạn → `401 Unauthorized`

**Product Service:**
```
Authorization: Bearer 2026-07-15T10:00:00.000Z
```
- Timestamp ISO-8601, trong vòng 1 giờ
- Sai định dạng hoặc hết hạn → 401

---

# SLIDE 7 — Các loại Test Case cho API

## Các loại Test Case cho API

| Loại | Mô tả | Ví dụ |
|------|--------|-------|
| Happy Path | Request hợp lệ → đúng | GET /product/10 → 200 |
| Negative | Input sai → lỗi đúng | GET /product/99999 → 404 |
| Authentication | Thiếu/sai token → 401 | Không gửi header |
| Validation | Body thiếu field → 400 | POST thiếu "name" |
| Schema | Đúng cấu trúc kỳ vọng | Có đủ id, type, name |
| Boundary | Giá trị biên | Token vừa hết hạn |

**Kỹ thuật:** Domain Partitioning · Boundary Value Analysis · State Transition

---

# SLIDE 8 — Postman: Tổng quan

## Postman — Tổng quan

| Khái niệm | Vai trò |
|-----------|---------|
| **Collection** | Gom nhóm request theo chức năng |
| **Environment** | Bộ biến môi trường (baseUrl, token...) |
| **Variable** | Giá trị động dùng lại |
| **Pre-request Script** | Chạy trước request (sinh token) |
| **Test Script** | Assertion kiểm tra response |
| **Collection Runner** | Chạy nhiều request + data file |
| **Data-driven** | 1 request × nhiều bộ dữ liệu |

---

# SLIDE 9 — Postman: Tổ chức Collection

## Postman — Tổ chức Collection

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

**29 test cases · 5 endpoints · 9 folders**

---

# SLIDE 10 — Postman: Script & Assertion

## Postman — Script & Assertion

**Pre-request Script:** tự sinh Bearer token mỗi iteration

**Test Script:**
```javascript
pm.test("Status is 200", () => {
    pm.response.to.have.status(200);
});

pm.test("Has required fields", () => {
    const json = pm.response.json();
    pm.expect(json).to.have.property("id");
    pm.expect(json).to.have.property("name");
    pm.expect(json).to.have.property("type");
});
```

---

# SLIDE 11 — Data-driven Testing

## Data-driven Testing

- Chạy 1 request với nhiều bộ dữ liệu (JSON/CSV)
- Mỗi dòng = 1 iteration

```json
{
  "tc_id": "GET_ID_01",
  "product_id": "10",
  "auth_header": "{{validToken}}",
  "expected_status": 200,
  "expect_field_name": "28 Degrees"
}
```

**Lợi ích:**
- Tách logic khỏi data
- Thêm case không sửa script
- Phù hợp automation (Newman)

---

# SLIDE 12 — VS Code REST Client

## VS Code REST Client

```http
@baseUrl = http://localhost:8080
@token = {{$datetime iso8601 -1 m}}

### GET /products → 200
GET {{baseUrl}}/products
Authorization: Bearer {{token}}
```

| Tiêu chí | Postman | REST Client |
|----------|---------|-------------|
| GUI | Đầy đủ | Tối giản |
| Data-driven | ✓ | ✗ |
| Script | JS đầy đủ | Hạn chế |
| CI/CD | Newman | ✗ |
| Tiện lợi | Mở app riêng | Ngay trong editor |

---

# SLIDE 13 — API mẫu: Product Service

## API mẫu: Product Service

- Node.js + Express · Port 8080
- Auth: Bearer ISO-8601 (trong 1 giờ)
- Data: In-memory (reset khi restart)

| Method | Path | Success | Error |
|--------|------|---------|-------|
| GET | /products | 200 + array | 401 |
| GET | /product/:id | 200 + object | 401, 404 |
| POST | /products | 201 + created | 400, 401 |
| PUT | /product/:id | 200 + updated | 401, 404 |
| DELETE | /product/:id | 204 | 401, 404 |

```json
{ "id": "10", "type": "CREDIT_CARD", "name": "28 Degrees", "version": "v1" }
```

---

# PHẦN B — AUTOMATION & CI/CD

---

# SLIDE 14 — Newman: CLI Runner

## Newman — CLI Runner

- Chạy Postman Collection không cần GUI
- Xuất báo cáo: CLI, HTML, JSON

```bash
newman run product-service.postman_collection.json \
  -e local.postman_environment.json \
  --reporters cli,htmlextra,json
```

**Luồng:**
1. Khởi động Provider (`localhost:8080`)
2. Readiness probe → `/health` = 200
3. Chạy Newman + collection + environment
4. Xuất report HTML + JSON
5. Upload artifact (kể cả khi fail)

---

# SLIDE 15 — GitHub Actions: Newman Pipeline

## GitHub Actions — Newman Pipeline

**Trigger:** push / PR vào `main`

```
Checkout → Node 20 → Install → Start Provider
→ Wait /health → Newman → Upload report
```

- `timeout-minutes: 10`
- `concurrency: cancel-in-progress`
- `if: always()` → luôn upload report
- Artifact giữ 7 ngày
- Không cần secret (token tự sinh)

---

# SLIDE 16 — GitHub Actions: Pact Pipeline

## GitHub Actions — Pact Pipeline

```
┌───────────────┐     ┌────────────────────┐     ┌────────────────┐
│ Consumer Pact │────▶│ Provider Verify    │────▶│ can-i-deploy   │
│ sinh pact.json│     │ verify pact thật   │     │ quality gate   │
└───────────────┘     └────────────────────┘     └────────────────┘
```

**Consumer:** test → sinh pact → upload artifact → publish Broker

**Provider:** download pact → verify với API thật → publish result

**can-i-deploy:** kiểm tra compatibility matrix → chặn nếu chưa tương thích

---

# SLIDE 17 — Giá trị của Automation

## Giá trị của Automation

| Lớp | Công cụ | Phát hiện |
|-----|---------|-----------|
| Functional | Newman | Lỗi chức năng, validation, auth |
| Compatibility | Pact | Breaking change tại biên C–P |

- Phản hồi sớm trên mỗi push/PR
- Log + artifact tái lập được
- Giảm kiểm tra thủ công
- Bằng chứng cho reviewer

---

# PHẦN C — CONTRACT TESTING

---

# SLIDE 18 — Vấn đề: Mỗi service "xanh", hệ thống vẫn "đỏ"

## Vấn đề: Mỗi service "xanh", hệ thống vẫn "đỏ"

- Consumer kỳ vọng `product.name`
- Provider đổi thành `displayName`
- Unit test cả hai → PASS
- Lỗi chỉ lộ khi tích hợp

> **"Hai phía có còn hiểu cùng một giao thức không?"**

Unit test không kiểm chứng giả định xuyên biên giới.
Integration/E2E phát hiện muộn, chi phí cao.

---

# SLIDE 19 — Contract Testing là gì?

## Contract Testing là gì?

> Contract = đặc tả **có thể thực thi** về request Consumer gửi và response Provider cam kết đáp ứng.

**Nội dung:**
- Request: method, path, headers, body
- Response: status, schema, matching rules
- Context: provider state

```
Given  product 10 exists
When   GET /product/10
Then   200 + Product schema
```

Xác minh **tính tương thích** — không chứng minh nghiệp vụ đúng.

---

# SLIDE 20 — So sánh các lớp kiểm thử

## So sánh các lớp kiểm thử

| | API Test | Contract Test | Integration | E2E |
|---|---|---|---|---|
| Hỏi | Đúng? | Tương thích? | Phối hợp? | Journey? |
| Phạm vi | Endpoint | Cặp C–P | Nhóm | Toàn hệ thống |
| Feedback | Nhanh | Nhanh, rõ | TB | Chậm |
| Mạnh | Chức năng | Breaking change | Wiring | User flow |
| Mù | Consumer-specific | Business logic | Ngoài scope | Flaky |

Contract Test **bổ sung** — không thay thế tất cả.

---

# SLIDE 21 — Mô hình Consumer–Provider

## Mô hình Consumer–Provider

**Consumer** (FrontendWebsite)
- Gọi API → mô tả phần API sử dụng → sinh pact.json

**Provider** (ProductService)
- Cung cấp API → chứng minh đáp ứng mọi interaction

**Pact Broker / Pactflow**
- Lưu contract + version + kết quả verification
- Compatibility matrix · `can-i-deploy` gate

---

# SLIDE 22 — Consumer-Driven: Vì sao?

## Consumer-Driven: Vì sao?

| Provider-Driven | Consumer-Driven |
|---|---|
| Provider công bố toàn bộ schema | Mỗi Consumer nêu nhu cầu thực tế |
| Consumer phải thích nghi | Provider xác minh tập hợp nhu cầu |
| Khó biết phần nào được dùng | Provider biết field nào đang dùng |

**Quy trình:**
1. Consumer nêu nhu cầu (pact)
2. Provider xác minh
3. Hai đội cùng tiến hóa API có kiểm soát

---

# SLIDE 23 — Giới hạn của Contract Testing

## Giới hạn của Contract Testing

| Không nhìn thấy | Giải thích |
|---|---|
| Business logic | Đúng schema nhưng tính sai vẫn pass |
| Hạ tầng | DNS, TLS, timeout cần lớp khác |
| Multi-service journey | Một pact = một ranh giới |
| API design quality | Tương thích ≠ dễ dùng |

**Chiến lược cân bằng:**
Unit → logic · Contract → compatibility · Integration → wiring · E2E → journeys

---

# PHẦN D — DEMO: CONTRACT TESTING VỚI PACT

---

# SLIDE 24 — Demo: Consumer tạo Contract

## Consumer tạo Contract

1. Đăng ký interaction với Pact Mock Provider
2. Gọi **API client thật** vào mock
3. Pact kiểm tra request
4. Trả response theo matching rules
5. Thành công → sinh `pact.json`

```
Consumer test → Register interaction → Mock Provider
API client   → GET /product/10      → Mock Provider
Mock Provider → 200 + response      → API client
Consumer test → Write pact.json
```

---

# SLIDE 25 — Demo: Pact JSON

## Pact JSON — Cấu trúc Interaction

```json
{
  "description": "get product 10",
  "providerState": "product 10 exists",
  "request": { "method": "GET", "path": "/product/10" },
  "response": {
    "status": 200,
    "body": { "id": "10", "name": "28 Degrees", "type": "CREDIT_CARD" }
  },
  "matchingRules": {
    "$.body.id": "type:string",
    "$.body.name": "type:string"
  }
}
```

**Matcher:** strict cho status/path/field quan trọng · linh hoạt cho data động

---

# SLIDE 26 — Demo: Provider xác minh Contract

## Provider xác minh Contract

1. Tải pact (file hoặc Broker)
2. Thiết lập provider state
3. Replay request vào **API thật**
4. So sánh response với contract
5. Mismatch → chỉ rõ field gãy

```
Verifier → Fetch pact → Set state → Replay GET /product/10
Provider → 200 response → Verifier → Match → Publish result
```

- KHÔNG gọi Consumer
- Verifier đóng vai Consumer replay
- State tái lập được

---

# SLIDE 27 — Demo: Broker & Deployment Gate

## Broker & Deployment Gate

**Broker:** version C + version P + kết quả verify → compatibility matrix

**Quy trình:**
1. Consumer CI → sinh pact → publish
2. Provider CI → tải pact → verify → publish result
3. `can-i-deploy` → compatible? → Deploy / Stop

```
can-i-deploy?
├── compatible  → Deploy independently
└── failed/unknown → Stop pipeline
```

---

# SLIDE 28 — Demo: Case Study Product Service

## Case Study: Product Service

Consumer: `FrontendWebsite` · Provider: `ProductService`

| API | Interactions | Trạng thái |
|-----|:---:|---|
| GET /products | 2 | Có data + rỗng |
| GET /product/:id | 2 | Tồn tại + không |
| POST /products | 2 | Tạo + validation error |
| PUT /product/:id | 2 | Update + không tồn tại |
| DELETE /product/:id | 2 | Xóa + không tồn tại |

**10/10 interactions pass** (25/07/2026)

---

# SLIDE 29 — Demo: Breaking Change

## Breaking Change Demo

**Kịch bản:** Provider đổi `name` → `title`

- HTTP status vẫn **200**
- Consumer contract yêu cầu field `name`
- Provider verification → **FAIL**

**Khôi phục:** sửa lại `name` → **PASS**

> Đổi tên field = breaking change dù status không đổi.
> Functional test có thể bỏ qua.
> Contract test phát hiện ngay.

---

# PHẦN E — AI HỖ TRỢ KIỂM THỬ

---

# SLIDE 30 — AI trong quy trình Testing

## AI trong quy trình Testing

**Vai trò:**
- Sinh test case từ API spec
- Gợi ý cấu trúc Collection
- Review contract, phát hiện thiếu sót

**Công cụ:** Claude · ChatGPT · Gemini · Postman Postbot · Agent Skill

**Nguyên tắc:**
1. Hướng dẫn AI từng bước — không prompt chung chung
2. Human review mọi output — VALID / INVALID / INCOMPLETE
3. AI Audit Report — ghi log toàn bộ
4. Quality over completion

---

# SLIDE 31 — Agent Skill: AI-driven Test Generator

## Agent Skill — AI-driven Test Generator

```
Input: API Specification (OpenAPI / Markdown)
  ↓
Process: Phân tích endpoint → sinh test cases → tạo Collection
  ↓
Output: Collection JSON + data files + test scripts
```

**Reusability > 80%:**
- 100%: Skill script, prompt templates, workflows, Newman runner
- Cấu hình lại: API spec, env vars, test data

**Demo:** Agent Skill trên Swagger PetStore API → chứng minh tái sử dụng

---

# TỔNG KẾT

---

# SLIDE 32 — So sánh API Testing vs Contract Testing

## API Testing vs Contract Testing

| | API Testing | Contract Testing |
|---|---|---|
| **Hỏi** | Endpoint đúng? | Còn tương thích? |
| **Công cụ** | Postman + Newman | Pact |
| **Phạm vi** | Nhiều endpoint | Cặp Consumer–Provider |
| **Automation** | Newman + GH Actions | Pact verify + can-i-deploy |
| **Phát hiện** | Chức năng, auth, validation | Breaking change tại biên |

**Cả hai bổ sung cho nhau.**

---

# SLIDE 33 — Khi nào dùng gì?

## Khi nào dùng gì?

**API Testing:**
- Kiểm tra chức năng endpoint
- Validation, Authentication
- Regression suite

**Contract Testing:**
- Service phát triển độc lập
- Hay có breaking change
- Cần deployment gate
- Feedback sớm trước staging

**Chiến lược:** Unit → Contract → API/Integration → E2E (ít)

---

# SLIDE 34 — Adoption Path

## Adoption Path

1. Chọn **một ranh giới rủi ro** — hay gãy tích hợp
2. Contract **1–2 luồng** quan trọng
3. Chạy trong **CI** từng đội
4. Thêm **Broker + can-i-deploy**
5. **Đo:** lỗi phát hiện sớm, feedback time, deploy bị chặn đúng

---

# SLIDE 35 — Takeaway

## Takeaway

| | |
|---|---|
| **Fast** | Feedback sớm tại local và CI |
| **Focused** | Khoanh đúng ranh giới Consumer–Provider |
| **Safe** | Service tiến hóa độc lập có kiểm soát |

- API Testing + Contract Testing = hai lớp rủi ro khác nhau
- Newman + GitHub Actions = regression suite tự động
- Pact = contract + verification + compatibility gate
- Phân tầng hợp lý > một loại test thay thế tất cả

---

# SLIDE 36 — Resources

## Resources

**Videos:**
- Video 1: Lý thuyết & Thuật ngữ
- Video 2: Cài đặt môi trường
- Video 3: Demo thực hành (Postman + Newman + Pact + AI Skill)

**Thực hành:**
- Activity Worksheet (90 phút)
- Mini Exercise: API Test → Contract Breaking Change

**Repo:** `src/sample-api/` · `src/postman/` · `src/newman/` · `.github/workflows/`

---

# SLIDE 37 — Q&A

## Q&A

**Cảm ơn thầy/cô và các bạn!**

Mời câu hỏi & thảo luận.
