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

Evidence: Expected deliverables: Shell script runner (`src/newman/run-newman.sh`) & HTML test report output.

### 23127065 – Ngô Nguyễn Thế Khoa

- Cấu hình GitHub Actions CI/CD workflow để tự động chạy các bài kiểm tra Pact Verification cho cả dịch vụ Consumer và Provider khi đẩy mã nguồn mới lên nhánh chính.
- Tự động hóa quá trình xác minh hợp đồng Pact khi phát sinh commit hoặc Pull Request từ các thành viên.

Evidence: Expected deliverables: Workflow file `.github/workflows/pact-verification.yml` & Pact verification log.

### 23127211 – Nguyễn Lê Hồ Anh Khoa

- Viết tệp cấu hình YAML và tích hợp Newman vào GitHub Actions CI/CD pipeline để chạy tự động kiểm thử toàn bộ API endpoints sau mỗi lần build hoặc triển khai (deploy).
- Cấu hình hệ thống lưu trữ (artifacts upload) của GitHub Actions để lưu giữ báo cáo kết quả test của Newman sau mỗi lượt chạy.

Evidence: Expected deliverables: CI workflow YAML file & artifacts upload configuration.

### 23127148 – Ân Tiến Nguyên An

- Tích hợp cổng kiểm soát chất lượng bằng lệnh `can-i-deploy` của Pact CLI trong GitHub Actions.
- Thiết lập cơ chế chặn (block) không cho phép merge Pull Request hoặc deploy nếu kết quả xác thực giữa Consumer và Provider vi phạm hợp đồng (quality gate).

Evidence: Expected deliverables: `can-i-deploy` quality gate step in CI/CD pipeline.

### 23127152 – Nguyễn Tuấn Anh

- Thử nghiệm sinh test case tự động bằng Postman Postbot và biên soạn tài liệu đánh giá tính thực tiễn của công cụ AI này.
- Xây dựng bộ cẩm nang prompts thông minh cho ChatGPT và Claude nhằm hướng dẫn các bạn cùng lớp viết test script cho Postman và tạo cấu trúc kiểm thử hợp đồng tự động.

Evidence:
- Postbot: [`postbot-evaluation.md`](evidences/TuanAnh/postbot-evaluation.md) (+ `r1.png`…`r9.png`)
- Prompt Guide: [`prompt-guide.md`](evidences/TuanAnh/prompt-guide.md) (+ `r2_chatgpt.png`, `r4_chatgpt.png`, [`r2_chatgpt_ai_review.md`](evidences/TuanAnh/r2_chatgpt_ai_review.md))
- Collection: [`w07-postbot-testing.postman_collection.json`](evidences/TuanAnh/w07-postbot-testing.postman_collection.json)
- AI Audit: [`AI Usage/TuanAnh/AI_Audit_Report.md`](AI%20Usage/TuanAnh/AI_Audit_Report.md)

## AI Usage Declaration

Nhóm đã sử dụng các công cụ AI (Claude, ChatGPT, Postman Postbot) để hỗ trợ biên soạn tài liệu đánh giá công cụ AI và hỗ trợ tạo cấu trúc workflow CI/CD.

Link: [`AI Usage/TuanAnh/AI_Audit_Report.md`](AI%20Usage/TuanAnh/AI_Audit_Report.md) (và các thành viên khác trong `AI Usage/`)

## Tasks Planned for Next Week

- **Agent Skill & Reusability**: Thiết kế kiến trúc, pseudocode và implement Agent Skill prototype tái sử dụng (chuyển đổi API Spec OpenAPI/Markdown thành test cases + Postman collection), tích hợp vào Lab Manual.
- **Slide Master Hub**: Hoàn thiện slide Slidev với phần API Testing và Contract Testing, thiết kế Agenda/sitemap làm Navigation Hub liên kết toàn bộ artifacts.
- **Final Seminar Report**: Viết toàn bộ nội dung Final Report (Chapter 1-7), AI Critique và chuẩn bị kịch bản chi tiết cho các video.

## Issues

- Không có vấn đề phát sinh trong tuần này.
