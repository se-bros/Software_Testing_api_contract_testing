# Mini Exercise — Thực hành API Testing

**Thời lượng:** 90 phút tại lớp

**Đối tượng kiểm thử:** eShop Product Service — `GET /product/:id` (1 API thay vì 3 API như HW6)

## Mục lục

- [1. Mục tiêu học tập](#1-mục-tiêu-học-tập)
- [2. Bối cảnh và phạm vi](#2-bối-cảnh-và-phạm-vi)
- [3. Chuẩn bị trước giờ học](#3-chuẩn-bị-trước-giờ-học)
- [4. Bước 1 — Generate with AI](#4-bước-1--generate-with-ai)
- [5. Bước 2 — Audit (human review)](#5-bước-2--audit-human-review)
- [6. Bước 3 — Extend](#6-bước-3--extend)
- [7. Bước 4 — Execute (Postman + Newman)](#7-bước-4--execute-postman--newman)
- [8. Bước 5 — CI/CD](#8-bước-5--cicd)
- [9. Bước 6 — Postman features](#9-bước-6--postman-features)
- [10. Exit ticket và bài nộp](#10-exit-ticket-và-bài-nộp)
- [11. Tài liệu tham khảo](#11-tài-liệu-tham-khảo)

## 1. Mục tiêu học tập

Sau bài thực hành, sinh viên có thể:

1. Thực hành trọn pipeline HW6 trên quy mô nhỏ: **Generate → Audit → Extend → Execute → CI/CD**.
2. Dùng AI để đề xuất test case cho một API, sau đó tự đánh giá và sửa kết quả AI.
3. Chuyển test case đã duyệt thành dữ liệu chạy lặp trong Postman.
4. Chạy collection bằng Newman và đọc kết quả assertion từ báo cáo JSON.
5. Quan sát CI/CD pipeline pass và fail trên GitHub Actions.

> Bài tập rút gọn pipeline của HW06 từ ba API × ≥35 test case × 10 giờ xuống **một API × ≥12 test case × 90 phút**. Các phần không thuộc phạm vi: GitHub Issues/bug report, Agent Skill, AI Critique 200–300 từ, báo cáo PDF riêng.

### So sánh HW6 vs Mini Exercise

| Hạng mục           | HW6                  | Mini Exercise          |
| ------------------ | -------------------- | ---------------------- |
| Số API             | 3 (Pool A + B + C)   | 1 (`GET /product/:id`) |
| Test case mục tiêu | ≥ 35 per API         | ≥ 12                   |
| Extend             | ≥ 5 case tự viết     | ≥ 2 case tự viết       |
| Execute            | Postman + Newman     | Postman + Newman       |
| CI/CD              | Pass + fail commits  | Pass + fail commits    |
| Postman features   | Liệt kê trong report | Liệt kê trong report   |
| Bug report         | GitHub Issues + ảnh  | Không bắt buộc         |
| Agent Skill        | Thiết kế + demo      | Không bắt buộc         |
| AI Critique        | 200–300 từ           | Không bắt buộc         |
| Thời gian          | 10 giờ               | 90 phút                |

## 2. Bối cảnh và phạm vi

Frontend đang sử dụng eShop Product Service và kỳ vọng endpoint sau:

```http
GET /product/{id}
Authorization: Bearer <ISO-8601 timestamp trong vòng 1 giờ>
X-Student-Id: <MSSV>
```

Response thành công phải có bốn field:

```json
{
  "id": "10",
  "type": "CREDIT_CARD",
  "name": "28 Degrees",
  "version": "v1"
}
```

Các hành vi đã biết:

- `id` tồn tại và token hợp lệ: `200 OK`.
- `id` không tồn tại và token hợp lệ: `404 Not Found`, body có field `message`.
- Thiếu token hoặc token hết hạn: `401 Unauthorized`, body có field `error`.

Phạm vi chỉ gồm `GET /product/:id`.

## 3. Chuẩn bị trước giờ học

### 3.1. Sinh viên

- Node.js 18 hoặc 20 LTS, npm và Git.
- Postman Desktop hoặc Postman Web kèm Desktop Agent.
- Newman đã cài và có thể gọi bằng lệnh `newman --version`.
- **Quy trình Git**: 
  1. Sử dụng repository của nhóm bạn đã **fork từ `eshop-sut`** của giảng viên.
  2. Truy cập tab **Actions** trên repository đó và đảm bảo đã bấm nút **"Enable GitHub Actions"**.
  3. **Clone** repository đó về máy cá nhân của mình và tạo một nhánh riêng ví dụ `feature/<MSSV>` để thực hành.
- Một công cụ AI có thể lưu lại prompt và output.

Từ thư mục gốc repository, kiểm tra nhanh:

```bash
node --version
```

```bash
npm --version
```

```bash
newman --version
```

If chưa cài dependencies, thực hiện trước buổi học:

```bash
npm ci --prefix src/sample-api/pact-workshop-js
npm install --global newman
```

### 3.2. Tệp sẽ sử dụng

| Mục đích    | Đường dẫn                                                                     |
| ----------- | ----------------------------------------------------------------------------- |
| Collection  | `src/postman/collections/product-service-data-driven.postman_collection.json` |
| Environment | `src/postman/environments/local.postman_environment.json`                     |
| Data mẫu    | `src/postman/data/get-product-by-id.data.json`                                |
| CI Workflow | `.github/workflows/newman-api-test.yml`                                       |

## 4. Bước 1 — Generate with AI

> Tương đương HW6 Bước 1 "Generate with AI", nhưng target ≥ 12 test case (thay vì ≥ 35).

Gửi cho AI contract ở phần 2 và yêu cầu đề xuất **≥ 12 test case** bao phủ:

- **Domain partitions**: giá trị hợp lệ/không hợp lệ của `id` (số, chuỗi, rỗng, ký tự đặc biệt, số âm).
- **Security**: thiếu token, token hết hạn, token sai format.
- **Schema validation**: response body phải chứa đúng các field `id`, `type`, `name`, `version`.

Prompt phải yêu cầu AI trả về các cột: `tc_id`, input, expected status, expected fields và rationale. **Không dùng prompt kiểu "generate all tests"** — hướng dẫn AI từng bước như HW6 yêu cầu.

Không gửi source code riêng tư, token thật hoặc dữ liệu cá nhân cho AI. Chỉ dùng contract và dữ liệu giả lập của bài.

## 5. Bước 2 — Audit (human review)

> Tương đương HW6 Bước 2 "Audit (human review)".

Audit toàn bộ test case AI đề xuất bằng bảng sau:

| TC    | Nhãn                                 | Nhận xét hoặc chỉnh sửa |
| ----- | ------------------------------------ | ----------------------- |
| AI-01 | `VALID`, `INVALID` hoặc `INCOMPLETE` | ...                     |
| AI-02 | ...                                  | ...                     |
| ...   | ...                                  | ...                     |

Quy tắc:

- Gắn nhãn `VALID` / `INVALID` / `INCOMPLETE` cho **mọi** test case — giống đúng quy trình HW6.
- Sửa ít nhất một test case `INVALID` hoặc `INCOMPLETE`. Nếu tất cả đều hợp lệ, chỉ ra một giả định mà AI chưa nêu rõ và bổ sung nó.
- Giải thích lý do cho mỗi nhãn (tối thiểu 1 câu).

## 6. Bước 3 — Extend

> Tương đương HW6 Bước 3 "Extend" (≥ 5 case), nhưng target ≥ 2 case.

Tự bổ sung **≥ 2 test case** mà AI đã bỏ sót. Với mỗi case, giải thích ngắn vì sao AI bỏ sót (prompt quality, model limitations, hoặc đặc điểm API).

Ví dụ các hướng AI thường bỏ sót:

- Response header `Content-Type` phải là `application/json`.
- Response time dưới ngưỡng chấp nhận.
- Token với format hợp lệ nhưng timestamp tương lai xa.
- `id` với giá trị edge case như `0`, `-1`, hoặc số rất lớn.

## 7. Bước 4 — Execute (Postman + Newman)

> Tương đương HW6 Bước 4 "Execute".

### B4.1 — Khởi động provider

Mở terminal thứ nhất:

```bash
npm start --prefix src/sample-api/pact-workshop-js/provider
```

Kiểm tra tại terminal thứ hai:

```bash
curl http://localhost:8080/health
```

Kết quả mong đợi: `{"status":"ok"}`.

### B4.2 — Tạo iteration data

Chọn **5 test case** từ danh sách đã audit + extend (bắt buộc có ít nhất một `200`, một `404` và một `401`).

Sao chép `src/postman/data/get-product-by-id.data.json` thành `mini-get-product.data.json`, sau đó giữ đúng 5 dòng tương ứng. Không thay đổi tên các key mà collection đang sử dụng.

Mỗi dòng tối thiểu phải có:

```json
{
  "tc_id": "MINI_01",
  "description": "Existing product with valid token",
  "product_id": "10",
  "auth_header": "{{validToken}}",
  "expected_status": 200,
  "expect_field_id": "10",
  "expect_field_type": "CREDIT_CARD",
  "expect_field_name": "28 Degrees"
}
```

Với case lỗi, dùng `expect_message_field: "message"` cho `404` hoặc `expect_error_field: "error"` cho `401`.

### B4.3 — Thêm dấu vết cá nhân và assertion

Import collection và environment ở phần 3.2 vào Postman. Thêm environment variable:

```text
studentId = <MSSV của bạn>
```

Trong pre-request script của request `GET /product/:id [by id]`, thêm:

```javascript
pm.request.headers.upsert({
  key: "X-Student-Id",
  value: pm.environment.get("studentId"),
});
```

Trong test script của cùng request, tự viết thêm **một assertion** kiểm tra `Content-Type` hoặc response time. Ví dụ assertion chỉ dùng để tham khảo cấu trúc:

```javascript
pm.test("[MINI] Response is JSON", () => {
  pm.expect(pm.response.headers.get("Content-Type")).to.include(
    "application/json",
  );
});
```

Chạy folder `GET — Happy Path` bằng Collection Runner với `mini-get-product.data.json`. Collection này dùng assertion dựa trên `expected_status`, nên 5 iteration có thể bao gồm cả positive và negative case.

### B4.4 — Chạy Newman

Export collection và environment sau khi chỉnh sửa thành:

```text
mini-product-service.postman_collection.json
mini-local.postman_environment.json
```

Chạy:

```bash
newman run mini-product-service.postman_collection.json \
  --environment mini-local.postman_environment.json \
  --iteration-data mini-get-product.data.json \
  --folder "GET — Happy Path" \
  --reporters cli,json \
  --reporter-json-export mini-newman-report.json
```

Checkpoint:

- Có đúng 5 iteration của request `GET /product/:id`.
- Không có assertion fail.
- `mini-newman-report.json` tồn tại.
- Console hoặc Postman Console cho thấy request có `X-Student-Id` đúng MSSV.

## 8. Bước 5 — CI/CD

> Tương đương HW6 yêu cầu "Integrate into CI/CD" — hai sample commits: pass và fail.

Repository đã có sẵn workflow `.github/workflows/newman-api-test.yml`. Workflow này tự động khởi động Provider, cài Newman, chạy collection và upload report.

### C1 — Commit pass

Commit và push bài làm lên nhánh riêng của bạn (ví dụ `feature/<MSSV>`) trên repository nhóm đã fork từ `eshop-sut`. Mở tab **Actions** trên GitHub, chọn đúng nhánh của bạn và chờ workflow `Newman API tests` chạy hoàn thành.

Chụp ảnh kết quả pipeline **pass** (tất cả test đều xanh). Lưu ảnh: `ci-pass.png`.

### C2 — Commit fail (có chủ đích)

Sửa một giá trị kỳ vọng trong data file (ví dụ đổi `expected_status` từ `200` thành `999`) để gây assertion fail. Commit và push.

Chờ pipeline chạy lại. Chụp ảnh kết quả **fail** (có ít nhất một test đỏ). Lưu ảnh: `ci-fail.png`.

### C3 — Khôi phục

Sửa lại giá trị đúng, commit và push lần cuối. Bài chỉ hoàn thành khi pipeline trở lại trạng thái pass.

Checkpoint:

- Có hai ảnh: `ci-pass.png` và `ci-fail.png`.
- Commit cuối cùng trên nhánh phải pass.

## 9. Bước 6 — Postman features

> Tương đương HW6 yêu cầu "Exercise as many Postman features as you reasonably can".

Trong `test-design.md`, thêm một bảng liệt kê các Postman features bạn đã dùng trong bài:

| Feature                                          | Đã dùng? | Ghi chú |
| ------------------------------------------------ | -------- | ------- |
| Collections                                      | ✅ / ❌  |         |
| Environment variables                            | ✅ / ❌  |         |
| Collection variables                             | ✅ / ❌  |         |
| Pre-request scripts                              | ✅ / ❌  |         |
| Test scripts (assertions)                        | ✅ / ❌  |         |
| Data-driven runs (Collection Runner + data file) | ✅ / ❌  |         |
| Newman CLI                                       | ✅ / ❌  |         |
| Monitors                                         | ✅ / ❌  |         |
| Mock servers                                     | ✅ / ❌  |         |
| Workspaces                                       | ✅ / ❌  |         |

Đánh dấu ✅ cho feature đã dùng và viết ghi chú ngắn (1 câu). Bài tập bắt buộc ít nhất 6 feature.

## 10. Thành phần bài nộp

Nộp một file `.zip` tên `<MSSV>_Mini_API_Testing.zip` gồm các thành phần sau:

1. `test-design.md`: prompt, AI output rút gọn, bảng audit, test case tự bổ sung (extend), và bảng Postman features.
2. `mini-get-product.data.json`.
3. `mini-product-service.postman_collection.json` và `mini-local.postman_environment.json`.
4. `mini-newman-report.json`.
5. Hai ảnh: `ci-pass.png` và `ci-fail.png`.

Không nộp `node_modules`, token, cookie, API key hoặc credential.

## 11. Tài liệu tham khảo

- HW06 – API Testing: `docs/reports/2026.HW06.API Testing_En (1).md`.
- Newman command-line options: <https://github.com/postmanlabs/newman#command-line-options>.
- GitHub Actions documentation: <https://docs.github.com/en/actions>.
- Postman collection và data files của seminar: `src/postman/README.md`.
