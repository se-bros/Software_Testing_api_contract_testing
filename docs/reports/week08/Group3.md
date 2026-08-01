# Weekly Report

## General Information

- **Group ID:** 03
- **Group Name:** SEBros
- **Project Name:** API & Contract Testing
- **Date range:** 2026-07-27 – 2026-08-01

## Tasks Completed This Week

#### 23127065 – Ngô Nguyễn Thế Khoa

- Viết nội dung Final Report: Chapter 3 (Contract Testing), Chapter 5 (Automation/CI-CD), Chapter 6 (Kết luận & Đánh giá tính tái sử dụng >80%), Chapter 7 (Tài liệu tham khảo) và bài nhận xét AI Critique (200-300 từ).
- Viết kịch bản chi tiết **Video 2 (Hướng dẫn cài đặt môi trường)**: liệt kê từng bước cài đặt Node.js, Postman, VS Code REST Client extension, Git clone repo và cấu hình tài khoản PactFlow Broker.
- Tổng hợp AI Audit Report (`AI_Audit_Report.md`) theo chuẩn AI Usage Guidelines.

Evidence: [Output documents](link_google_drive_evidence_khoango)

### 23127148 – Ân Tiến Nguyên An

- Viết nội dung Final Report: Chapter 1 (Giới thiệu) & Chapter 2 (API Testing).
- Review kịch bản chi tiết **Video 2 (Hướng dẫn cài đặt môi trường)**: phần cài đặt Postman, import collection mẫu, cấu hình environment variables và kiểm tra Newman CLI hoạt động.
- Kiểm thử, gỡ lỗi (verify & debug) mã nguồn demo sẵn sàng cho quay video: Đảm bảo Pact consumer/provider test scripts hoạt động đúng trên local/CI, tối ưu hóa Newman runner scripts và xác minh GitHub Actions workflow pass 100% trên CI.
- Cập nhật `README.md`: bổ sung hướng dẫn sử dụng Agent Skill và cấu trúc thư mục dự án.

Evidence: [Output documents](link_google_drive_evidence_nguyenan)

### 23127115 – Mạch Quốc Tấn

- Đảm nhiệm chính cho Slide.
- Tối ưu theme Slidev (Light/Dark contrast, font size hiển thị rõ trên máy chiếu) theo góp ý Giảng viên.
- Xây dựng Prompt Guide standalone cho ChatGPT/Claude giúp sinh test script Postman và contract test.

Evidence: [Output documents](link_google_drive_evidence_quoctan)

### 23127152 – Nguyễn Tuấn Anh

- Đảm nhiệm chính cho Slide.
- Tối ưu theme Slidev (Light/Dark contrast, font size hiển thị rõ trên máy chiếu) theo góp ý Giảng viên.
- Chuẩn bị Postman collections (`postman_collection.json`) + test data files (`login-dataset.csv`, `env_dev.json`) đính kèm trong repo phục vụ demo và thực hành trên lớp.

Evidence: [Output documents](link_google_drive_evidence_tuananh)

### 23127211 – Nguyễn Lê Hồ Anh Khoa

- Viết kịch bản chi tiết **Video 1 (Lý thuyết & Thuật ngữ API / Contract Testing)**: dựa trên nội dung slide đã hoàn thiện, soạn lời thoại và thứ tự trình bày cho video lý thuyết. Nhớ là video lý thuyết sẽ phải đầy đủ chi tiết. Vì slide không cần chi tiết quá, chừa thời gian thực hành tại lớp.
- Viết kịch bản chi tiết **Video 3 (Demo thực hành tổng hợp)**: có thể tham khảo thiết kế luồng demo Postman test script → Newman CI/CD → Pact Consumer/Provider → Breaking Change simulation → Agent Skill chạy trên PetStore API (chứng minh Reusability >80%).
- Chuẩn bị Agent Skill demo trên Swagger PetStore API: kiểm thử trên môi trường máy sạch (clean environment) để đảm bảo tính độc lập và tái sử dụng.

Evidence: [Output documents](link_google_drive_evidence_khoanguyen)

## AI Usage Declaration

- Các thành viên nhóm đã sử dụng các công cụ AI (Gemini, Claude, Qoder, Codex,...) để hỗ trợ biên soạn nội dung Final Report, soạn slide Slidev, thiết kế kịch bản video và chuẩn bị demo code.

| Thành viên | Công cụ AI | Thời gian truy cập | Mục đích sử dụng | Minh chứng |
| :--- | :--- | :--- | :--- | :--- |
| **Ngô Nguyễn Thế Khoa**<br>(23127065) | Codex GPT 5.6-sol / OpenAI Codex v0.145.0 — GPT-5.6-sol (medium) | 2026-07-16 08:30:47 +07:00<br>2026-07-28 19:54:26 +07:00 | Hỗ trợ soạn thảo nội dung lý thuyết, sơ đồ kiến trúc Contract Testing (Consumer–Provider), xây dựng deck trình chiếu Slidev và biên soạn kịch bản Video 2 hướng dẫn cài đặt môi trường Node.js, Postman, VS Code REST Client, Git và PactFlow Broker. | [AI Audit Report](link_google_drive_ai_audit_khoango) |
| **Ân Tiến Nguyên An**<br>(23127148) | Gemini 3.5 Flash | 2026-08-01 21:36:07 +07:00<br>2026-08-01 21:56:34 +07:00 | Hỗ trợ biên soạn nội dung Chapter 1, Chapter 2 và Chapter 4 của báo cáo Final Report, cập nhật README.md bổ sung hướng dẫn sử dụng Agent Skill & cấu trúc thư mục, đồng thời kiểm thử gỡ lỗi mã nguồn demo. | [AI Audit Report](link_google_drive_ai_audit_nguyenan) |
| **Mạch Quốc Tấn**<br>(23127115) | Claude Sonnet 5 | 2026-08-01 08:14:00 +07:00<br>2026-08-01 08:45:00 +07:00<br>2026-08-01 09:30:00 +07:00 | Hỗ trợ xây dựng tài liệu hướng dẫn prompt (Prompt Guide) sinh Postman test script và contract test (cho web/coding agent), tự phản biện/audit và cập nhật nội dung. | [AI Audit Report](link_google_drive_ai_audit_quoctan) |
| **Nguyễn Tuấn Anh**<br>(23127152) | Qoder — qwen3.8-coder-preview | 2026-07-28 14:50:00 +07:00<br>2026-07-28 14:55:00 +07:00<br>2026-07-28 15:00:00 +07:00 | Hỗ trợ sửa lỗi tràn nội dung (overflow) và chỉnh Mermaid theme trong Slidev, thêm footnote chú thích thuật ngữ cốt lõi và thêm trang slide giới thiệu thành viên nhóm. | [AI Audit Report](link_google_drive_ai_audit_tuananh) |
| **Nguyễn Lê Hồ Anh Khoa**<br>(23127211) | Claude Opus 5 (Claude Code CLI) | 2026-07-31 11:38:00 +07:00<br>2026-07-31 13:49:00 +07:00 | Hỗ trợ thiết kế và biên soạn 2 Agent Skill (api-testing, contract-testing) dưới dạng file SKILL.md, và biên soạn kịch bản chi tiết cho Video 3 (Demo thực hành tổng hợp). | [AI Audit Report](link_google_drive_ai_audit_khoanguyen) |

## Tasks Planned for Next Week

- Quay dựng và chỉnh sửa hoàn chỉnh **3 Video chính** (Video 1: Lý thuyết, Video 2: Cài đặt, Video 3: Demo thực hành).
- Hoàn thiện tệp `Activity_Worksheet.md` cho bài thực hành 90 phút trên lớp.
- Thiết kế Mini Exercise.
- Đăng bài Moodle post.
- Review slide và final report.

## Issues

- Không có vấn đề phát sinh trong tuần này.
