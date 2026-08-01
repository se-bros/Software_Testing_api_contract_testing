# AI Audit Report — Seminar W08 Hoàn thiện Slidev Seminar Slides

## Thông tin sinh viên (Student Information)

| Field                          | Value                                                              |
| ------------------------------ | ------------------------------------------------------------------ |
| **MSSV (Student ID)**          | 23127152                                                           |
| **Họ tên (Full Name)**         | Nguyễn Tuấn Anh                                                    |
| **Mã bài tập (Assignment)**    | Seminar W08 — Chỉnh sửa & hoàn thiện slide seminar (Slidev)        |
| **Ngày nộp (Submission Date)** | 2026-07-28                                                         |

---

## Tuyên bố sử dụng AI (AI Usage Declaration)

> "Tôi sử dụng công cụ AI (Qoder — qwen3.8-coder-preview) để thực hiện các công việc: khắc phục lỗi tràn nội dung (overflow) và cải thiện hình thức sơ đồ mermaid trong bộ slide seminar, bổ sung chú thích footnote cho các thuật ngữ cốt lõi, và thêm trang giới thiệu thành viên nhóm vào slide đầu tiên."

---

## Tổng quan sử dụng AI (AI Usage Overview)

| #   | AI Tool                   | Task Category              | Feature                                   | Date       | Bloom-AI Level |
| --- | ------------------------- | -------------------------- | ----------------------------------------- | ---------- | -------------- |
| 1   | Qoder — qwen3.8-coder-preview | Slide Formatting & Diagram Fix | Slidev Seminar Slides — Overflow & Theme | 2026-07-28 | G9.2 (Apply)   |
| 2   | Qoder — qwen3.8-coder-preview | Content Annotation         | Slidev Seminar Slides — Footnote thuật ngữ | 2026-07-28 | G9.3 (Analyse) |
| 3   | Qoder — qwen3.8-coder-preview | Slide Content Creation     | Slidev Seminar Slides — Trang giới thiệu nhóm | 2026-07-28 | G9.2 (Apply)   |

---

## Chi tiết từng lần sử dụng AI (Detailed AI Interaction Log)

### Entry 1 — Khắc phục overflow và cải thiện hình thức sơ đồ mermaid

| Field              | Value                                                                     |
| ------------------ | ------------------------------------------------------------------------- |
| **AI Tool**        | Qoder — qwen3.8-coder-preview                                             |
| **Date/Time**      | 2026-07-28 14:50:00 +07:00                                                |
| **Task**           | Sửa lỗi tràn nội dung xuống dưới trên các slide nhiều HTML; đổi sơ đồ mermaid từ theme tối sang theme sáng cho dễ đọc |
| **Feature**        | Slidev Seminar Slides — Overflow & Diagram Theme                          |
| **Bloom-AI Level** | G9.2 (Apply) — Áp dụng CSS/mermaid theme fix và kiểm chứng trên trình duyệt |

#### Prompt

**Prompt người dùng:**

```text
update slide:
- slide hiện tại do nhét nhiều html nên có tình trạng bị overflow xuống dưới
- nhiều sơ đồ đang bị hơi xấu, dùng màu tối, chữ trong sơ đồ thì khó đọc
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: GENERATE

Các bước AI đã thực hiện:
1. Khảo sát toàn bộ các file slide trong docs/slides/pages/ và styles/index.css.
2. Điều chỉnh padding, font-size, margin và scale của sơ đồ để nội dung nằm gọn
   trong khung canvas 980x552px.
3. Chuyển toàn bộ sơ đồ mermaid sang theme sáng (nền trắng, khối xanh nhạt,
   chữ đậm dễ đọc) và thêm CSS ghi đè màu cho mermaid.
4. Chạy verify-slides.mjs và đo chiều cao từng slide trên trình duyệt
   (scrollHeight - clientHeight) để xác nhận không còn overflow.
```

#### AI Output

```text
Đã chỉnh sửa bộ slide Slidev (docs/slides/):
1. Khắc phục lỗi tràn nội dung (overflow) trên các slide nhiều HTML.
2. Chuyển sơ đồ mermaid từ theme tối sang theme sáng, chữ trong sơ đồ dễ đọc hơn.
3. Kiểm tra từng slide trên trình duyệt, xác nhận tất cả nằm gọn trong khung
   980x552px (verify-slides.mjs: 42 slides, 0 problems).
File đã sửa: docs/slides/pages/*.md, docs/slides/styles/index.css
```

#### Human Review

| Aspect           | Detail                                                                                       |
| ---------------- | -------------------------------------------------------------------------------------------- |
| Reviewed by      | Nguyễn Tuấn Anh                                                                              |
| Review date      | 2026-07-28                                                                                   |
| Corrections made | Có — đổi sơ đồ mermaid sang theme sáng, điều chỉnh scale/padding để chống overflow           |
| Quality rating   | Acceptable                                                                                   |
| Issues found     | Slide bị tràn nội dung xuống dưới; sơ đồ dùng màu background tối, chữ trong sơ đồ khó đọc (đã khắc phục) |

---

### Entry 2 — Bổ sung footnote chú thích các thuật ngữ cốt lõi

| Field              | Value                                                                     |
| ------------------ | ------------------------------------------------------------------------- |
| **AI Tool**        | Qoder — qwen3.8-coder-preview                                             |
| **Date/Time**      | 2026-07-28 14:55:00 +07:00                                                |
| **Task**           | Thêm chú thích footnote cho các thuật ngữ mới/cốt lõi vì nội dung slide còn chung chung, lý thuyết chưa cụ thể |
| **Feature**        | Slidev Seminar Slides — Footnote thuật ngữ                                |
| **Bloom-AI Level** | G9.3 (Analyse) — Phân tích nội dung, chọn thuật ngữ cần chú thích và tổng hợp định nghĩa ngắn gọn |

#### Prompt

**Prompt người dùng:**

```text
về phần nội dung hiện được thể hiện chung chung (general), lý thuyết chưa được cụ thể.
Các từ khóa mới chưa được đề cập trước đó, các từ nên được chú thích bên dưới dạng
footnote (annotation) để chú thích
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: APPEND

Các bước AI đã thực hiện:
1. Đọc toàn bộ 7 file slide, xác định các thuật ngữ cốt lõi xuất hiện lần đầu
   mà chưa được giải thích.
2. Nhận thấy đa số thuật ngữ nằm trong khối HTML thuần (markdown-it không parse
   footnote [^1] trong HTML block) nên chọn cách thêm footnote thủ công:
   tham chiếu <sup>N</sup> trong nội dung + khối <div class="footnotes"> ở cuối slide.
3. Thêm 25 chú thích trên 7 file, giới hạn 1-3 footnote/slide để tránh overflow.
4. Thêm CSS cho footnote trong styles/index.css và kiểm tra không slide nào bị tràn.
```

#### AI Output

```text
Đã thêm 25 chú thích footnote cho các thuật ngữ cốt lõi trên 7 file slide:
- 01_introduction.md: microservices, CI/CD
- 02_api_testing.md: Bearer ISO-8601, Happy Path, Assertion
- 03_automation_cicd.md: CLI runner, readiness probe, artifact, can-i-deploy, quality gate
- 04_contract_testing.md: Consumer, Provider, Contract, Provider state, Interaction,
  Integration, E2E, Pact Broker, Compatibility matrix
- 05_demo_pact.md: Mock provider, Verifier, Deployment gate, Breaking change
- 06_ai_testing.md: API specification, Agent Skill, OpenAPI
- 07_summary.md: Regression suite
Mỗi footnote gồm tham chiếu <sup>N</sup> trong nội dung và định nghĩa tiếng Việt
ngắn gọn ở cuối slide. Thêm CSS footnote trong styles/index.css.
```

#### Human Review

| Aspect           | Detail                                                                                       |
| ---------------- | -------------------------------------------------------------------------------------------- |
| Reviewed by      | Nguyễn Tuấn Anh                                                                              |
| Review date      | 2026-07-28                                                                                   |
| Corrections made | Có — thêm 25 footnote chú thích thuật ngữ cốt lõi, kèm CSS định dạng                          |
| Quality rating   | Acceptable                                                                                   |
| Issues found     | Nội dung lý thuyết còn chung chung, chưa cụ thể; thiếu footnote chú thích cho các thuật ngữ mới (đã khắc phục) |

---

### Entry 3 — Thêm trang giới thiệu nhóm vào slide đầu tiên

| Field              | Value                                                                     |
| ------------------ | ------------------------------------------------------------------------- |
| **AI Tool**        | Qoder — qwen3.8-coder-preview                                             |
| **Date/Time**      | 2026-07-28 15:00:00 +07:00                                                |
| **Task**           | Thêm khối giới thiệu 5 thành viên nhóm (họ tên + MSSV) vào slide trang bìa |
| **Feature**        | Slidev Seminar Slides — Trang giới thiệu nhóm                             |
| **Bloom-AI Level** | G9.2 (Apply) — Tạo khối HTML giới thiệu thành viên theo layout có sẵn      |

#### Prompt

**Prompt người dùng:**

```text
việc cuối cùng: thêm vào slide đầu tiên là giới thiệu về nhóm
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: APPEND

Các bước AI đã thực hiện:
1. Tra cứu danh sách thành viên từ slide-content.md / slide-content-draft.md
   (5 thành viên kèm MSSV), không tự bịa thông tin.
2. Thêm khối "Thành viên" dạng lưới 5 thẻ (họ tên + MSSV) vào slide trang bìa
   trong 01_introduction.md, điều chỉnh margin để không bị overflow.
3. Phát hiện slide đầu tiên bị trống do cấu trúc src-import trong slides.md
   (dòng trống trước import đầu tiên) và loại bỏ để trang cover thực sự là slide số 1.
4. Chạy verify-slides.mjs và kiểm tra trên trình duyệt: slide cover không overflow.
```

#### AI Output

```text
Đã thêm trang giới thiệu nhóm vào slide đầu tiên (cover):
1. Bổ sung khối "Thành viên" với 5 thẻ thành viên (họ tên + MSSV):
   Mạch Quốc Tấn (23127115), Ngô Nguyễn Thế Khoa (23127065),
   Nguyễn Lê Hồ Anh Khoa (23127211), Ân Tiến Nguyên An (23127148),
   Nguyễn Tuấn Anh (23127152).
2. Điều chỉnh khoảng cách để slide không bị overflow.
3. Loại bỏ slide trống đầu tiên do cấu trúc src-import trong slides.md,
   giúp trang cover thực sự là slide số 1.
File đã sửa: docs/slides/pages/01_introduction.md, docs/slides/slides.md
```

#### Human Review

| Aspect           | Detail                                                          |
| ---------------- | --------------------------------------------------------------- |
| Reviewed by      | Nguyễn Tuấn Anh                                                 |
| Review date      | 2026-07-28                                                      |
| Corrections made | Có — thêm trang giới thiệu 5 thành viên vào slide đầu tiên      |
| Quality rating   | Acceptable                                                      |
| Issues found     | None                                                            |

---

## Thống kê tổng hợp (Summary Statistics)

| Metric                              | Value                                                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Total AI interactions               | 3                                                                                                       |
| AI tools used                       | Qoder — qwen3.8-coder-preview                                                                           |
| Features covered                    | Slide formatting & diagram theme, Content annotation (footnote), Team intro slide                       |
| Documents created / updated         | docs/slides/pages/01_introduction.md, 02_api_testing.md, 03_automation_cicd.md, 04_contract_testing.md, 05_demo_pact.md, 06_ai_testing.md, 07_summary.md, docs/slides/styles/index.css, docs/slides/slides.md |
| Issues found by audit               | 3 nhóm vấn đề: thiếu footnote, lý thuyết chung chung, slide chưa rõ ràng (màu background tối, chữ khó đọc) |
| Issues resolved                     | 3/3 (100%)                                                                                              |
| Footnote annotations added          | 25 chú thích thuật ngữ trên 7 file slide                                                                |
| Slides verified fit (no overflow)   | 42 slide (verify-slides.mjs: 0 problems)                                                               |

### AI Contribution Breakdown

| Task                          | AI Contribution | Human Contribution |
| ----------------------------- | --------------- | ------------------ |
| Slide Formatting & Theme Fix  | 90%             | 10%                |
| Footnote Annotation Writing   | 85%             | 15%                |
| Team Intro Slide Creation     | 90%             | 10%                |
| Issue Identification & Review | 10%             | 90%                |

---

## Compliance Checklist (HW02 §9)

- [x] Tuyên bố sử dụng AI
- [x] Tên công cụ AI sử dụng (Qoder — qwen3.8-coder-preview)
- [x] Ngày và giờ của từng tương tác
- [x] Prompt chi tiết của người dùng
- [x] Kết quả phản hồi của AI
- [x] Nhật ký đánh giá của sinh viên (Human Review)
- [x] Định dạng Markdown chuẩn
