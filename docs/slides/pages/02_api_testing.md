---
layout: section
---

# PHẦN A — API TESTING

<div class="text-lg text-gray-400 mt-4">Khái niệm · Kỹ thuật · Công cụ · Demo</div>

---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">02 · API Basics</div>

# API là gì?

**API** (Application Programming Interface): giao diện lập trình cho phép các hệ thống giao tiếp.

**REST API**: dùng HTTP protocol — method, URL, headers, body.

<div class="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm">
  <div class="text-gray-500">Request: <span class="text-cyan-700">Method + URL + Headers + Body</span></div>
  <div class="text-gray-500 mt-1">Response: <span class="text-blue-700">Status Code + Headers + Body</span></div>
</div>

<div class="grid grid-cols-2 gap-8 mt-6">
  <div>
  <h3 class="text-lg font-bold text-cyan-700 mb-3">HTTP Methods</h3>

| Method | Ý nghĩa | Ví dụ |
|--------|----------|-------|
| `GET` | Đọc dữ liệu | `GET /products` |
| `POST` | Tạo mới | `POST /products` |
| `PUT` | Cập nhật toàn bộ | `PUT /product/10` |
| `DELETE` | Xóa | `DELETE /product/10` |

  </div>
  <div>
  <h3 class="text-lg font-bold text-blue-700 mb-3">HTTP Status Codes</h3>

| Mã | Ý nghĩa |
|----|----------|
| `200` | OK — thành công |
| `201` | Created — tạo mới thành công |
| `204` | No Content — xóa thành công |
| `400` | Bad Request — dữ liệu không hợp lệ |
| `401` | Unauthorized — thiếu/sai token |
| `404` | Not Found — không tồn tại |

  </div>
</div>

<!--
Nhắc lại kiến thức nền: API, REST, HTTP methods và status codes.
-->

---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">02 · Authentication</div>

# API có Authentication vs Không

<div class="grid grid-cols-2 gap-8 mt-6">
  <div>
  <h3 class="text-lg font-bold text-gray-600 mb-3">Không authenticate</h3>
  <v-clicks>

  - Truy cập tự do, không cần token
  - Ví dụ: public API thời tiết, health check endpoint

  </v-clicks>
  </div>
  <div>
  <h3 class="text-lg font-bold text-cyan-700 mb-3">Có authenticate (Token-based)</h3>
  <v-clicks>

  - Yêu cầu header: `Authorization: Bearer <token>`
  - Token có thể là JWT, OAuth2, hoặc custom (ISO-8601)<sup>1</sup>
  - Thiếu/sai/hết hạn token → `401 Unauthorized`

  </v-clicks>
  </div>
</div>

<div v-click class="mt-6 p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
  <strong class="text-cyan-700">Ví dụ trong Product Service:</strong>
  <div class="mt-2 font-mono text-sm bg-white p-3 rounded border border-cyan-100">
    Authorization: Bearer 2026-07-15T10:00:00.000Z
  </div>
  <div class="mt-2 text-sm text-gray-600">
    Timestamp phải trong vòng <strong>1 giờ</strong> so với server · Sai định dạng hoặc hết hạn → <code>401</code>
  </div>
</div>

<div class="footnotes">
<div class="fn-item"><sup>1</sup><strong>Bearer ISO-8601</strong> — Token dạng timestamp theo chuẩn ISO-8601 (vd: 2026-07-15T10:00:00.000Z), hợp lệ trong 1 giờ.</div>
</div>

<!--
Test API phải bao gồm cả test authentication — không chỉ happy path.
-->

---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">02 · Test Design</div>

# Các loại Test Case cho API

<div class="mt-6">
  <table class="w-full text-sm">
  <thead>
      <tr class="border-b-2 border-cyan-200">
        <th class="text-left py-2 text-cyan-700">Loại</th>
        <th class="text-left py-2 text-cyan-700">Mô tả</th>
        <th class="text-left py-2 text-cyan-700">Ví dụ</th>
      </tr>
  </thead>
  <tbody>
      <tr v-click class="border-b border-gray-100"><td class="py-2 font-bold">Happy Path<sup>1</sup></td><td>Request hợp lệ → response đúng</td><td class="text-gray-500">GET /product/10 + valid token → 200</td></tr>
      <tr v-click class="border-b border-gray-100"><td class="py-2 font-bold">Negative</td><td>Input sai → xử lý lỗi đúng</td><td class="text-gray-500">GET /product/99999 → 404</td></tr>
      <tr v-click class="border-b border-gray-100"><td class="py-2 font-bold">Authentication</td><td>Thiếu/sai/hết hạn token → 401</td><td class="text-gray-500">Không gửi Authorization header</td></tr>
      <tr v-click class="border-b border-gray-100"><td class="py-2 font-bold">Validation</td><td>Body thiếu field → 400</td><td class="text-gray-500">POST thiếu "name" → 400</td></tr>
      <tr v-click class="border-b border-gray-100"><td class="py-2 font-bold">Schema</td><td>Response đúng cấu trúc kỳ vọng</td><td class="text-gray-500">Body có đủ id, type, name, version</td></tr>
      <tr v-click><td class="py-2 font-bold">Boundary</td><td>Giá trị biên</td><td class="text-gray-500">Token đúng 1 giờ trước (vừa hết hạn)</td></tr>
  </tbody>
  </table>
</div>

<div v-click class="mt-4 text-sm text-gray-500">
  <strong>Kỹ thuật:</strong> Domain Partitioning · Boundary Value Analysis · State Transition
</div>

<div class="footnotes">
<div class="fn-item"><sup>1</sup><strong>Happy Path</strong> — Kịch bản với dữ liệu hợp lệ, đi qua luồng thành công.</div>
</div>

<!--
6 loại test case. Kỹ thuật: Domain Partitioning, Boundary Value Analysis.
-->

---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">03 · Postman</div>

# Postman — Tổng quan

<div class="grid grid-cols-2 gap-8 mt-6">
  <div>
  <h3 class="text-lg font-bold text-cyan-700 mb-3">Postman là gì</h3>
  <v-clicks>

  - Nền tảng kiểm thử API **phổ biến nhất**
  - GUI trực quan + hỗ trợ **automation**
  - Miễn phí cho cá nhân

  </v-clicks>

  <h3 class="text-lg font-bold text-blue-700 mt-6 mb-3">Các khái niệm chính</h3>

  <v-clicks>

  - **Collection** — Gom nhóm request theo chức năng
  - **Environment** — Bộ biến môi trường (baseUrl, token...)
  - **Variable** — Giá trị động dùng lại
  - **Pre-request Script** — Chạy trước mỗi request
  - **Test Script** — Assertion<sup>1</sup> kiểm tra response

  </v-clicks>
  </div>
  <div>
  <h3 class="text-lg font-bold text-indigo-700 mb-3">Tính năng nâng cao</h3>
  <v-clicks>

  - **Collection Runner** — Chạy nhiều request liên tiếp
  - **Data-driven** — Chạy 1 request với nhiều bộ dữ liệu (CSV/JSON)
  - **Newman** — CLI runner cho CI/CD
  - **Monitor** — Chạy test định kỳ
  - **Mock Server** — Giả lập API

  </v-clicks>
  </div>
</div>

<div class="footnotes">
<div class="fn-item"><sup>1</sup><strong>Assertion</strong> — Câu lệnh kiểm tra tự động (vd: status = 200) chạy sau mỗi request.</div>
</div>

<!--
Postman: GUI + automation. Các khái niệm: Collection, Environment, Variable, Scripts.
-->

---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">03 · Collection Structure</div>

# Postman — Tổ chức Collection

<div class="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm leading-6">
  <div class="text-gray-700 font-bold">Product Service — Data Driven Tests</div>
  <div class="text-gray-500">├── <span class="text-cyan-600">_Setup (Pre-flight)</span>          ← sinh token</div>
  <div class="text-gray-500">├── <span class="text-green-600">GET — Happy Path</span>            ← 4 iterations</div>
  <div class="text-gray-500">├── <span class="text-red-500">GET — Negative</span>              ← 7 iterations</div>
  <div class="text-gray-500">├── <span class="text-green-600">POST — Happy Path</span>           ← 2 iterations</div>
  <div class="text-gray-500">├── <span class="text-red-500">POST — Negative</span>             ← 5 iterations</div>
  <div class="text-gray-500">├── <span class="text-green-600">PUT — Happy Path</span>            ← 2 iterations</div>
  <div class="text-gray-500">├── <span class="text-red-500">PUT — Negative</span>              ← 4 iterations</div>
  <div class="text-gray-500">├── <span class="text-green-600">DELETE — Happy Path</span>         ← 1 iteration</div>
  <div class="text-gray-500">└── <span class="text-red-500">DELETE — Negative</span>           ← 4 iterations</div>
</div>

<div class="grid grid-cols-3 gap-4 mt-4">
  <div v-click class="p-3 bg-cyan-50 border border-cyan-200 rounded-lg text-center">
  <div class="text-2xl font-bold text-cyan-700">29</div>
  <div class="text-xs text-gray-500">Test cases</div>
  </div>
  <div v-click class="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
  <div class="text-2xl font-bold text-blue-700">5</div>
  <div class="text-xs text-gray-500">Endpoints</div>
  </div>
  <div v-click class="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-center">
  <div class="text-2xl font-bold text-indigo-700">9</div>
  <div class="text-xs text-gray-500">Folders</div>
  </div>
</div>

<!--
Tách theo HTTP method. Tách Happy Path / Negative riêng.
-->

---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">03 · Scripts</div>

# Postman — Script & Assertion

<div class="grid grid-cols-2 gap-6 mt-4">
  <div>
  <h3 class="text-base font-bold text-cyan-700 mb-2">Pre-request Script (Collection level)</h3>
  <div class="text-sm text-gray-600 mb-2">Tự động sinh Bearer token hợp lệ mỗi iteration:</div>
  <div class="text-xs text-gray-500">
      - <code v-pre>"{{validToken}}"</code> → Bearer hợp lệ<br>
      - `"Bearer 2020-..."` → token hết hạn (negative)<br>
      - `""` → xóa header (no token case)
  </div>
  </div>
  <div>
  <h3 class="text-base font-bold text-blue-700 mb-2">Test Script (ví dụ)</h3>

```javascript
pm.test("Status is 200", () => {
    pm.response.to.have.status(200);
});

pm.test("Response has required fields", () => {
    const json = pm.response.json();
    pm.expect(json).to.have.property("id");
    pm.expect(json).to.have.property("name");
    pm.expect(json).to.have.property("type");
});
```

  </div>
</div>

<!--
Pre-request script sinh token. Test script assert status + schema.
-->

---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">03 · Data-driven</div>

# Data-driven Testing

**Khái niệm:** Chạy cùng 1 request với **nhiều bộ dữ liệu** khác nhau. Data file: JSON hoặc CSV. Mỗi dòng = 1 iteration.

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

<div class="grid grid-cols-3 gap-4 mt-6">
  <div v-click class="p-3 bg-cyan-50 border border-cyan-200 rounded-lg">
  <strong class="text-cyan-700">Tách logic khỏi data</strong>
  <div class="text-sm text-gray-500 mt-1">Script không đổi, chỉ thêm data</div>
  </div>
  <div v-click class="p-3 bg-blue-50 border border-blue-200 rounded-lg">
  <strong class="text-blue-700">Dễ thêm case mới</strong>
  <div class="text-sm text-gray-500 mt-1">Thêm dòng vào data file</div>
  </div>
  <div v-click class="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
  <strong class="text-indigo-700">Phù hợp automation</strong>
  <div class="text-sm text-gray-500 mt-1">Chạy với Newman CI/CD</div>
  </div>
</div>

<!--
Data-driven: tách test logic khỏi test data.
-->

---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">03 · Alternative</div>

# VS Code REST Client

<div class="grid grid-cols-2 gap-8 mt-4">
  <div>
  <h3 class="text-lg font-bold text-cyan-700 mb-3">REST Client (extension)</h3>
  <v-clicks>

  - File `.http` — viết request ngay trong VS Code
  - Không cần mở Postman GUI
  - Hỗ trợ biến, chaining, assertion cơ bản

  </v-clicks>

  <div class="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm">

```http
@baseUrl = http://localhost:8080
@token = {{$datetime iso8601 -1 m}}

### GET /products → 200
GET {{baseUrl}}/products
Authorization: Bearer {{token}}
```

  </div>
  </div>
  <div>
  <h3 class="text-lg font-bold text-blue-700 mb-3">So sánh nhanh</h3>

| Tiêu chí | Postman | REST Client |
|----------|---------|-------------|
| GUI | Đầy đủ | Tối giản |
| Data-driven | ✅ | ❌ |
| Script | JS đầy đủ | Hạn chế |
| CI/CD | Export → Newman | ❌ |
| Tiện lợi | Cần mở app | Ngay trong editor |

  </div>
</div>

<!--
REST Client phù hợp dev test nhanh; Postman phù hợp test suite đầy đủ.
-->

---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">04 · Sample API</div>

# API mẫu: Product Service

<div class="grid grid-cols-2 gap-8 mt-4">
  <div>
  <h3 class="text-lg font-bold text-cyan-700 mb-3">Thông tin</h3>
  <v-clicks>

  - **Node.js + Express**
  - Port: `8080`
  - Auth: **Bearer ISO-8601** (trong vòng 1 giờ)
  - Data: **In-memory** (reset khi restart)

  </v-clicks>

  <h3 class="text-lg font-bold text-blue-700 mt-6 mb-3">Product Schema</h3>

```json
{
  "id": "10",
  "type": "CREDIT_CARD",
  "name": "28 Degrees",
  "version": "v1"
}
```

  </div>
  <div>
  <h3 class="text-lg font-bold text-indigo-700 mb-3">Endpoints</h3>

| Method | Path | Success | Error |
|--------|------|---------|-------|
| `GET` | `/products` | 200 + array | 401 |
| `GET` | `/product/:id` | 200 + object | 401, 404 |
| `POST` | `/products` | 201 + created | 400, 401 |
| `PUT` | `/product/:id` | 200 + updated | 401, 404 |
| `DELETE` | `/product/:id` | 204 | 401, 404 |

  </div>
</div>

<!--
Product Service: 5 endpoints CRUD, auth ISO-8601, in-memory data.
-->

