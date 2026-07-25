# Weekly Report

## General Information

- **Group ID:** 03
- **Group Name:** SEBros
- **Project Name:** API & Contract Testing
- **Date range:** 2026-07-20 – 2026-07-25

## Tasks Completed This Week

### 23127115 – Mạch Quốc Tấn

- Thiết lập tệp kịch bản (shell script) để thực thi Postman Collection tự động bằng Newman và Postman CLI tại local.
- Cấu hình xuất các báo cáo kết quả kiểm thử API dưới dạng HTML (sử dụng newman-reporter-htmlextra) và tệp JSON phục vụ ghi nhận kết quả.

Evidence: [Output documents](https://drive.google.com/drive/folders/1RO6n4toMr-L0y8fpNUPjMvYQUJ4KOUiN?usp=drive_link)

### 23127065 – Ngô Nguyễn Thế Khoa

- Cấu hình GitHub Actions CI/CD workflow để tự động chạy các bài kiểm tra Pact Verification cho cả dịch vụ Consumer và Provider khi đẩy mã nguồn mới lên nhánh chính.
- Tự động hóa quá trình xác minh hợp đồng Pact khi phát sinh commit hoặc Pull Request từ các thành viên.

Evidence: [Output documents](https://drive.google.com/drive/folders/1JMzcmoH7I4DBsSRNctX_HpEdG0imi2Pg?usp=drive_link)

### 23127211 – Nguyễn Lê Hồ Anh Khoa

- Viết tệp cấu hình YAML và tích hợp Newman vào GitHub Actions CI/CD pipeline để chạy tự động kiểm thử toàn bộ API endpoints sau mỗi lần build hoặc triển khai (deploy).
- Cấu hình hệ thống lưu trữ (artifacts upload) của GitHub Actions để lưu giữ báo cáo kết quả test của Newman sau mỗi lượt chạy.

Evidence: [Output documents](https://drive.google.com/drive/folders/1gUoxEtnr4AzoaZwzJDExDS3TMRSjS6fd?usp=drive_link)

### 23127148 – Ân Tiến Nguyên An

- Tích hợp cổng kiểm soát chất lượng bằng lệnh `can-i-deploy` của Pact CLI trong GitHub Actions.
- Thiết lập cơ chế chặn (block) không cho phép merge Pull Request hoặc deploy nếu kết quả xác thực giữa Consumer và Provider vi phạm hợp đồng (quality gate).

Evidence: [Output documents](https://drive.google.com/drive/folders/1p5hRGjgmb3ThYGlRhmlrwqA5hAwTfP-4?usp=drive_link)

### 23127152 – Nguyễn Tuấn Anh

- Thử nghiệm sinh test case tự động bằng Postman Postbot và biên soạn tài liệu đánh giá tính thực tiễn của công cụ AI này.
- Xây dựng bộ cẩm nang prompts thông minh cho ChatGPT và Claude nhằm hướng dẫn các bạn cùng lớp viết test script cho Postman và tạo cấu trúc kiểm thử hợp đồng tự động.

Evidence: [Output documents](https://drive.google.com/drive/folders/1yEfPRzno5rRhoHJeYPakj63vFchUC2Pf?usp=drive_link)

## AI Usage Declaration

- Các thành viên nhóm đã sử dụng các công cụ AI (Claude, ChatGPT, Postman Postbot,...) để hỗ trợ biên soạn tài liệu đánh giá công cụ AI và xây dựng cấu trúc workflow CI/CD.

| Thành viên                              | Công cụ AI                   | Thời gian truy cập         | Mục đích sử dụng                                                                                                                                  | Minh chứng                                                                                                 |
| :-------------------------------------- | :--------------------------- | :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------- |
| **Mạch Quốc Tấn**<br>(23127115)         | Claude Sonnet 4.6 (Thinking) | 2026-07-25 10:00:00 +07:00 | Hỗ trợ thiết lập shell script chạy Newman/Postman CLI và cấu hình báo cáo HTML/JSON tự động.                                                      | [AI Audit Report](https://drive.google.com/drive/folders/1cZTwtXoHKfrAcUMnOO8DO89e-o2Va6TY?usp=drive_link) |
| **Ngô Nguyễn Thế Khoa**<br>(23127065)   | ChatGPT                      | 2026-07-24 15:30:00 +07:00 | Hỗ trợ cấu hình GitHub Actions CI/CD workflow cho bài kiểm tra Pact Verification cho Consumer và Provider.                                        | [AI Audit Report](https://drive.google.com/drive/folders/1rgrEp0gmC7kiUlnDe6Pslr3H--dgjIwF?usp=drive_link) |
| **Nguyễn Lê Hồ Anh Khoa**<br>(23127211) | Claude Opus 4.8              | 2026-07-24 11:20:00 +07:00 | Hỗ trợ tích hợp Newman vào GitHub Actions CI/CD pipeline và cấu hình lưu trữ test artifacts.                                                      | [AI Audit Report](https://drive.google.com/drive/folders/1tcFhcu_VUzb9pvGOyPFa_u8z0qkdCR5F?usp=drive_link) |
| **Ân Tiến Nguyên An**<br>(23127148)     | Claude Sonnet 4.6 (Thinking) | 2026-07-25 14:15:00 +07:00 | Hỗ trợ tích hợp quality gate `can-i-deploy` của Pact CLI trong GitHub Actions.                                                                    | [AI Audit Report](https://drive.google.com/drive/folders/1kwi7ROYJkbCgIhK6sqfS5mpLspEZguAd?usp=drive_link) |
| **Nguyễn Tuấn Anh**<br>(23127152)       | Postman Postbot & ChatGPT    | 2026-07-25 16:45:00 +07:00 | Hỗ trợ thử nghiệm sinh test case bằng Postman Postbot, đánh giá công cụ AI và biên soạn cẩm nang prompts thông minh cho Postman/Contract testing. | [AI Audit Report](https://drive.google.com/drive/folders/190_RqQz9wr1yj7ojzsLRXYmTmZ02p3Om?usp=drive_link) |

## Tasks Planned for Next Week

- **Agent Skill & Reusability**: Thiết kế kiến trúc, pseudocode và implement Agent Skill prototype tái sử dụng (chuyển đổi API Spec OpenAPI/Markdown thành test cases + Postman collection), tích hợp vào Lab Manual.
- **Slide Master Hub**: Hoàn thiện slide Slidev với phần API Testing và Contract Testing, thiết kế Agenda/sitemap làm Navigation Hub liên kết toàn bộ artifacts.
- **Final Seminar Report**: Viết toàn bộ nội dung Final Report (Chapter 1-7), AI Critique và chuẩn bị kịch bản chi tiết cho các video.

## Issues

- Không có vấn đề phát sinh trong tuần này.
