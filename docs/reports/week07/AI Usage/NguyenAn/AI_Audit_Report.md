# AI Audit Report — Seminar W07: Can-I-Deploy & CI/CD Quality Gate

## Thông tin sinh viên (Student Information)

| Field                          | Value                                                         |
| ------------------------------ | ------------------------------------------------------------- |
| **MSSV (Student ID)**          | 23127148                                                      |
| **Họ tên (Full Name)**         | Ân Tiến Nguyên An                                             |
| **Mã bài tập (Assignment)**    | Seminar W07 — Can-I-Deploy & CI/CD Quality Gate               |
| **Ngày nộp (Submission Date)** | 2026-07-25                                                    |

---

## Tuyên bố sử dụng AI (AI Usage Declaration)

> "Tôi sử dụng công cụ AI để thực hiện các công việc: thêm job `can-i-deploy` vào GitHub Actions workflow và soạn thảo tài liệu hướng dẫn can-i-deploy bao gồm cấu hình GitHub Secrets, mô tả flow CI/CD và ví dụ output."

---

## Tổng quan sử dụng AI (AI Usage Overview)

| #   | AI Tool                      | Task Category              | Feature                              | Date       | Bloom-AI Level |
| --- | ---------------------------- | -------------------------- | ------------------------------------ | ---------- | -------------- |
| 1   | Claude Sonnet 4.6 (Thinking) | CI/CD & Documentation      | Can-I-Deploy Quality Gate            | 2026-07-25 | G9.4 (Create)  |

---

## Chi tiết từng lần sử dụng AI (Entries)

### Entry 1 — Tích hợp can-i-deploy vào CI/CD và viết tài liệu hướng dẫn

| Field              | Value                                                                                                    |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| **AI Tool**        | Claude Sonnet 4.6 (Thinking)                                                                             |
| **Date/Time**      | 2026-07-25 11:15:21 +07:00                                                                               |
| **Task**           | Thêm job `can-i-deploy` vào workflow và tạo tài liệu hướng dẫn chi tiết                                  |
| **Feature**        | Can-I-Deploy Quality Gate — CI/CD Integration                                                            |
| **Bloom-AI Level** | G9.4 (Create) — Tổng hợp kiến thức về Pact CLI, GitHub Actions và tạo nội dung kỹ thuật phức tạp mới   |

#### Prompt

**Prompt người dùng:**

```text
@[pact-verification.yml] @[src] @[docs/reports/week06/AI Usage/NguyenAn]
Đọc mã nguồn và tham khảo evidence W06, tôi cần thực hiện các task W07 sau cho NguyenAn (MSSV 23127148):

Task 1: Tích hợp can-i-deploy vào CI/CD
- Thêm job mới `can-i-deploy` vào file `.github/workflows/pact-verification.yml` (sau job provider-verification).
- Job này phải:
  + Cài đặt Pact CLI standalone.
  + Chạy lệnh `pact-broker can-i-deploy --pacticipant <tên> --version <git-sha> --to-environment production` (hoặc tương đương).
  + Dùng secrets PACT_BROKER_BASE_URL và PACT_BROKER_TOKEN từ GitHub Secrets.
  + Nếu can-i-deploy fail → job fail → PR không merge được (quality gate).
- Thêm comment giải thích trong workflow file.

Task 2: Viết evidence documents
- Tạo file `docs/reports/week07/evidences/NguyenAn/can-i-deploy-guide.md`:
  + Giải thích can-i-deploy là gì và tại sao cần quality gate.
  + Hướng dẫn cấu hình GitHub Secrets cho Pact Broker.
  + Mô tả flow: commit → consumer test → provider verify → can-i-deploy → merge/block.
  + Ví dụ output khi can-i-deploy pass và fail.
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: GENERATE

Các bước AI đã thực hiện:

1. Đọc toàn bộ file `.github/workflows/pact-verification.yml` (90 dòng) để nắm cấu trúc
   job hiện có: consumer-pact → provider-verification.
2. Đọc W06 evidence (AI_Audit_Report.md, pactflow-publish-guide.md) để hiểu chuẩn tài liệu
   và stack kỹ thuật đang dùng (@pact-foundation/pact@13.1.4, pact-cli@16.0.4).
3. Thiết kế job `can-i-deploy` với:
   - `needs: provider-verification` để đảm bảo thứ tự đúng.
   - Install Pact CLI standalone qua curl script (không phụ thuộc Ruby runtime).
   - 2 step riêng biệt cho FrontendWebsite (consumer) và ProductService (provider).
   - Dùng `${{ secrets.PACT_BROKER_BASE_URL }}` và `${{ secrets.PACT_BROKER_TOKEN }}`.
   - Comment tiếng Việt giải thích mục đích quality gate.
4. Viết tài liệu `can-i-deploy-guide.md` gồm 6 phần: định nghĩa, lý do cần quality gate,
   cấu hình GitHub Secrets step-by-step, flow diagram (Mermaid flowchart), ví dụ output
   pass/fail, và troubleshooting table.
5. Chạy DocToPdfGenerator skill để tạo file PDF tương ứng.
6. Tạo file AI_Audit_Report.md tuân thủ chuẩn HW02 §9.
```

#### AI Output

```text
Các kết quả chính được tạo ra:

Tệp cập nhật:
- .github/workflows/pact-verification.yml
  + Thêm job `can-i-deploy` (~48 dòng mới) sau job `provider-verification`.
  + Job có 3 steps: checkout, install Pact CLI standalone, 2 lần can-i-deploy check.
  + Comment block tiếng Việt giải thích mục đích quality gate.

Tệp tạo mới:
- docs/reports/week07/evidences/NguyenAn/can-i-deploy-guide.md
  Tài liệu 6 phần gồm: định nghĩa can-i-deploy, so sánh có/không có quality gate,
  hướng dẫn cấu hình GitHub Secrets (3 bước), Mermaid flowchart toàn bộ CI/CD flow,
  ví dụ output chi tiết cho 3 trường hợp (pass, fail-unverified, fail-broken),
  troubleshooting table 5 lỗi phổ biến.

- docs/reports/week07/evidences/NguyenAn/can-i-deploy-guide.pdf
  (Biên dịch từ file .md qua DocToPdfGenerator skill)

- docs/reports/week07/AI Usage/NguyenAn/AI_Audit_Report.md
  (File này — W07 AI Audit Report)
```

#### Human Review

| Aspect           | Detail            |
| ---------------- | ----------------- |
| Reviewed by      | Ân Tiến Nguyên An |
| Review date      | 2026-07-25        |
| Corrections made | Không             |
| Quality rating   | Excellent         |
| Issues found     | None              |

---

## Thống kê tổng hợp (Summary Statistics)

| Metric                      | Value                                                       |
| --------------------------- | ----------------------------------------------------------- |
| Total AI interactions       | 1                                                           |
| AI tools used               | Claude Sonnet 4.6 (Thinking)                                |
| Features covered            | Can-I-Deploy Quality Gate, CI/CD Integration                |
| Documents created / updated | pact-verification.yml, can-i-deploy-guide.md, can-i-deploy-guide.pdf, AI_Audit_Report.md |
| Issues found by audit       | 0                                                           |
| Issues resolved             | 0 / 0                                                       |
| Workflow jobs added         | 1 (can-i-deploy)                                            |

### AI Contribution Breakdown

| Task                      | AI Contribution | Human Contribution |
| ------------------------- | --------------- | ------------------ |
| Research & Synthesizing   | 85%             | 15%                |
| CI/CD Configuration       | 90%             | 10%                |
| Document Structuring      | 95%             | 5%                 |
| Code Writing (YAML/Mermaid) | 90%           | 10%                |

---

## Compliance Checklist (HW02 §9)

- [x] Tuyên bố sử dụng AI
- [x] Tên công cụ AI sử dụng
- [x] Ngày và giờ của từng tương tác
- [x] Prompt chi tiết của người dùng
- [x] Kết quả phản hồi của AI
- [x] Nhật ký đánh giá của sinh viên (Human Review)
- [x] Định dạng Markdown chuẩn
