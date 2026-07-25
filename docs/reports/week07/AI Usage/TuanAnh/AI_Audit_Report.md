# AI Audit Report — Seminar W07 Postbot Evaluation & Prompt Guide

## Thông tin sinh viên (Student Information)

| Field                          | Value                                                                 |
| ------------------------------ | --------------------------------------------------------------------- |
| **MSSV (Student ID)**          | 23127152                                                              |
| **Họ tên (Full Name)**         | Nguyễn Tuấn Anh                                                       |
| **Mã bài tập (Assignment)**    | Seminar W07 — Đánh giá Postman Postbot & Standalone Prompt Guide      |
| **Ngày nộp (Submission Date)** | 2026-07-25                                                            |

---

## Tuyên bố sử dụng AI (AI Usage Declaration)

> "Tôi sử dụng công cụ AI (Cursor — Grok 4.5 high fast) để thực hiện các công việc: phân tích phạm vi task W07, soạn khung và hoàn thiện tài liệu đánh giá Postbot, tạo Postman collection thử nghiệm, biên soạn Prompt Guide kèm ví dụ chạy thử, đối chiếu evidence và cập nhật báo cáo nhóm."

---

## Tổng quan sử dụng AI (AI Usage Overview)

| #   | AI Tool                    | Task Category                 | Feature                                      | Date       | Bloom-AI Level |
| --- | -------------------------- | ----------------------------- | -------------------------------------------- | ---------- | -------------- |
| 1   | Cursor — Grok 4.5 high fast | Scope Analysis                | W07 task scope — Nguyễn Tuấn Anh             | 2026-07-25 | G9.3 (Analyse) |
| 2   | Cursor — Grok 4.5 high fast | Document Scaffolding          | postbot-evaluation.md & prompt-guide.md khung | 2026-07-25 | G9.2 (Apply)   |
| 3   | Cursor — Grok 4.5 high fast | Test Asset Creation           | Postman collection folder testing            | 2026-07-25 | G9.2 (Apply)   |
| 4   | Cursor — Grok 4.5 high fast | Evidence Analysis & Writing   | Hoàn thiện postbot-evaluation từ r1–r9       | 2026-07-25 | G9.3 (Analyse) |
| 5   | Cursor — Grok 4.5 high fast | Document Consistency          | Đổi tên evidence r1–r9 trong evaluation      | 2026-07-25 | G9.2 (Apply)   |
| 6   | Cursor — Grok 4.5 high fast | Prompt Engineering            | Prompt ChatGPT mục 4 cho request 02 & 04     | 2026-07-25 | G9.2 (Apply)   |
| 7   | Cursor — Grok 4.5 high fast | Document Completion           | Hoàn thiện prompt-guide.md & chốt Evidence   | 2026-07-25 | G9.4 (Create)  |
| 8   | Cursor — Grok 4.5 high fast | Critical Review & Sync        | Rà soát / cập nhật postbot-evaluation.md     | 2026-07-25 | G9.3 (Analyse) |

---

## Chi tiết từng lần sử dụng AI (Detailed AI Interaction Log)

### Entry 1 — Phân tích phạm vi task W07

| Field              | Value                                                                 |
| ------------------ | --------------------------------------------------------------------- |
| **AI Tool**        | Cursor — Grok 4.5 high fast                                           |
| **Date/Time**      | 2026-07-25 19:33:00 +07:00                                            |
| **Task**           | Phân tích task của 23127152 trong tuần 7, xác định phạm vi và công việc cần làm |
| **Feature**        | Seminar W07 — Task scoping (Postbot evaluation & Prompt Guide)        |
| **Bloom-AI Level** | G9.3 (Analyse) — Phân tích báo cáo nhóm và xác định deliverable       |

#### Prompt

**Prompt người dùng:**

```text
@docs/reports/week07/Group3.md phân tích task của ### 23127152 – Nguyễn Tuấn Anh trong tuần 7, xác định phạm vi và công việc cần làm
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: GENERATE

Các bước AI đã thực hiện:

1. Đọc Group3.md tuần 07 và ngữ cảnh W06/W08 liên quan.
2. Xác định 2 deliverable: đánh giá Postbot + Standalone Prompt Guide.
3. Liệt kê checklist công việc, evidence path, và phạm vi ngoài W07.
```

#### AI Output

```text
Báo cáo phạm vi: 2 task chính (Postbot evaluation, Prompt Guide), checklist nộp W07,
gợi ý đường dẫn evidences/TuanAnh, lưu ý không trùng khảo sát AI tools W04.
```

#### Human Review

| Aspect           | Detail                |
| ---------------- | --------------------- |
| Reviewed by      | Nguyễn Tuấn Anh       |
| Review date      | 2026-07-25            |
| Corrections made | Không                 |
| Quality rating   | Acceptable            |
| Issues found     | None                  |

---

### Entry 2 — Soạn khung postbot-evaluation.md và prompt-guide.md

| Field              | Value                                                      |
| ------------------ | ---------------------------------------------------------- |
| **AI Tool**        | Cursor — Grok 4.5 high fast                                |
| **Date/Time**      | 2026-07-25 19:36:00 +07:00                                 |
| **Task**           | Tạo khung hai tài liệu deliverable W07                     |
| **Feature**        | evidences/TuanAnh — document templates                     |
| **Bloom-AI Level** | G9.2 (Apply) — Áp dụng cấu trúc tài liệu nhóm và Seminar Scope |

#### Prompt

**Prompt người dùng:**

```text
soạn khung hai file postbot-evaluation.md và prompt-guide.md
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: GENERATE

Các bước AI đã thực hiện:

1. Tham chiếu style evidence (can-i-deploy-guide, smoke-test-auth) và E2.2 Seminar Scope.
2. Tạo postbot-evaluation.md với mục tiêu, quy trình Postbot, bảng kết quả, kết luận.
3. Tạo prompt-guide.md với template mục 3–7 (test case, pm.test, data-driven, Pact, review).
```

#### AI Output

```text
Đã tạo:
- docs/reports/week07/evidences/TuanAnh/postbot-evaluation.md (khung)
- docs/reports/week07/evidences/TuanAnh/prompt-guide.md (khung + placeholder)
```

#### Human Review

| Aspect           | Detail                |
| ---------------- | --------------------- |
| Reviewed by      | Nguyễn Tuấn Anh       |
| Review date      | 2026-07-25            |
| Corrections made | Không                 |
| Quality rating   | Acceptable            |
| Issues found     | None                  |

---

### Entry 3 — Tạo Postman collection folder testing

| Field              | Value                                                         |
| ------------------ | ------------------------------------------------------------- |
| **AI Tool**        | Cursor — Grok 4.5 high fast                                   |
| **Date/Time**      | 2026-07-25 19:42:00 +07:00                                    |
| **Task**           | File import Postman: folder testing + cấu hình API smoke W06  |
| **Feature**        | w07-postbot-testing.postman_collection.json                   |
| **Bloom-AI Level** | G9.2 (Apply) — Cấu hình request/auth theo README sample API   |

#### Prompt

**Prompt người dùng:**

```text
cho tôi file để import vào postman tạo folder "testing" và configure các api để test như đã chuẩn bị
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: GENERATE

Các bước AI đã thực hiện:

1. Đọc README sample API và collection product-service hiện có.
2. Tạo collection 9 request (01–09) khớp smoke W06, Pre-request sinh Bearer.
3. Để tab Tests trống/TODO phục vụ Postbot; cập nhật dòng Collection trong postbot-evaluation.md.
```

#### AI Output

```text
Đã tạo docs/reports/week07/evidences/TuanAnh/w07-postbot-testing.postman_collection.json
(folder testing, 9 request auth/CRUD, biến baseUrl/authToken/createdProductId).
```

#### Human Review

| Aspect           | Detail                |
| ---------------- | --------------------- |
| Reviewed by      | Nguyễn Tuấn Anh       |
| Review date      | 2026-07-25            |
| Corrections made | Không — đã import và chạy thử với Postbot |
| Quality rating   | Acceptable            |
| Issues found     | None                  |

---

### Entry 4 — Phân tích 9 evidence Postbot và hoàn thiện postbot-evaluation.md

| Field              | Value                                                              |
| ------------------ | ------------------------------------------------------------------ |
| **AI Tool**        | Cursor — Grok 4.5 high fast                                        |
| **Date/Time**      | 2026-07-25 20:13:00 +07:00                                         |
| **Task**           | Review script/kết quả Postbot r1–r9 và viết đầy đủ báo cáo đánh giá |
| **Feature**        | postbot-evaluation.md (bản hoàn thiện)                             |
| **Bloom-AI Level** | G9.3 (Analyse) — Phân tích PASS/FAIL, root cause, khuyến nghị      |

#### Prompt

**Prompt người dùng:**

```text
đây là 9 ảnh kết quả AI sinh test và kết quả test (r1-r9), phân tích và hoàn thành postbot-evaluation nhé
```

*(Kèm 9 ảnh screenshot Postman Postbot + Test Results cho request 01–09.)*

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: GENERATE

Các bước AI đã thực hiện:

1. Đọc/phân tích 9 screenshot (số pm.test, Pass/Fail, script ý chính).
2. Xác định 08 FAIL do state createdProductId; 02 rủi ro assert version mọi phần tử.
3. Viết đầy đủ mục 2–9 postbot-evaluation.md; copy evidence vào evidences/TuanAnh; cập nhật Group3.md.
```

#### AI Output

```text
Hoàn thiện postbot-evaluation.md: bảng 8/9 PASS, chi tiết từng request, ưu/nhược,
so sánh Postbot vs viết tay/ChatGPT, kết luận & khuyến nghị.
Evidence ảnh: r1.png … r9.png (sau khi user đổi tên file).
```

#### Human Review

| Aspect           | Detail                |
| ---------------- | --------------------- |
| Reviewed by      | Nguyễn Tuấn Anh       |
| Review date      | 2026-07-25            |
| Corrections made | Có — đổi tên file evidence sang r1–r9 (Entry 5) |
| Quality rating   | Acceptable            |
| Issues found     | None                  |

---

### Entry 5 — Đồng bộ tên file evidence r1–r9 trong báo cáo

| Field              | Value                                                |
| ------------------ | ---------------------------------------------------- |
| **AI Tool**        | Cursor — Grok 4.5 high fast                          |
| **Date/Time**      | 2026-07-25 20:18:00 +07:00                           |
| **Task**           | Cập nhật tên ảnh evidence trong postbot-evaluation.md |
| **Feature**        | postbot-evaluation.md / Group3.md                    |
| **Bloom-AI Level** | G9.2 (Apply) — Đồng bộ đường dẫn minh chứng          |

#### Prompt

**Prompt người dùng:**

```text
update @docs/reports/week07/evidences/TuanAnh/postbot-evaluation.md thay các name ảnh evidence bằng r1-r9 như đã thay trong folder
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: GENERATE

Các bước AI đã thực hiện:

1. Thay mọi tham chiếu postbot-0x-*.png → r1.png … r9.png trong evaluation.
2. Cập nhật dòng Evidence trong Group3.md.
```

#### AI Output

```text
postbot-evaluation.md và Group3.md đã trỏ đúng r1.png … r9.png.
```

#### Human Review

| Aspect           | Detail                |
| ---------------- | --------------------- |
| Reviewed by      | Nguyễn Tuấn Anh       |
| Review date      | 2026-07-25            |
| Corrections made | Không                 |
| Quality rating   | Acceptable            |
| Issues found     | None                  |

---

### Entry 6 — Soạn prompt ChatGPT (mục 4) cho request 02 và 04

| Field              | Value                                                           |
| ------------------ | --------------------------------------------------------------- |
| **AI Tool**        | Cursor — Grok 4.5 high fast                                     |
| **Date/Time**      | 2026-07-25 20:25:00 +07:00                                      |
| **Task**           | Điền placeholder Prompt Guide thành prompt sẵn gửi ChatGPT      |
| **Feature**        | Prompt Guide — mục 4 (sinh pm.test từ request/response thật)    |
| **Bloom-AI Level** | G9.2 (Apply) — Áp dụng template prompt với dữ liệu API thật     |

#### Prompt

**Prompt người dùng:**

```text
với request 2:
- method: get
- url:  http://localhost:8080/products
- response:
[
    {
        "id": "09",
        "type": "CREDIT_CARD",
        "name": "Gem Visa",
        "version": "v1"
    },
    {
        "id": "10",
        "type": "CREDIT_CARD",
        "name": "28 Degrees",
        "version": "v1"
    },
    {
        "id": "11",
        "type": "PERSONAL_LOAN",
        "name": "MyFlexiPay",
        "version": "v2"
    }
]

request 4:
- method: post
- url:  http://localhost:8080/products
- headers: content-type: application/json
- request body:
{
  "type": "CREDIT_CARD",
  "name": "Postbot Test Card",
  "version": "v1"
}
- response:
{
    "id": "13",
    "type": "CREDIT_CARD",
    "name": "Postbot Test Card",
    "version": "v1"
}

gửi cho tôi đúng prompt cần thực hiện
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: GENERATE

Các bước AI đã thực hiện:

1. Lấy template mục 4 trong prompt-guide.md.
2. Điền METHOD/URL/HEADERS/BODY/RESPONSE cho request 02 và 04.
3. Thêm ràng buộc hợp đồng (version seed; lưu createdProductId không hard-code id).
```

#### AI Output

```text
Hai khối prompt sẵn copy-paste (Prompt A GET /products, Prompt B POST /products)
để gửi ChatGPT; user đã chạy và lưu evidence r2_chatgpt.png, r4_chatgpt.png.
```

#### Human Review

| Aspect           | Detail                |
| ---------------- | --------------------- |
| Reviewed by      | Nguyễn Tuấn Anh       |
| Review date      | 2026-07-25            |
| Corrections made | Không — đã dùng prompt để sinh script và verify trên Postman |
| Quality rating   | Acceptable            |
| Issues found     | None                  |

---

### Entry 7 — Hoàn thiện prompt-guide.md và chốt Evidence

| Field              | Value                                                              |
| ------------------ | ------------------------------------------------------------------ |
| **AI Tool**        | Cursor — Grok 4.5 high fast                                        |
| **Date/Time**      | 2026-07-25 20:35:00 +07:00                                         |
| **Task**           | Điền mục 10–11 Prompt Guide từ evidence ChatGPT + review; cập nhật Group3 |
| **Feature**        | prompt-guide.md (v1.0) + Group3 Evidence                           |
| **Bloom-AI Level** | G9.4 (Create) — Tổng hợp ví dụ chạy thử, đối chiếu Postbot, chốt deliverable |

#### Prompt

**Prompt người dùng:**

```text
ok, đã hoàn thành với r2_chatgpt.png (@docs/reports/week07/evidences/TuanAnh/r2_chatgpt.png) là ảnh test postman với script chatgpt sinh ra theo prompt, và tương tự là r4_chatgpt.png @docs/reports/week07/evidences/TuanAnh/r4_chatgpt.png  và @docs/reports/week07/evidences/TuanAnh/r2_chatgpt_ai_review.md là kết quả review của AI (mục 7) cho request 2. bây giờ hãy hoàn thiện report và chốt evidence cho task này (AI audit sau)
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: GENERATE

Các bước AI đã thực hiện:

1. Đọc r2_chatgpt.png, r4_chatgpt.png, r2_chatgpt_ai_review.md.
2. Điền prompt-guide.md §10.1–10.4, §11 đối chiếu Postbot; checklist §9.
3. Cập nhật Evidence trong Group3.md (Postbot + Prompt Guide + collection; AI Audit để sau).
```

#### AI Output

```text
prompt-guide.md v1.0 hoàn thiện với ví dụ 02/04, tóm tắt review mục 7,
bảng so sánh Postbot vs ChatGPT; Group3.md chốt link evidence.
```

#### Human Review

| Aspect           | Detail                |
| ---------------- | --------------------- |
| Reviewed by      | Nguyễn Tuấn Anh       |
| Review date      | 2026-07-25            |
| Corrections made | Không                 |
| Quality rating   | Acceptable            |
| Issues found     | None                  |

---

### Entry 8 — Rà soát và cập nhật postbot-evaluation.md sau Prompt Guide

| Field              | Value                                                         |
| ------------------ | ------------------------------------------------------------- |
| **AI Tool**        | Cursor — Grok 4.5 high fast                                   |
| **Date/Time**      | 2026-07-25 20:38:00 +07:00                                    |
| **Task**           | Đồng bộ báo cáo Postbot với kết quả đối chiếu ChatGPT cùng ngày |
| **Feature**        | postbot-evaluation.md §4.2, §4.4, §7, §8, §10                 |
| **Bloom-AI Level** | G9.3 (Analyse) — Kiểm tra tính nhất quán evidence và kết luận |

#### Prompt

**Prompt người dùng:**

```text
bây giờ hãy rà soát lại @docs/reports/week07/evidences/TuanAnh/postbot-evaluation.md xem có cần update gì để phản ánh đúng không ?
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: GENERATE

Các bước AI đã thực hiện:

1. Đối chiếu postbot-evaluation với prompt-guide và file evidence hiện có.
2. Cập nhật §4.2/§4.4 (Postbot gốc vs bản ChatGPT), §7 thực nghiệm, checklist §8.
3. Thêm §10 bảng đối chiếu r2/r4 Postbot vs ChatGPT; chỉnh kết luận ngắn.
```

#### AI Output

```text
postbot-evaluation.md cập nhật: không ghi đè r2.png/r4.png Postbot;
ghi nhận xử lý version qua Prompt Guide; thêm mục 10 đối chiếu thực nghiệm.
```

#### Human Review

| Aspect           | Detail                |
| ---------------- | --------------------- |
| Reviewed by      | Nguyễn Tuấn Anh       |
| Review date      | 2026-07-25            |
| Corrections made | Không                 |
| Quality rating   | Acceptable            |
| Issues found     | None                  |

---

## Thống kê tổng hợp (Summary Statistics)

| Metric                                      | Value                                                                 |
| ------------------------------------------- | --------------------------------------------------------------------- |
| Total AI interactions                       | 8                                                                     |
| AI tools used                               | Cursor — Grok 4.5 high fast                                           |
| Features covered                            | Task scope, Postbot evaluation, Postman collection, Prompt Guide, Evidence sync |
| Documents created / updated                 | postbot-evaluation.md, prompt-guide.md, w07-postbot-testing.postman_collection.json, Group3.md, AI_Audit_Report.md |
| Issues found by audit                       | 0                                                                     |
| Issues resolved                             | 0 / 0                                                                 |
| Postbot evidence screenshots                | 9 (r1.png … r9.png)                                                   |
| ChatGPT verification evidences (user-run)   | r2_chatgpt.png, r4_chatgpt.png, r2_chatgpt_ai_review.md               |

---

### AI Contribution Breakdown

| Task                         | AI Contribution | Human Contribution |
| ---------------------------- | --------------- | ------------------ |
| Scope analysis & planning    | 70%             | 30%                |
| Document structuring         | 75%             | 25%                |
| Postman collection setup     | 80%             | 20%                |
| Postbot experiment (Send + UI) | 10%           | 90%                |
| Evaluation writing from evidence | 65%         | 35%                |
| ChatGPT prompt drafting      | 70%             | 30%                |
| ChatGPT run + Postman verify | 5%              | 95%                |
| Prompt Guide completion      | 70%             | 30%                |
| Cross-check / consistency    | 60%             | 40%                |

---

## Compliance Checklist (HW02 §9)

- [x] Tuyên bố sử dụng AI
- [x] Tên công cụ AI sử dụng
- [x] Ngày và giờ của từng tương tác
- [x] Prompt chi tiết của người dùng
- [x] Kết quả phản hồi của AI
- [x] Nhật ký đánh giá của sinh viên (Human Review)
- [x] Định dạng Markdown chuẩn
