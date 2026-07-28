# AI Audit Report — Seminar W08 Contract Testing Materials

## Thông tin sinh viên (Student Information)

| Field                          | Value                                    |
| ------------------------------ | ---------------------------------------- |
| **MSSV (Student ID)**          | 23127065                                 |
| **Họ tên (Full Name)**         | Ngô Nguyễn Thế Khoa                      |
| **Mã bài tập (Assignment)**    | Seminar W08 — Contract Testing Materials |
| **Ngày nộp (Submission Date)** | 2026-07-28                               |

---

## Tuyên bố sử dụng AI (AI Usage Declaration)

> "Tôi sử dụng công cụ AI để soạn thảo nội dung lý thuyết Contract Testing, thiết kế sơ đồ kiến trúc Consumer–Provider và Pact workflow bằng Mermaid, xây dựng deck trình chiếu Slidev, đồng thời nghiên cứu tài liệu hiện hành và biên soạn kịch bản Video 2 hướng dẫn cài đặt môi trường Node.js, Postman, VS Code REST Client, Git và PactFlow Broker."

---

## Tổng quan sử dụng AI (AI Usage Overview)

| #   | AI Tool                                      | Task Category                     | Feature                                | Date       | Bloom-AI Level |
| --- | -------------------------------------------- | --------------------------------- | -------------------------------------- | ---------- | -------------- |
| 1   | Codex GPT 5.6-sol                            | Slide Design & Content Creation   | Contract Testing Slidev Deck           | 2026-07-16 | G9.4 (Create)  |
| 2   | OpenAI Codex v0.145.0 — GPT-5.6-sol (medium) | Documentation & Environment Setup | Video 2 — Hướng dẫn cài đặt môi trường | 2026-07-28 | G9.4 (Create)  |

---

## Chi tiết từng lần sử dụng AI (Detailed AI Interaction Log)

### Entry 1 — Xây dựng deck lý thuyết và kiến trúc Contract Testing bằng Slidev

| Field              | Value                                                                                                                |
| ------------------ | -------------------------------------------------------------------------------------------------------------------- |
| **AI Tool**        | Codex GPT 5.6-sol                                                                                                    |
| **Date/Time**      | 2026-07-16 08:30:47 +07:00                                                                                           |
| **Task**           | Soạn nội dung lý thuyết, thiết kế sơ đồ Consumer–Provider và xây dựng deck Contract Testing bằng Slidev              |
| **Feature**        | Contract Testing Slidev Deck                                                                                         |
| **Bloom-AI Level** | G9.4 (Create) — Tổng hợp kiến thức, thiết kế kiến trúc trực quan và tạo mới một deck trình chiếu kỹ thuật hoàn chỉnh |

#### Prompt

**Prompt người dùng — yêu cầu ban đầu:**

```text
create new slides for:
- Soạn thảo nội dung lý thuyết và sơ đồ kiến trúc Contract Testing (Consumer-Provider) để đưa vào slide.
- Cần xác định phong cách thiết kế (theme), hiệu ứng chuyển slide, màu sắc từ tôi.

use slidev (https://sli.dev) for slide presenting. use mermaid/planutml for diagrams. use context7
```

**Prompt người dùng — lựa chọn thiết kế:**

```text
1. seriph
2. fade and slide mixtures base on the content, may use also view-transition also for better eye-catching.
3. Xanh navy + cyan — công nghệ, dễ đọc
```

**Chi tiết thực thi:**

```text
Skill: slidev
Mode: CREATE

Các bước AI đã thực hiện:
1. Đọc skill Slidev, outline seminar và các tài liệu Contract Testing/Pact có sẵn trong repo.
2. Dùng Context7 tra cứu cú pháp Slidev hiện hành cho theme, transition, View Transitions,
   custom CSS và Mermaid; kiểm tra thêm cấu hình sequence diagram của Mermaid.
3. Thiết kế mạch nội dung từ vấn đề tích hợp, định nghĩa contract, phạm vi kiểm thử,
   kiến trúc Consumer–Provider, consumer test, provider verification đến Pact Broker và CI/CD.
4. Tạo deck Slidev 14 slide với theme Seriph, bảng màu navy–cyan, các hiệu ứng fade,
   slide-left, slide-up, v-click và view-transition theo nội dung.
5. Tạo và cấu hình các sơ đồ Mermaid cho kiến trúc Consumer–Provider, sequence verification
   và vòng đời Pact Broker/deployment gate.
6. Thêm presenter notes, custom CSS, cấu hình Mermaid, package scripts và hướng dẫn chạy deck.
7. Cài dependency, chạy build production và kiểm tra trực quan deck ở tỉ lệ 16:9.
8. Điều chỉnh sơ đồ Broker bị tràn khung và sequence diagram sát mép trong quá trình kiểm tra.
```

#### AI Output

```text
Đã tạo deck Contract Testing gồm 14 slide tại docs/slides, bao phủ:
- Bài toán tương thích giữa Consumer và Provider
- Định nghĩa và phạm vi của Contract Testing
- Kiến trúc Consumer–Provider
- Quy trình Consumer tạo pact và Provider xác minh contract
- Pact Broker, compatibility matrix và can-i-deploy
- Consumer-Driven Contracts, nguyên tắc thiết kế, giới hạn và lộ trình áp dụng

Các file chính được tạo/cập nhật:
- docs/slides/slides.md
- docs/slides/styles/index.css
- docs/slides/setup/mermaid.ts
- docs/slides/package.json
- docs/slides/package-lock.json
- docs/slides/README.md

Kết quả kiểm tra:
- Slidev 52.18.0 với theme Seriph 0.25.0
- Production build hoàn tất thành công
- Sơ đồ Mermaid được kiểm tra trực quan ở tỉ lệ 16:9
- git diff --check không phát hiện lỗi whitespace
```

#### Human Review

| Aspect           | Detail                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------ |
| Reviewed by      | Ngô Nguyễn Thế Khoa                                                                        |
| Review date      | 2026-07-16                                                                                 |
| Corrections made | Có — một số phần slide hiển thị chưa tốt; người review đã chỉnh lại để hiển thị đúng       |
| Quality rating   | Good                                                                                       |
| Issues found     | Một số thành phần trong slide chưa hiển thị tốt ở bản AI tạo ban đầu và cần chỉnh thủ công |

---

### Entry 2 — Biên soạn kịch bản Video 2 hướng dẫn cài đặt môi trường

| Field              | Value                                                                                                                       |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| **AI Tool**        | OpenAI Codex v0.145.0 — GPT-5.6-sol (medium)                                                                                |
| **Date/Time**      | 2026-07-28 19:54:26 +07:00                                                                                                  |
| **Task**           | Viết kịch bản quay chi tiết và xuất tài liệu Markdown/PDF cho video hướng dẫn cài đặt môi trường thực hành                  |
| **Feature**        | Video 2 — Hướng dẫn cài đặt môi trường Node.js, Postman, VS Code REST Client, Git và PactFlow Broker                        |
| **Bloom-AI Level** | G9.4 (Create) — Tổng hợp tài liệu hiện hành, thông tin repo và yêu cầu bảo mật để tạo mới một kịch bản hướng dẫn hoàn chỉnh |

#### Prompt

**Prompt người dùng:**

```text
Viết kịch bản chi tiết **Video 2 (Hướng dẫn cài đặt môi trường)**: liệt kê từng bước cài đặt Node.js, Postman, VS Code REST Client extension, Git clone repo này và cấu hình tài khoản PactFlow Broker. use context7
```

**Chi tiết thực thi:**

```text
Skills: context7-mcp, DocToPdfGenerator
Audit mode: APPEND

Các bước AI đã thực hiện:
1. Đọc hướng dẫn của Context7 và DocToPdfGenerator; rà cấu trúc repo, README,
   src/.env.example, Pact documentation, Git remote và workflow Pact verification.
2. Dùng Context7 tra cứu tài liệu hiện hành cho Node.js, Postman và PactFlow;
   đối chiếu thêm nguồn chính thức về Git và VS Code REST Client.
3. Xây dựng kịch bản 8 cảnh theo luồng Windows, bổ sung callout/lệnh tương đương
   cho macOS và Linux, timeline, lời thoại, thao tác và kết quả mong đợi.
4. Thêm hướng dẫn tạo PactFlow workspace, phân biệt read-only/read-write token,
   cấu hình src/.env, kiểm tra Broker và quy tắc không để lộ secret.
5. Tạo tài liệu Markdown, biên dịch PDF A4 và kiểm tra trực quan các trang PDF.
6. Đồng bộ danh mục video, liên kết kịch bản và sao chép artifact sang thư mục
   docs/reports/week08/evidences/KhoaNgo.
```

#### AI Output

```text
Đã tạo kịch bản Video 2 có thời lượng mục tiêu 14–17 phút, gồm:
- Mục tiêu, chuẩn bị trước khi quay và quy tắc bảo mật token
- Timeline 8 cảnh với lời thoại, thao tác màn hình và kết quả mong đợi
- Hướng dẫn Node.js, Postman, VS Code REST Client và Git cho Windows
- Lệnh/callout thay thế dành cho macOS và Linux
- Quy trình đăng ký, thiết lập workspace và cấu hình PactFlow Broker
- Checklist hoàn thành và hướng dẫn xử lý lỗi thường gặp

Các file chính được tạo/cập nhật:
- docs/demo/videos/video-02-environment-setup-script.md
- docs/demo/videos/video-02-environment-setup-script.pdf
- docs/demo/videos/README.md
- docs/demo/demo-scenarios.md

Artifact minh chứng được sao chép đến:
- docs/reports/week08/evidences/KhoaNgo/video-02-environment-setup-script.md
- docs/reports/week08/evidences/KhoaNgo/video-02-environment-setup-script.pdf

Kết quả kiểm tra:
- PDF A4 gồm 15 trang và trích xuất văn bản thành công
- Kiểm tra trực quan trang đầu và các trang nội dung chính
- Bản sao evidence có SHA-256 trùng khớp với artifact gốc
- git diff --check không phát hiện lỗi whitespace
```

#### Human Review

| Aspect           | Detail              |
| ---------------- | ------------------- |
| Reviewed by      | Ngô Nguyễn Thế Khoa |
| Review date      | 2026-07-28          |
| Corrections made | Không               |
| Quality rating   | Good                |
| Issues found     | None                |

---

## Thống kê tổng hợp (Summary Statistics)

| Metric                      | Value                                                                                                                                                           |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Total AI interactions       | 2                                                                                                                                                               |
| AI tools used               | Codex GPT 5.6-sol; OpenAI Codex v0.145.0 — GPT-5.6-sol (medium)                                                                                                 |
| Features covered            | Contract Testing theory, Consumer–Provider architecture, Pact lifecycle, Pact Broker, CI/CD deployment gate, Video 2 environment setup                          |
| Documents created / updated | docs/slides; docs/demo/videos/video-02-environment-setup-script.md/.pdf; docs/demo/demo-scenarios.md; docs/reports/week08/evidences/KhoaNgo; AI_Audit_Report.md |
| Issues found by audit       | 1 nhóm vấn đề hiển thị slide                                                                                                                                    |
| Issues resolved             | 1/1 — người review đã chỉnh các phần hiển thị chưa tốt                                                                                                          |
| Slides created              | 14                                                                                                                                                              |
| Mermaid diagrams created    | 3                                                                                                                                                               |
| Video scripts created       | 1 kịch bản chi tiết, 8 cảnh                                                                                                                                     |
| Entry 2 evidence artifacts  | 2 — Markdown và PDF 15 trang                                                                                                                                    |
| Build verification          | Passed — `npm run build`                                                                                                                                        |

### AI Contribution Breakdown

| Task                                | AI Contribution | Human Contribution |
| ----------------------------------- | --------------- | ------------------ |
| Theory Research & Synthesis         | 85%             | 15%                |
| Slide Structure & Content Writing   | 90%             | 10%                |
| Visual Theme & Transition Design    | 75%             | 25%                |
| Mermaid Diagram Creation            | 90%             | 10%                |
| Build & Visual Validation           | 80%             | 20%                |
| Review & Display Corrections        | 20%             | 80%                |
| Environment Research & Video Script | 90%             | 10%                |
| Artifact Review & Approval          | 20%             | 80%                |

---

## Compliance Checklist (HW02 §9)

- [x] Tuyên bố sử dụng AI
- [x] Tên công cụ AI sử dụng
- [x] Ngày và giờ của từng tương tác
- [x] Prompt chi tiết của người dùng
- [x] Kết quả phản hồi của AI
- [x] Nhật ký đánh giá của sinh viên (Human Review)
- [x] Định dạng Markdown chuẩn
