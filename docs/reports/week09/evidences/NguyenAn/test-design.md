# W09 Mini Exercise - Test Design & Audit

## Thông tin sinh viên (Student Information)
- **Họ tên:** Ân Tiến Nguyên An
- **MSSV:** 23127148
- **Lớp:** Software Testing (SEBros - Nhóm 3)
- **Bài tập:** Mini Exercise W09 — Từ API Test đến Contract Breaking Change
- **Ngày thực hiện:** 2026-08-05

---

## 1. Prompt thiết kế Test Case gửi AI

**Prompt người dùng:**
```text
Bạn là một AI kiểm thử chuyên nghiệp. Hãy thiết kế đúng 6 test case cho endpoint sau của Product Service:
GET /product/{id}
Authorization: Bearer <ISO-8601 timestamp trong vòng 1 giờ>
X-Student-Id: <MSSV>

Response thành công (200 OK) phải có dạng:
{
  "id": "10",
  "type": "CREDIT_CARD",
  "name": "28 Degrees",
  "version": "v1"
}

Hành vi đã biết của SUT:
- id tồn tại và token hợp lệ: 200 OK
- id không tồn tại và token hợp lệ: 404 Not Found, body có field 'message'
- Thiếu token hoặc token hết hạn: 401 Unauthorized, body có field 'error'

Yêu cầu xuất ra bảng Markdown gồm các cột: tc_id, description, input (product_id, auth_header), expected_status, expected_fields, và rationale.
Các test case phải bao quát: Happy path, Partition của id, Authentication, và Response Schema.
```

---

## 2. Kết quả đề xuất từ AI (Rút gọn)

Dưới đây là bảng 6 test case do AI đề xuất:

| tc_id | description | product_id | auth_header | expected_status | expected_fields | rationale |
|---|---|---|---|---:|---|---|
| TC-01 | Happy path - Lấy sản phẩm ID 10 tồn tại | `10` | `{{validToken}}` | 200 | `id`, `type`, `name`, `version` | Kiểm tra luồng thành công với ID hợp lệ và token hợp lệ. |
| TC-02 | Happy path - Lấy sản phẩm ID 09 tồn tại | `09` | `{{validToken}}` | 200 | `id`, `type`, `name`, `version` | Kiểm tra luồng thành công với ID hợp lệ khác. |
| TC-03 | Not found - ID không tồn tại trên hệ thống | `99` | `{{validToken}}` | 404 | `message` | Phân vùng ID không tồn tại, trả lỗi 404. |
| TC-04 | Bad Request - ID sai định dạng (chuỗi chữ) | `abc` | `{{validToken}}` | 400 | `message` | Phân vùng ID không hợp lệ về mặt cú pháp (chữ thay vì số). |
| TC-05 | Unauthorized - Thiếu header Authorization | `10` | (trống) | 401 | `error` | Kiểm tra bảo mật khi không cung cấp token. |
| TC-06 | Unauthorized - Token đã hết hạn | `10` | `Bearer 2020-06-01T10:00:00.000Z` | 401 | `error` | Kiểm tra token hết hạn (quá 1 giờ so với thời gian hiện tại). |

---

## 3. Nhật ký Human Review & Audit

Chúng ta tiến hành đánh giá độ chính xác của 6 test case từ AI dựa trên hành vi thực tế của SUT:

| TC | Nhãn (Label) | Nhận xét hoặc chỉnh sửa (Review Comments & Corrections) |
|---|---|---|
| TC-01 | `VALID` | Đúng luồng happy path. ID `10` (28 Degrees) thực tế tồn tại trên database mẫu của Provider. |
| TC-02 | `VALID` | Đúng luồng happy path. ID `09` (Gem Visa) thực tế tồn tại trên database mẫu của Provider. |
| TC-03 | `VALID` | Đúng luồng ID không tồn tại. Provider trả về `404 Not Found` kèm JSON chứa field `message`. |
| TC-04 | `INVALID` | **Lỗi của AI:** AI giả định nhập chữ `abc` sẽ trả về `400 Bad Request`. Tuy nhiên, trong đặc tả thực tế của SUT, endpoint nhận `:id` dưới dạng param động, không có validation ép kiểu số ở route-level nên request gửi tới controller và nhận kết quả `404 Not Found` từ repository. **Chỉnh sửa:** Sửa `expected_status` thành `404` và expected_fields thành `message`. |
| TC-05 | `VALID` | Đúng luồng lỗi authentication khi không có token. |
| TC-06 | `VALID` | Đúng luồng lỗi authentication với token cũ ngoài 1 giờ. |

---

## 4. Test Case tự bổ sung (Omission by AI)

### Bổ sung: TC-07 (Format-Bypass Token)
- **Description:** Kiểm tra gửi token sai định dạng hoàn toàn (không chứa timestamp ISO-8601).
- **Input:** `product_id` = `"10"`, `auth_header` = `"Bearer token_chuoi_chu_random"`
- **Expected Status:** `401`
- **Expected Fields:** `error`
- **Rationale / Giải thích tại sao AI bỏ sót:** AI có xu hướng chỉ suy nghĩ theo các partition đơn giản do đề bài gợi ý (thiếu token/token hết hạn), bỏ qua trường hợp định dạng token bị lỗi cú pháp parser (ví dụ: parser cố phân tách ISO-8601 nhưng crash hoặc không xử lý ngoại lệ).

---

## 5. Danh sách 5 Test Case chọn để chạy thực tế
Chúng ta chọn 5 test case sau để đưa vào Postman data-driven runner:
1. **GET_BY_ID_01** (tương đương TC-02): Lấy sản phẩm `09` thành công (`200 OK`).
2. **GET_BY_ID_02** (tương đương TC-01): Lấy sản phẩm `10` thành công (`200 OK`).
3. **GET_BY_ID_03** (tương đương TC-03): Lấy sản phẩm `99` không tồn tại (`404 Not Found`).
4. **GET_BY_ID_04** (tương đương TC-04 đã sửa): Nhập ID `abc` (`404 Not Found`).
5. **GET_BY_ID_05** (tương đương TC-06): Token hết hạn (`401 Unauthorized`).

---

## 6. Exit Ticket

### Câu 1: Vì sao Postman/Newman test và Pact test không thay thế lẫn nhau?
- **Postman/Newman test** là functional API tests, tập trung kiểm thử hành vi thực tế của API (hệ thống SUT đầy đủ bao gồm database, logic nghiệp vụ, tích hợp) tại thời điểm chạy để phát hiện lỗi chức năng.
- **Pact test** là contract tests (kiểm thử hợp đồng), tập trung kiểm thử sự tương thích giao tiếp giữa Consumer và Provider (shape của request/response) mà không cần chạy toàn bộ hệ thống hay database thật. Nó bảo vệ tích hợp chống lại breaking changes trước khi deploy.

### Câu 2: Tại sao đổi `name` thành `title` là breaking change dù HTTP status vẫn có thể là `200`?
- Dù HTTP status vẫn trả về `200 OK` (chứng tỏ server xử lý thành công), nhưng Consumer (frontend) đang được code cứng để đọc giá trị từ thuộc tính `name` (ví dụ: `product.name`). Việc đổi tên field sang `title` khiến frontend nhận giá trị `undefined`, dẫn đến lỗi hiển thị giao diện hoặc crash ứng dụng client. Do đó, đây là một breaking change làm đứt gãy sự tích hợp.
