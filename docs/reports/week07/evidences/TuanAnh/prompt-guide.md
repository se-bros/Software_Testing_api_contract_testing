# Standalone Prompt Guide — Sinh Postman Test Script & Contract Test

> **Dự án:** API & Contract Testing — Nhóm 3 SEBros  
> **Task:** W07 — Nguyễn Tuấn Anh (23127152)  
> **Đối tượng dùng:** ChatGPT / Claude (copy–paste template)  
> **Mục tiêu:** Hướng dẫn bạn cùng lớp sinh test script Postman và khung kiểm thử hợp đồng tự động  
> **Ngày:** 2026-07-25  
> **Phiên bản:** 1.0 (W07 — đã chạy thử mục 4 + mục 7 trên API products; mục 5–6 để mở rộng W08)

---

## Mục lục

- [1. Cách dùng cẩm nang](#1-cách-dùng-cẩm-nang)
- [2. Quy ước điền placeholder](#2-quy-ước-điền-placeholder)
- [3. Prompt — Sinh test case từ mô tả API](#3-prompt--sinh-test-case-từ-mô-tả-api)
- [4. Prompt — Sinh Postman `pm.test()` từ request/response](#4-prompt--sinh-postman-pmtest-từ-requestresponse)
- [5. Prompt — Data-driven / negative / boundary](#5-prompt--data-driven--negative--boundary)
- [6. Prompt — Cấu trúc contract test (Pact)](#6-prompt--cấu-trúc-contract-test-pact)
- [7. Prompt — Review & phản biện script AI sinh](#7-prompt--review--phản-biện-script-ai-sinh)
- [8. Biến thể ngắn theo công cụ](#8-biến-thể-ngắn-theo-công-cụ)
- [9. Checklist trước khi đưa script vào collection](#9-checklist-trước-khi-đưa-script-vào-collection)
- [10. Ví dụ đã chạy thử (W07)](#10-ví-dụ-đã-chạy-thử-w07)
- [11. Evidence & đối chiếu Postbot](#11-evidence--đối-chiếu-postbot)

---

## 1. Cách dùng cẩm nang

1. Chọn đúng mục prompt (3 → 7) theo việc cần làm.
2. Thay toàn bộ `{{PLACEHOLDER}}` bằng dữ liệu thật (endpoint, response, OpenAPI snippet…).
3. Dán vào ChatGPT hoặc Claude; giữ nguyên phần ràng buộc format ở cuối prompt.
4. Human review theo [mục 9](#9-checklist-trước-khi-đưa-script-vào-collection) trước khi commit vào collection.
5. Không tin output AI cho security/auth edge — luôn đối chiếu với API thật (smoke W06 / Provider docs).

**Khi nào dùng Prompt Guide thay Postbot:** negative cases, BVA, data-driven, Pact structure, hoặc khi cần giải thích kỹ thuật test cho slide/lab.

---

## 2. Quy ước điền placeholder

| Placeholder | Ý nghĩa | Ví dụ |
| --- | --- | --- |
| `{{METHOD}}` | HTTP method | `POST` |
| `{{PATH}}` | Đường dẫn | `/products` |
| `{{BASE_URL}}` | Host | `http://localhost:8080` |
| `{{HEADERS}}` | Header gửi đi | `Authorization: Bearer <token>` |
| `{{REQUEST_BODY}}` | JSON body | `{"name":"…","type":"…"}` |
| `{{RESPONSE_STATUS}}` | Status thực tế | `201` |
| `{{RESPONSE_BODY}}` | Body thực tế | `{...}` |
| `{{OPENAPI_SNIPPET}}` | Đoạn OpenAPI / mô tả schema | *(dán YAML/JSON)* |
| `{{CONSUMER}}` / `{{PROVIDER}}` | Tên service Pact | `FrontendApp` / `ProductService` |
| `{{STACK}}` | Ngôn ngữ Pact | `JavaScript (Jest + @pact-foundation/pact)` |

---

## 3. Prompt — Sinh test case từ mô tả API

**Mục đích:** bảng test case (chưa cần code Postman).

```text
Bạn là QA engineer chuyên API testing.

Dưới đây là mô tả / OpenAPI cho endpoint {{METHOD}} {{PATH}}:

---
{{OPENAPI_SNIPPET}}
---

Hãy thiết kế test cases đầy đủ theo kỹ thuật:
1. Positive (happy path)
2. Negative (thiếu field bắt buộc, sai type, sai auth)
3. Boundary Value Analysis (các field có min/max/length nếu có)
4. Equivalence Partitioning (email, enum, id…)
5. Security cơ bản (mass assignment — field không có trong spec; thiếu/sai Bearer)

Ràng buộc output:
- Bảng markdown: TC_ID | Input (JSON/Headers) | Expected Status | Technique | Ghi chú
- Không viết code ở bước này
- Giả định Base URL = {{BASE_URL}}
```

**Ghi chú dùng thực tế (W07):**

> W07 ưu tiên chạy **mục 4** (sinh script) và **mục 7** (review). Mục 3 (bảng test case) / mục 5–6 có thể mở rộng ở W08. Xem kết quả mẫu tại [mục 10](#10-ví-dụ-đã-chạy-thử-w07).

---

## 4. Prompt — Sinh Postman `pm.test()` từ request/response

**Mục đích:** script dán vào tab Tests của Postman.

```text
Bạn là chuyên gia Postman / Newman.

Cho request thực tế sau:

Method: {{METHOD}}
URL: {{BASE_URL}}{{PATH}}
Headers:
{{HEADERS}}

Request body:
{{REQUEST_BODY}}

Response thực tế:
Status: {{RESPONSE_STATUS}}
Body:
{{RESPONSE_BODY}}

Hãy viết script tab Tests (Postman sandbox) gồm:
1. Assert status code
2. Assert response time < 1000ms (có thể chỉnh)
3. Assert Content-Type nếu phù hợp
4. Assert kiểu và field bắt buộc trong JSON (nếu có body)
5. (Tuỳ chọn) lưu id / token vào environment bằng pm.environment.set

Ràng buộc:
- Chỉ dùng cú pháp pm.test / pm.expect / pm.response hợp lệ với Postman
- Mỗi assertion một pm.test riêng, tên test rõ nghĩa tiếng Anh hoặc tiếng Việt nhất quán
- Không giải thích dài — chỉ trả về khối JavaScript sẵn dán
```

**Biến thể Claude (thêm dòng đầu):**

```text
Thinking: liệt kê ngắn các field cần assert trước khi viết code. Output cuối chỉ là JavaScript.
```

---

## 5. Prompt — Data-driven / negative / boundary

**Mục đích:** bộ case + gợi ý gắn với Collection variables / data file.

```text
Từ endpoint {{METHOD}} {{PATH}} và schema:

{{OPENAPI_SNIPPET}}

Hãy tạo:
A. Bảng data-driven (CSV hoặc JSON array) cho các case positive + negative + boundary
B. Một Pre-request / Tests pattern dùng biến từ data file (ví dụ {{name}}, {{type}}, {{expectedStatus}})
C. Scripts mẫu: đọc expectedStatus từ data và assert bằng pm.expect

Ràng buộc:
- Ít nhất 8 hàng dữ liệu
- Có cột: case_id, mô tả ngắn, các input, expectedStatus
- Script phải chạy được trên Newman với --iteration-data
- Giải thích cực ngắn cách gắn data file vào Collection
```

---

## 6. Prompt — Cấu trúc contract test (Pact)

**Mục đích:** khung consumer/provider test, không thay thế thiết kế contract thật của nhóm.

```text
Bạn là engineer am hiểu Consumer-Driven Contract Testing với Pact.

Ngữ cảnh:
- Consumer: {{CONSUMER}}
- Provider: {{PROVIDER}}
- Stack: {{STACK}}
- Interaction cần cover: {{METHOD}} {{PATH}}
- Request headers/body kỳ vọng:
{{HEADERS}}
{{REQUEST_BODY}}
- Response kỳ vọng:
Status {{RESPONSE_STATUS}}
Body:
{{RESPONSE_BODY}}

Hãy tạo cấu trúc:
1. Consumer test: mô tả interaction (uponReceiving / withRequest / willRespondWith) — dùng matcher phù hợp (like, eachLike, regex…) thay vì hard-code mọi giá trị nếu hợp lý
2. Provider verification: checklist bước verify + publish (liệt kê lệnh / file giả định, không bịa đường dẫn repo nếu chưa chắc)
3. Lưu ý auth (Bearer) trong contract nếu có

Ràng buộc:
- Tách rõ phần CODE và phần NOTES
- Không bịa API khác ngoài interaction đã cho
- Nếu thiếu thông tin matcher, hỏi lại 1 câu ngắn rồi đưa bản best-effort
```

**Gợi ý điền cho mẫu nhóm:**

| Field | Gợi ý |
| --- | --- |
| `{{CONSUMER}}` | *(tên consumer trong repo Pact workshop)* |
| `{{PROVIDER}}` | Product / Provider service |
| `{{STACK}}` | JavaScript — Jest + Pact |

---

## 7. Prompt — Review & phản biện script AI sinh

**Mục đích:** audit script (Postbot hoặc LLM) trước khi merge.

```text
Hãy đóng vai reviewer QA. Đây là script Postman Tests do AI sinh:

```javascript
{{PASTE_SCRIPT_HERE}}
```

Context API:
- Endpoint: {{METHOD}} {{PATH}}
- Expected behaviours đã biết: {{KNOWN_BEHAVIOURS}}
  (ví dụ từ smoke: 401 khi thiếu Bearer; 400 khi thiếu type/name; …)

Hãy trả về:
1. Bảng: Assertion | Cần thiết? | Rủi ro false-positive/negative | Đề xuất sửa
2. Danh sách case còn thiếu (negative/auth/boundary)
3. Bản script đã chỉnh (full), sẵn dán Postman
```

---

## 8. Biến thể ngắn theo công cụ

| Công cụ | Điều chỉnh |
| --- | --- |
| **ChatGPT** | Giữ prompt đầy đủ; nếu output dài, thêm: `Trả lời gọn, ưu tiên code block`. |
| **Claude** | Thêm yêu cầu: tách `## Assumptions` rồi `## Output`; hỏi lại nếu thiếu schema. |
| **Postbot** | Không thay bằng prompt dài — dùng cho bootstrap happy path; sau đó đưa script sang mục 7 để review bằng ChatGPT/Claude. |

---

## 9. Checklist trước khi đưa script vào collection

- [x] Chạy lại trên API thật (Provider Docker) — khớp status/body (`r2_chatgpt.png`, `r4_chatgpt.png`)
- [x] Không hard-code token hết hạn; dùng Bearer từ Pre-request / `{{authToken}}`
- [x] Tên `pm.test` rõ, không trùng nghĩa gây nhiễu báo cáo Newman
- [x] Đã có case negative auth/validation trong cùng collection smoke (request 01/03/05 — Postbot; Prompt Guide bổ sung review cho GET)
- [ ] (Nếu contract) matcher Pact — để W08 khi chạy mục 6
- [x] Đã ghi nguồn vào AI Audit Report tuần 07 (`AI Usage/TuanAnh/AI_Audit_Report.md`)

---

## 10. Ví dụ đã chạy thử (W07)

Ngày thử: **2026-07-25** · Tool: **ChatGPT** · API: Provider `http://localhost:8080` · Collection folder `testing`.

### 10.1 Mục 4 — `GET /products` (request 02)

| Field | Giá trị |
| --- | --- |
| Tool | ChatGPT |
| Prompt gốc | Mục 4 + ràng buộc hợp đồng (id/type/name bắt buộc; `version` chỉ bắt buộc với seed 09/10/11) |
| Request | `GET {{baseUrl}}/products` + Bearer hợp lệ |
| Response mẫu | `200` + mảng 3 product seed (09, 10, 11) |
| Chạy lại Postman | **PASS** (toàn bộ assertion trong script) |
| Evidence | [`r2_chatgpt.png`](./r2_chatgpt.png) |

**Script ChatGPT đã dán & chạy (ý chính):**

```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time is less than 1000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});

pm.test("Content-Type is application/json", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

pm.test("Response body is a valid JSON array", function () {
    pm.expect(pm.response.json()).to.be.an("array");
});

pm.test("Response body is not empty", function () {
    pm.expect(pm.response.json().length).to.be.above(0);
});

pm.test("Each product has required fields id, type, name", function () {
    pm.response.json().forEach(function (p) {
        pm.expect(p).to.have.property("id");
        pm.expect(p).to.have.property("type");
        pm.expect(p).to.have.property("name");
    });
});

pm.test("Required fields have correct types (string)", function () {
    pm.response.json().forEach(function (p) {
        pm.expect(p.id).to.be.a("string");
        pm.expect(p.type).to.be.a("string");
        pm.expect(p.name).to.be.a("string");
    });
});

pm.test("Seed products 09, 10, 11 have version field", function () {
    const seeds = ["09", "10", "11"];
    pm.response.json()
        .filter(function (p) { return seeds.indexOf(p.id) !== -1; })
        .forEach(function (p) {
            pm.expect(p).to.have.property("version");
            pm.expect(p.version).to.be.a("string");
        });
});

// Tuỳ chọn: lưu id phần tử đầu
const first = pm.response.json()[0];
if (first && first.id) {
    pm.environment.set("product_id", first.id);
}
```

**Human review ngắn:** Script đạt happy-path tốt hơn Postbot ở chỗ **không bắt `version` cho mọi product**. Vẫn còn điểm cần cân nhắc (response time chặt, empty array, coupling seed) — xem mục 10.3.

---

### 10.2 Mục 4 — `POST /products` (request 04)

| Field | Giá trị |
| --- | --- |
| Tool | ChatGPT |
| Prompt gốc | Mục 4 + lưu `createdProductId`, không hard-code id response |
| Request | `POST {{baseUrl}}/products` · body `type/name/version` · Bearer |
| Response mẫu | `201` · `{"id":"13","type":"CREDIT_CARD","name":"Postbot Test Card","version":"v1"}` |
| Chạy lại Postman | **9/9 PASS** |
| Evidence | [`r4_chatgpt.png`](./r4_chatgpt.png) |

**Script ChatGPT đã dán & chạy (ý chính):**

```javascript
const responseJson = pm.response.json();
const requestJson = JSON.parse(pm.request.body.raw);

pm.test("Status code is 201 Created", function () {
    pm.response.to.have.status(201);
});

pm.test("Response time is less than 1000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});

pm.test("Content-Type is application/json", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

pm.test("Response body is a valid JSON object", function () {
    pm.expect(responseJson).to.be.an("object").that.is.not.null;
});

pm.test("Response contains all required fields", function () {
    ["id", "type", "name", "version"].forEach(function (field) {
        pm.expect(responseJson).to.have.property(field);
    });
});

pm.test("Response id is a non-empty string", function () {
    pm.expect(responseJson.id).to.be.a("string").that.is.not.empty;
});

pm.test("Response type matches request body", function () {
    pm.expect(responseJson.type).to.eql(requestJson.type);
});

pm.test("Response name matches request body", function () {
    pm.expect(responseJson.name).to.eql(requestJson.name);
});

pm.test("Response version matches request body", function () {
    pm.expect(responseJson.version).to.eql(requestJson.version);
});

if (pm.response.code === 201 && responseJson.id) {
    pm.collectionVariables.set("createdProductId", String(responseJson.id));
    pm.environment.set("createdProductId", String(responseJson.id));
}
```

**Human review ngắn:** Đạt yêu cầu chuỗi create→delete (lưu id động, echo field từ request). Giữ được cho smoke/CI nếu Runner chạy 04 trước 08.

---

### 10.3 Mục 7 — Review script request 02

| Field | Giá trị |
| --- | --- |
| Tool | ChatGPT (vai QA reviewer) |
| Prompt gốc | Mục 7 — dán script ChatGPT của request 02 + context GET `/products` |
| Output đầy đủ | [`r2_chatgpt_ai_review.md`](./r2_chatgpt_ai_review.md) |
| Verdict AI | ~**7/10** cho happy-path; chưa đủ bộ QA hoàn chỉnh |

**Điểm chính từ review (tóm tắt):**

| Giữ | Sửa / nới | Bỏ khỏi GET generic | Bổ sung (request khác) |
| --- | --- | --- | --- |
| Status 200, Content-Type, JSON array, schema `id/type/name` | Threshold time; không bắt buộc array non-empty nếu contract cho `[]` | Hard-code seed `09/10/11` trong cùng script generic (tách data-integrity) | Auth 401, POST validation 400, unique id, non-empty string |

**Kết luận human sau review:** Prompt Guide (mục 4 + 7) bổ sung được phần Postbot thiếu: ràng buộc hợp đồng rõ hơn + phản biện false-negative. Script “đã chỉnh full” trong `r2_chatgpt_ai_review.md` là bản tham chiếu khi đưa vào Newman; bản đang chạy trên Postman (`r2_chatgpt.png`) vẫn PASS và đủ minh chứng W07.

---

### 10.4 Mục 6 — Khung Pact

W07 **chưa chạy** prompt Pact (để W08 / khi gắn video demo). Template sẵn ở [mục 6](#6-prompt--cấu-trúc-contract-test-pact).

---

## 11. Evidence & đối chiếu Postbot

| File | Nội dung |
| --- | --- |
| [`r2_chatgpt.png`](./r2_chatgpt.png) | Request 02 + script ChatGPT (mục 4) — PASS |
| [`r4_chatgpt.png`](./r4_chatgpt.png) | Request 04 + script ChatGPT (mục 4) — 9/9 PASS |
| [`r2_chatgpt_ai_review.md`](./r2_chatgpt_ai_review.md) | Review mục 7 cho script request 02 |
| [`postbot-evaluation.md`](./postbot-evaluation.md) + `r1.png`…`r9.png` | Đánh giá Postbot cùng bộ request |

| Tiêu chí | Postbot (request 02) | ChatGPT + Prompt Guide (request 02) |
| --- | --- | --- |
| Tốc độ có script | Rất nhanh trong UI | Cần copy prompt + dán lại Postman |
| Schema `version` | Bắt mọi product có `version` (rủi ro) | Chỉ siết seed / hoặc bỏ khỏi generic (sau review) |
| Content-Type / kiểu field | Ít hơn | Đầy hơn (type string, Content-Type) |
| Phản biện false-negative | Không | Có (mục 7) |
| Phù hợp demo seminar | Cao | Cao — demo “Prompt → script → review” |

**Khuyến nghị dùng kèm:** Postbot bootstrap → Prompt Guide mục 7 review → chỉnh tay trước CI; hoặc sinh thẳng bằng mục 4 khi cần assertion chi tiết hơn Postbot.

---

## Tham chiếu

- Pair deliverable: [`postbot-evaluation.md`](./postbot-evaluation.md)
- Smoke / hành vi API: `docs/reports/week06/evidences/TuanAnh/smoke-test-auth.md`
- Prompt mẫu Seminar (E2.1): `docs/reports/week04/evidences/Output documents/QuocTan/Seminar_Scope.md`
- Collection thử: [`w07-postbot-testing.postman_collection.json`](./w07-postbot-testing.postman_collection.json)
- Tiếp nối W08: mở rộng mục 5–6 + gắn kịch bản video demo prompt
