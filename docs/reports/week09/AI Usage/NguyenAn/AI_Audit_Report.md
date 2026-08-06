# AI Audit Report — Seminar W09

## Thông tin sinh viên (Student Information)

| Field                          | Value                                                 |
| ------------------------------ | ----------------------------------------------------- |
| **MSSV (Student ID)**          | 23127148                                              |
| **Họ tên (Full Name)**         | Ân Tiến Nguyên An                                     |
| **Mã bài tập (Assignment)**    | Seminar W09 — Mini Exercise API & Contract Testing    |
| **Ngày nộp (Submission Date)** | 2026-08-05                                            |

## Tuyên bố sử dụng AI (AI Usage Declaration)

> "Tôi sử dụng công cụ AI để thực hiện các công việc: Hỗ trợ thiết kế các test case cho endpoint `GET /product/:id` từ mô tả kỹ thuật ban đầu."

## Tổng quan sử dụng AI (AI Usage Overview)

| #   | AI Tool          | Task Category | Feature            | Date       | Bloom-AI Level  |
| --- | ---------------- | ------------- | ------------------ | ---------- | --------------- |
| 1   | Claude 3.5 Sonnet| Test Design   | GET /product/:id   | 2026-08-05 | G9.2 — Apply    |

## Chi tiết từng lần sử dụng AI (Entries)

### Entry 1 — Thiết kế test case cho GET /product/:id

| Field              | Value                                                              |
| ------------------ | ------------------------------------------------------------------ |
| **AI Tool**        | Claude 3.5 Sonnet (via antigravity IDE SDK)                        |
| **Date/Time**      | 2026-08-05 10:00:00 +07:00                                         |
| **Task**           | Sinh bộ test case ban đầu gồm Happy Path và Negative Path          |
| **Feature**        | GET /product/:id                                                   |
| **Bloom-AI Level** | G9.2 — Apply (Áp dụng các kỹ thuật phân vùng tương đương, biên)    |

#### Prompt

**Prompt người dùng:**

```text
Act as a software testing expert. Generate a data-driven test suite for the Product Service endpoint:
GET /product/:id

Here is the specification:
1. Base URL: http://localhost:8080
2. Authentication: Authorization header with value "Bearer <timestamp>" (where timestamp is in ISO format, valid for 5 minutes).
3. Happy Path:
   - When id is a valid numeric string, it returns 200 OK and response body:
     {
       "id": "10",
       "name": "28 Degrees",
       "type": "CREDIT_CARD",
       "version": "v1"
     }
4. Negative Path:
   - When id does not exist, it returns 404 Not Found.
   - When id is invalid (not a numeric string), it returns 400 Bad Request.
   - When auth token is expired or missing, it returns 401 Unauthorized.

Generate exactly 6 test cases in a markdown table format with columns: ID, Description, Input id, Auth Token, Expected Status, Expected Body details.
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: GENERATE

Các bước AI đã thực hiện:
1. Đọc và phân tích đặc tả API và các ràng buộc về id và Authorization header.
2. Thiết kế 3 test case Happy Path kiểm tra các ID hợp lệ, biên hợp lệ.
3. Thiết kế 3 test case Negative Path kiểm tra ID không tồn tại, định dạng ID không hợp lệ, và Authorization lỗi.
4. Trình bày dưới dạng bảng Markdown hoàn chỉnh.
```

#### AI Output

```text
AI trả về bảng gồm 6 test case từ TC-01 đến TC-06:
- TC-01, TC-02, TC-03: Happy Path (id = 10, id = 09, id = 2) kiểm tra 200 OK.
- TC-04: Negative Path (id = "abc") kiểm tra 400 Bad Request.
- TC-05: Negative Path (id = 99 - không tồn tại) kiểm tra 404 Not Found.
- TC-06: Negative Path (hết hạn token) kiểm tra 401 Unauthorized.
```

#### Human Review

| Aspect           | Detail                                                                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reviewed by      | Ân Tiến Nguyên An                                                                                                                                                               |
| Review date      | 2026-08-05                                                                                                                                                                      |
| Corrections made | Có. Phát hiện TC-04 (id = "abc") trả về 400 Bad Request là sai lệch với SUT thực tế (SUT trả về 404 Not Found). Bổ sung thủ công TC-07 kiểm tra Format-Bypass Token bảo mật.     |
| Quality rating   | Good (hạ từ Excellent sau khi phát hiện lỗi logic ở TC-04)                                                                                                                      |
| Issues found     | AI không nắm rõ hành vi thực tế của mã nguồn SUT đối với các ID không phải là số (chuỗi định dạng chữ), dẫn đến thiết kế sai Expected Status từ 404 thành 400.                   |

## Thống kê tổng hợp (Summary Statistics)

| Metric                                               | Value                                                              |
| ---------------------------------------------------- | ------------------------------------------------------------------ |
| Total AI interactions                                | 1                                                                  |
| AI tools used                                        | Claude 3.5 Sonnet                                                  |
| Features covered                                     | GET /product/:id                                                   |
| Documents created / updated                          | docs/reports/week09/evidences/NguyenAn/test-design.md             |
| Issues found by audit                                | 1                                                                  |
| Issues resolved                                      | 1/1                                                                |
| Test cases generated                                 | 6                                                                  |

### AI Contribution Breakdown

| Task                    | AI Contribution | Human Contribution |
| ----------------------- | --------------- | ------------------ |
| Research & Synthesizing | 80%             | 20%                |
| Document Structuring    | 90%             | 10%                |
| Test Case Design        | 60%             | 40%                |

## Compliance Checklist (HW02 §9)

- [x] Tuyên bố sử dụng AI
- [x] Tên công cụ AI sử dụng
- [x] Ngày và giờ của từng tương tác
- [x] Prompt chi tiết của người dùng
- [x] Kết quả phản hồi của AI
- [x] Nhật ký đánh giá của sinh viên (Human Review)
- [x] Định dạng Markdown chuẩn
