# AI Audit Report — Seminar W09 Mini Exercise

## Thông tin sinh viên (Student Information)

| Field                          | Value                                      |
| ------------------------------ | ------------------------------------------ |
| **MSSV (Student ID)**          | 23127065                                   |
| **Họ tên (Full Name)**         | Ngô Nguyễn Thế Khoa                        |
| **Mã bài tập (Assignment)**    | Seminar W09 — Mini Exercise trong 90 phút  |
| **Ngày nộp (Submission Date)** | 2026-07-28                                 |

---

## Tuyên bố sử dụng AI (AI Usage Declaration)

> "Tôi sử dụng công cụ AI để phân tích HW06 và tài nguyên thực hành hiện có trong repository, đối chiếu tài liệu Newman/Pact hiện hành, thiết kế Mini Exercise 90 phút, xây dựng rubric và hướng dẫn cho giảng viên, xuất tài liệu Markdown/PDF, đồng thời kiểm chứng luồng Pact baseline, breaking change và khôi phục provider."

---

## Tổng quan sử dụng AI (AI Usage Overview)

| #   | AI Tool                                      | Task Category                       | Feature                         | Date       | Bloom-AI Level |
| --- | -------------------------------------------- | ----------------------------------- | ------------------------------- | ---------- | -------------- |
| 1   | OpenAI Codex v0.145.0 — GPT-5.6-sol (medium) | Exercise Design & Technical Validation | Mini Exercise API/Contract Testing | 2026-07-28 | G9.4 (Create)  |

---

## Chi tiết từng lần sử dụng AI (Detailed AI Interaction Log)

### Entry 1 — Thiết kế và kiểm chứng Mini Exercise API/Contract Testing trong 90 phút

| Field              | Value                                                                                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| **AI Tool**        | OpenAI Codex v0.145.0 — GPT-5.6-sol (medium)                                                                                 |
| **Date/Time**      | 2026-07-28 20:48:10 +07:00                                                                                                   |
| **Task**           | Rút gọn HW06 thành bài thực hành 90 phút, tạo tài liệu Markdown/PDF và kiểm chứng các lệnh Newman/Pact trên sample repository |
| **Feature**        | Seminar W09 — Mini Exercise: AI-assisted test design, Postman/Newman và Pact breaking change                                |
| **Bloom-AI Level** | G9.4 (Create) — Phân tích nhiều artifact, tổng hợp thành bài tập mới và kiểm chứng thực nghiệm trọn luồng                    |

#### Prompt

**Prompt người dùng:**

```text
thiết kế bài **Mini Exercise** cho buổi thực hành 90 phút tại lớp, lấy cảm hứng từ HW06 nhưng phù hợp với thời gian làm bài tại lớp. use context7
```

**Chi tiết thực thi:**

```text
Skills: context7-mcp, DocToPdfGenerator
Audit mode: GENERATE

Các bước AI đã thực hiện:
1. Đọc HW06, Weekly Report W09, collection/data Postman, Newman runner và Pact sample
   để xác định phạm vi có thể hoàn thành tại lớp.
2. Phát hiện repository không có Login API như mô tả dự kiến trong Weekly Report;
   chuyển phạm vi sang GET /product/:id để dùng được trực tiếp với Product Service hiện có.
3. Dùng Context7 tra cứu Newman về environment, iteration data, folder selection,
   CLI/JSON reporters; tra cứu Pact về consumer contract và provider verification.
4. Thiết kế lịch 90 phút gồm setup, AI-assisted test design, human audit,
   data-driven Postman, Newman report, Pact baseline, breaking change và restore.
5. Soạn rubric 10 điểm, exit ticket, danh sách bài nộp, hướng dẫn điều phối,
   phương án fallback theo checkpoint và đáp án kỳ vọng.
6. Tạo docs/Mini_Exercise.md và biên dịch docs/Mini_Exercise.pdf khổ A4.
7. Cài dependencies, chạy consumer Pact test và provider verification bằng Node.js 20.
8. Tạm đổi response field name thành title, xác nhận Pact fail vì thiếu key name,
   sau đó khôi phục source và xác nhận provider verification pass trở lại.
9. Kiểm tra PDF trực quan, kiểm tra tổng rubric và git diff để bảo đảm không để lại
   breaking change trong provider source.
```

#### AI Output

```text
Đã tạo Mini Exercise 90 phút gồm:
- Mục tiêu học tập và phạm vi GET /product/:id
- Timeline 8 checkpoint, tổng cộng đúng 90 phút
- Phần A: AI đề xuất 6 test case, human audit và tự bổ sung test idea
- Phần B: iteration data, X-Student-Id, Postman assertion và Newman JSON report
- Phần C: sinh Pact, verify baseline, tạo breaking change name -> title và restore
- Exit ticket, danh sách bài nộp, rubric 10 điểm
- Hướng dẫn cho giảng viên/TA, phương án fallback và đáp án kỳ vọng

Artifacts chính:
- docs/Mini_Exercise.md
- docs/Mini_Exercise.pdf

Kết quả kiểm chứng:
- Consumer Pact target GET /product/:id: 2 passed, 8 skipped
- Provider baseline verification: passed
- Breaking change verification: failed đúng kỳ vọng, actual map thiếu key name
- Provider verification sau restore: passed
- PDF: A4, 17 trang, đã kiểm tra trích xuất văn bản và trang đầu
- Source provider đã được khôi phục, không còn diff
```

#### Human Review

| Aspect           | Detail                                                                                                                                                                                                                       |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reviewed by      | Ngô Nguyễn Thế Khoa                                                                                                                                                                                                          |
| Review date      | 2026-07-28                                                                                                                                                                                                                   |
| Corrections made | Có — đổi scope từ Login API sang Product Service; xuất lại PDF bằng renderer hỗ trợ đúng bảng/code block; sửa rubric từ tổng thực tế 9 điểm thành đúng 10 điểm                                                                |
| Quality rating   | Good                                                                                                                                                                                                                         |
| Issues found     | 3 vấn đề, đều đã xử lý: (1) scope Login không có asset chạy được trong repo, (2) bản PDF fallback đầu tiên render bảng/code chưa đúng, (3) rubric ban đầu cộng thành 9 thay vì 10 điểm                                       |

---

## Thống kê tổng hợp (Summary Statistics)

| Metric                         | Value                                                                                                                                                                                                 |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Total AI interactions          | 1                                                                                                                                                                                                     |
| AI tools used                  | OpenAI Codex v0.145.0 — GPT-5.6-sol (medium)                                                                                                                                                          |
| Features covered               | AI-assisted test design, human audit, Postman data-driven testing, Newman CLI/reporting, Pact consumer contract, provider verification, breaking change experiment                                  |
| Documents created / updated    | docs/Mini_Exercise.md; docs/Mini_Exercise.pdf; docs/reports/week09/evidences/KhoaNgo; docs/reports/week09/AI Usage/KhoaNgo/AI_Audit_Report.md                                                       |
| Issues found by audit          | 3                                                                                                                                                                                                     |
| Issues resolved                | 3/3                                                                                                                                                                                                   |
| Exercise duration              | 90 phút, 8 checkpoint                                                                                                                                                                                  |
| Assessment rubric              | 10 điểm                                                                                                                                                                                               |
| Pact verification checkpoints  | 3 — baseline pass, breaking change fail, restored pass                                                                                                                                                |
| Evidence artifacts             | Prompt screenshot, Mini Exercise Markdown/PDF và verification record                                                                                                                                  |

### AI Contribution Breakdown

| Task                                  | AI Contribution | Human Contribution |
| ------------------------------------- | --------------- | ------------------ |
| HW06 & Repository Analysis            | 85%             | 15%                |
| Context7 Documentation Research       | 90%             | 10%                |
| Exercise Structure & Content Drafting | 90%             | 10%                |
| Technical Test Execution              | 90%             | 10%                |
| PDF Generation & Visual Validation    | 85%             | 15%                |
| Human Review & Issue Confirmation     | 20%             | 80%                |

---

## Compliance Checklist (HW02 §9)

- [x] Tuyên bố sử dụng AI
- [x] Tên công cụ AI sử dụng
- [x] Ngày và giờ của từng tương tác
- [x] Prompt chi tiết của người dùng
- [x] Kết quả phản hồi của AI
- [x] Nhật ký đánh giá của sinh viên (Human Review)
- [x] Định dạng Markdown chuẩn

