# Kịch bản demo (multiple videos)

> Danh sách kịch bản demo dự kiến cho seminar. Mỗi kịch bản → **một video** riêng.
> Trạng thái: Outline — quay video & viết script chi tiết ở các tuần sau. Chỉnh sửa và hoàn thiện qua từng tuần

## Tổng quan

| #   | Video                        | Nội dung chính                                                            | Công cụ                                  | Phụ trách |
| --- | ---------------------------- | ------------------------------------------------------------------------- | ---------------------------------------- | --------- |
| 1   | Setup & Request cơ bản       | Chạy API mẫu, tạo Collection, gửi GET/POST, đọc response/status           | Postman                                  | 23127211  |
| 2   | Hướng dẫn cài đặt môi trường | Cài Node.js, Postman, REST Client; clone repo và cấu hình PactFlow Broker | Node.js, Postman, VS Code, Git, PactFlow | 23127211  |
| 3   | Script & Assertion           | Pre-request script, test script kiểm tra status/body/schema               | Postman                                  | 23127211  |
| 4   | Data-driven testing          | Chạy 1 request với nhiều bộ dữ liệu từ CSV/JSON                           | Postman                                  | 23127211  |
| 5   | API có authenticate          | Login lấy token/JWT, dùng token cho request được bảo vệ                   | Postman                                  | 23127211  |
| 6   | Automation với Newman        | Export collection, chạy bằng Newman CLI, đọc report                       | Newman                                   | 23127148  |
| 7   | CI/CD                        | Chạy Newman tự động khi push code lên GitHub                              | GitHub Actions                           | 23127152  |
| 8   | Contract – Consumer          | Consumer viết test, sinh file pact                                        | Pact                                     | 23127148  |
| 9   | Contract – Provider          | Provider verify pact, phát hiện breaking change                           | Pact                                     | 23127065  |
| 10  | AI hỗ trợ testing            | Dùng AI sinh test case / collection từ mô tả API                          | Claude/skill                             | 23127148  |

## Chi tiết từng kịch bản _(điền dần)_

### Video 1 — Setup & Request cơ bản

- **Mục tiêu:** người xem tạo được collection và gửi request đầu tiên tới API mẫu.
- **Chuẩn bị:** API mẫu chạy ở `localhost:3000`, Postman.
- **Các bước:** _(bổ sung)_
- **Kỳ vọng:** response 200, body đúng schema.

### Video 2 — Hướng dẫn cài đặt môi trường

- **Mục tiêu:** Chuẩn bị đầy đủ công cụ, clone source code và kiểm tra kết nối PactFlow Broker an toàn.
- **Kịch bản chi tiết:** [`videos/video-02-environment-setup-script.md`](videos/video-02-environment-setup-script.md)

### Video 3 — Script & Assertion

- **Mục tiêu:** _(bổ sung)_

### Video 4 — Data-driven testing

- **Mục tiêu:** _(bổ sung)_

### Video 5 — API có authenticate

- **Mục tiêu:** _(bổ sung)_

### Video 6 — Automation với Newman

- **Mục tiêu:** _(bổ sung)_

### Video 7 — CI/CD

- **Mục tiêu:** _(bổ sung)_

### Video 8 — Contract Consumer

- **Mục tiêu:** _(bổ sung)_

### Video 9 — Contract Provider

- **Mục tiêu:** _(bổ sung)_

### Video 10 — AI hỗ trợ testing

- **Mục tiêu:** _(bổ sung)_
