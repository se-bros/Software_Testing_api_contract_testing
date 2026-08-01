# AI Audit Report — Prompt Guide & Agent Skill cho Postman/Contract Testing

## Thông tin sinh viên (Student Information)

| Field                          | Value                                                              |
| ------------------------------ | ------------------------------------------------------------------ |
| **MSSV (Student ID)**          | 23127115                                                           |
| **Họ tên (Full Name)**         | Mạch Quốc Tấn                                                      |
| **Mã bài tập (Assignment)**    | Seminar W08 — Prompt Guide & Agent Skill: Postman/Contract Testing |
| **Ngày nộp (Submission Date)** | 2026-08-01                                                         |

---

## Tuyên bố sử dụng AI (AI Usage Declaration)

> "Tôi sử dụng công cụ AI để thực hiện các công việc: xây dựng Prompt Guide sinh Postman/contract test dùng trên web, xây dựng Agent Skill tương ứng dùng cho coding agent, tự phản biện/audit độ đầy đủ của nội dung đã tạo so với danh mục loại test mong muốn, và cập nhật lại nội dung theo kết quả audit."

---

## Tổng quan sử dụng AI (AI Usage Overview)

| #   | AI Tool         | Task Category     | Feature                                                      | Date       | Bloom-AI Level |
| --- | --------------- | ----------------- | ------------------------------------------------------------ | ---------- | -------------- |
| 1   | Claude Sonnet 5 | Content Creation  | Prompt Guide + Agent Skill (Postman/Contract)                | 2026-08-01 | G9.4 (Create)  |
| 2   | Claude Sonnet 5 | Review & Critique | Audit độ đầy đủ loại test (Postman + Pact)                   | 2026-08-01 | G9.3 (Analyse) |
| 3   | Claude Sonnet 5 | Content Update    | Cập nhật Prompt Guide/Skill theo audit + tạo AI Audit Report | 2026-08-01 | G9.4 (Create)  |

---

## Chi tiết từng lần sử dụng AI (Detailed AI Interaction Log)

### Entry 1 — Tạo mới Prompt Guide (web) và Agent Skill (coding agent) cho Postman & Contract Testing

| Field              | Value                                                                                                                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **AI Tool**        | Claude Sonnet 5                                                                                                                                                                                                    |
| **Date/Time**      | 2026-08-01 08:14 +07:00                                                                                                                                                                                            |
| **Task**           | Xây dựng bộ tài liệu hướng dẫn viết prompt để sinh Postman test script và contract test, gồm 1 file Markdown dùng trực tiếp trên web ChatGPT/Claude và 1 agent skill (SKILL.md + references) dùng cho coding agent |
| **Feature**        | Prompt Guide & Agent Skill cho Postman/Contract Testing                                                                                                                                                            |
| **Bloom-AI Level** | G9.4 (Create) — tổng hợp kiến thức về Postman test script, JSON Schema contract test, cấu trúc Postman Collection thành 2 tài liệu mới hoàn chỉnh                                                                  |

#### Prompt

**Prompt người dùng:**

```text
Xây dựng Prompt Guide standalone cho ChatGPT/Claude giúp sinh test script Postman và contract test, 1 file md cho phiên bản prompt trên web và một agent skill khi sử dụng agent coding
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report (ghi lại retroactive)
Mode: GENERATE

Các bước AI đã thực hiện:

1. Đọc SKILL.md của skill-creator để lấy đúng chuẩn cấu trúc agent skill (frontmatter,
   references/, progressive disclosure).
2. Soạn file postman-contract-test-prompt-guide.md gồm: nguyên tắc viết prompt, checklist
   chuẩn bị thông tin, 6 prompt template (test script đơn lẻ, sinh collection từ OpenAPI,
   contract test JSON Schema, consumer-driven contract dạng so sánh thủ công, negative/edge
   case, review-refactor), mẹo nâng cao, bảng lỗi thường gặp.
3. Soạn agent skill postman-contract-test-generator/ gồm SKILL.md (quy trình 6 bước:
   thu thập nguồn -> phân loại loại test -> sinh script -> lắp ráp output -> validate ->
   bàn giao) và 4 file references: postman-test-patterns.md, contract-testing-patterns.md,
   collection-json-template.md, test-type-decision.md.
4. Đóng gói agent skill thành file .skill (zip) để có thể tải về/cài đặt trực tiếp.
5. Trình bày cả 2 file cho người dùng qua present_files.
```

#### AI Output

```text
Đã tạo 2 nhóm file:
- postman-contract-test-prompt-guide.md (~10KB): guide dùng trên web, không cần công cụ agent.
- postman-contract-test-generator.skill (đóng gói từ thư mục postman-contract-test-generator/,
  gồm SKILL.md + 4 file references trong references/): agent skill dùng cho Claude Code/coding agent.
Nội dung tại thời điểm này CHƯA bao gồm Pact contract testing, chỉ có contract test dạng
JSON Schema validation trong Postman.
```

#### Human Review

| Aspect           | Detail                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| Reviewed by      | Mạch Quốc Tấn                                                                                           |
| Review date      | 2026-08-01                                                                                              |
| Corrections made | Có — xem Entry 2 (audit phát hiện thiếu nhóm Pact và một số loại test Postman) và Entry 3 (đã cập nhật) |
| Quality rating   | Tốt                                                                                                     |
| Issues found     | None                                                                                                    |

---

### Entry 2 — Audit độ đầy đủ của Prompt Guide/Agent Skill so với danh mục loại test mong muốn

| Field              | Value                                                                                                                                                                                                |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AI Tool**        | Claude Sonnet 5                                                                                                                                                                                      |
| **Date/Time**      | 2026-08-01 08:45 +07:00                                                                                                                                                                              |
| **Task**           | Đối chiếu nội dung đã tạo ở Entry 1 với danh mục 9 loại test do người dùng đề ra (7 loại Postman/Newman + 2 loại Pact), đồng thời tìm kiếm web để xác định các loại test còn thiếu ngoài danh mục đó |
| **Feature**        | Prompt Guide & Agent Skill cho Postman/Contract Testing                                                                                                                                              |
| **Bloom-AI Level** | G9.3 (Analyse) — phân tích khoảng trống (gap analysis) giữa nội dung hiện có và yêu cầu, kết hợp tra cứu ngoài để đánh giá tính đầy đủ                                                               |

#### Prompt

**Prompt người dùng:**

```text
Tóm lại, bản **Prompt Guide hoàn chỉnh nhất** nên hướng dẫn ChatGPT/Claude sinh ra các loại test sau:
### I. Nhóm Postman & Newman (API Testing)
1.  **Happy Path & Performance Test:** Xác nhận API chạy đúng luồng chuẩn (Status `200/201`, Response Time < 1000ms).
2.  **Schema & Type Validation Test:** Xác thực định dạng Header (Content-Type) và cấu trúc JSON trả về (đủ trường, đúng kiểu dữ liệu).
3.  **Authentication & Authorization Test:**
    *   *Chưa đăng nhập:* Không gửi token/gửi token hết hạn $\rightarrow$ `401 Unauthorized`.
    *   *Sai phân quyền (RBAC):* User thường gọi API của Admin $\rightarrow$ `403 Forbidden`.
4.  **Validation & Negative Test:** Gửi thiếu trường bắt buộc, gửi sai định dạng đầu vào hoặc truy cập tài nguyên không tồn tại $\rightarrow$ `400 Bad Request` hoặc `404 Not Found`.
5.  **Boundary & Input Sanitization Test:** Gửi giá trị biên tối đa/tối thiểu và payload chứa ký tự đặc biệt (chặn SQLi/XSS).
6.  **Data-Driven Test:** Sinh bộ dữ liệu (CSV/JSON) và mã đọc biến động để kiểm thử hàng loạt các trường hợp biên và âm tính (Negative).
7.  **Integration Workflow Test (E2E):** Test chuỗi API liên kết nhau (gọi POST $\rightarrow$ lưu ID động vào biến $\rightarrow$ gọi GET/PUT $\rightarrow$ gọi DELETE).
---
### II. Nhóm Pact (Contract Testing)
1.  **Consumer Interaction Test:** Định nghĩa chi tiết Request gửi đi và Response mong đợi bằng các **Pact Matchers** (`like`, `eachLike`, `regex`) để xuất ra file hợp đồng `pact.json` độc lập với dữ liệu cứng.
2.  **Provider Verification & State Test:** Xác minh tính tương thích của API thật bằng cách thiết lập trạng thái tiền đề (**Provider State** - ví dụ: `Given("product 10 exists")`) trước khi chạy replay các request trong contract.

kiểm tra đã đủ các cái trên đây chưa, tìm kiếm thật kĩ và toàn diện để xem là còn loại test nào nữa không
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report (ghi lại retroactive)
Mode: APPEND

Các bước AI đã thực hiện:

1. Đối chiếu từng mục trong bảng 9 loại test của người dùng với nội dung đã tạo ở Entry 1
   -> kết luận 4/7 mục nhóm Postman đã đủ, 3/7 cần bổ sung rõ hơn (401 vs 403 tách riêng,
   SQLi/XSS cụ thể, E2E full CRUD chain); toàn bộ nhóm Pact (2/2 mục) đang thiếu hoàn toàn.
2. Tìm kiếm web: "comprehensive API testing types checklist Postman Newman 2026" để xác nhận
   khung 7 nhóm test cốt lõi (functional, integration, contract, performance, security, e2e, chaos).
3. Tìm kiếm web: "Pact contract testing Pact Broker can-i-deploy pending pacts bi-directional
   contract testing" để xác định các cơ chế Pact nâng cao (Pact Broker/can-i-deploy, Pending/WIP
   Pacts, Bi-Directional Contract Testing, Message Contract Test) chưa được người dùng liệt kê.
4. Tổng hợp kết quả thành bảng đối chiếu (2 bảng cho nhóm Postman và Pact) và danh sách các loại
   test mở rộng nên cân nhắc thêm, trình bày cho người dùng để xin xác nhận phạm vi cập nhật.
```

#### AI Output

```text
Không tạo file mới. Trả lời dạng phân tích gồm:
- Bảng đối chiếu 7 mục nhóm Postman: đánh dấu 4 mục đã đủ, 3 mục cần bổ sung rõ hơn.
- Bảng đối chiếu 2 mục nhóm Pact: cả 2 đang thiếu hoàn toàn trong nội dung Entry 1.
- Danh sách 6 loại test mở rộng nhóm Postman (rate limiting, idempotency, security headers,
  pagination, file upload, versioning) và 4 cơ chế mở rộng nhóm Pact (Pact Broker/can-i-deploy,
  Pending/WIP Pacts, Bi-Directional Contract Testing, Message/Event Contract Test).
- Đặt câu hỏi cho người dùng: cập nhật đầy đủ (9 mục + mở rộng) hay chỉ đúng 9 mục gốc.
```

#### Human Review

| Aspect           | Detail                                                              |
| ---------------- | ------------------------------------------------------------------- |
| Reviewed by      | Mạch Quốc Tấn                                                       |
| Review date      | 2026-08-01                                                          |
| Corrections made | Không — kết quả audit được chấp nhận và dùng làm căn cứ cho Entry 3 |
| Quality rating   | Tốt                                                                 |
| Issues found     | None                                                                |

---

### Entry 3 — Cập nhật Prompt Guide/Agent Skill theo kết quả audit và tạo AI Audit Report này

| Field              | Value                                                                                                                                                                                                                                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **AI Tool**        | Claude Sonnet 5                                                                                                                                                                                                                                                                                                                |
| **Date/Time**      | 2026-08-01 09:18 +07:00                                                                                                                                                                                                                                                                                                        |
| **Task**           | (a) Cập nhật postman-contract-test-prompt-guide.md và agent skill postman-contract-test-generator/ theo đúng các khoảng trống đã phát hiện ở Entry 2 (thêm nhóm Pact, tách 401/403, SQLi/XSS, E2E chain, các mục mở rộng); (b) Tạo file AI_Audit_Report.md này theo đúng cấu trúc skill ai-audit-report do người dùng cung cấp |
| **Feature**        | Prompt Guide & Agent Skill cho Postman/Contract Testing; AI Audit Report (HW02 §9)                                                                                                                                                                                                                                             |
| **Bloom-AI Level** | G9.4 (Create) — vừa tổng hợp lại toàn bộ 2 tài liệu chính (thêm nhóm nội dung mới về Pact), vừa áp dụng đúng cấu trúc phức tạp của một skill khác (ai-audit-report) để tạo tài liệu tuân thủ                                                                                                                                   |

#### Prompt

**Prompt người dùng:**

```text
có cập nhật lại giúp tôi, và nãy giờ cho tôi một file md audit theo file md đính kèm
```

Bổ sung sau khi AI hỏi lại các field bắt buộc còn thiếu:

```text
MSSV là 23127115, Họ tên là Mạch Quốc Tấn
Tuần là week 8
Thời gian dựa trên thời gian prompt hiện tại
Mỗi hội thoại là entry, trừ cái entry 3 là cập nhật audit
5 để trống tôi tự đánh giá
None
```

**Chi tiết thực thi:**

```text
Skill: postman-contract-test-generator (cập nhật nội dung) + ai-audit-report (tạo báo cáo)
Mode: GENERATE (AI_Audit_Report.md mới)

Các bước AI đã thực hiện:

1. Ghi đè postman-contract-test-prompt-guide.md: tách rõ 401/403, thêm ví dụ SQLi/XSS cụ thể,
   thêm E2E full CRUD chain (POST->GET->PUT->DELETE), thêm nguyên Phần II Pact với 2 template
   bắt buộc (Consumer Interaction Test, Provider Verification & State Test) và 4 mục Pact mở
   rộng, thêm 6 mục Postman mở rộng, thêm bảng tổng hợp coverage và bảng lỗi thường gặp mở rộng.
2. Tạo file mới references/pact-contract-patterns.md trong agent skill: code mẫu Pact JS đầy đủ
   cho Consumer Interaction Test, Provider Verification & State Test, can-i-deploy, Pending/WIP
   Pacts, Bi-Directional Contract Testing, Message Contract Test.
3. Cập nhật references/postman-test-patterns.md: thêm snippet 401, 403 (RBAC), boundary/sanitization
   (SQLi/XSS).
4. Cập nhật references/test-type-decision.md: thêm các dòng quyết định khi nào dùng Pact,
   khi nào dùng BDCT, khi nào cần can-i-deploy.
5. Cập nhật frontmatter description và nội dung SKILL.md chính để trigger đúng khi người dùng
   nhắc "Pact"/"consumer-driven contract"/"provider verification".
6. Đóng gói lại postman-contract-test-generator.skill (zip) với nội dung mới.
7. Đọc file SKILL.md của skill ai-audit-report do người dùng đính kèm để lấy đúng cấu trúc
   bắt buộc (7 phần: tiêu đề, tuyên bố, overview, entries, thống kê, contribution breakdown,
   compliance checklist) và quy tắc bắt buộc (không tự bịa Prompt/Quality rating/Issues found,
   không dùng cú pháp **[Nhãn]**, timestamp phải chính xác).
8. Vì thiếu các field bắt buộc (MSSV, tên, tuần, giờ chính xác, số lượng Entry, quality rating,
   issues found), dừng lại và hỏi gộp toàn bộ field còn thiếu trong 1 lượt, đúng theo quy tắc
   "Xác nhận thông tin bắt buộc" của skill.
9. Sau khi nhận đủ thông tin (trừ giờ chính xác — AI không có quyền truy cập đồng hồ thời gian
   thực nên để placeholder, không tự điền), tạo AI_Audit_Report.md với 3 Entry tương ứng 3 lượt
   tương tác chính trong hội thoại, giữ nguyên văn Prompt người dùng cho từng Entry, để trống ô
   Quality rating theo đúng yêu cầu người dùng (tự đánh giá sau), ghi "None" cho Issues found.
```

#### AI Output

```text
Đã cập nhật:
- postman-contract-test-prompt-guide.md (bản v2, ~15KB)
- postman-contract-test-generator/ (SKILL.md + 5 file references, thêm mới pact-contract-patterns.md)
- postman-contract-test-generator.skill (đóng gói lại từ thư mục trên)
Đã tạo mới:
- docs/reports/week08/AI Usage/QuocTan/AI_Audit_Report.md (file này)
Lưu ý còn tồn: ô Date/Time của cả 3 Entry đang để placeholder giờ (chỉ có ngày 2026-08-01 là
chắc chắn), cần người dùng tự điền giờ chính xác; ô Quality rating để trống theo yêu cầu người
dùng tự đánh giá.
```

#### Human Review

| Aspect           | Detail                                                                          |
| ---------------- | ------------------------------------------------------------------------------- |
| Reviewed by      | Mạch Quốc Tấn                                                                   |
| Review date      | 2026-08-01                                                                      |
| Corrections made | Đã bổ sung giờ chính xác cho 3 Entry (lần 1: 08:14, lần 2: 08:45, lần 3: 09:18) |
| Quality rating   | Tốt                                                                             |
| Issues found     | None                                                                            |

---

## Thống kê tổng hợp (Summary Statistics)

| Metric                      | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Total AI interactions       | 3                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| AI tools used               | Claude Sonnet 5                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Features covered            | Prompt Guide & Agent Skill cho Postman/Contract Testing; AI Audit Report                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Documents created / updated | postman-contract-test-prompt-guide.md; postman-contract-test-generator/SKILL.md; postman-contract-test-generator/references/postman-test-patterns.md; postman-contract-test-generator/references/contract-testing-patterns.md; postman-contract-test-generator/references/pact-contract-patterns.md (mới); postman-contract-test-generator/references/collection-json-template.md; postman-contract-test-generator/references/test-type-decision.md; postman-contract-test-generator.skill; AI_Audit_Report.md (mới) |
| Issues found by audit       | 4 (thiếu nhóm Pact hoàn toàn; 401/403 chưa tách rõ; SQLi/XSS chưa cụ thể; E2E chain chưa đủ 4 bước CRUD)                                                                                                                                                                                                                                                                                                                                                                                                             |
| Issues resolved             | 4 / 4                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Prompt templates sinh mới   | 12 (7 Postman gốc + 6 Postman mở rộng + 2 Pact gốc + 4 Pact mở rộng, một số template dùng chung)                                                                                                                                                                                                                                                                                                                                                                                                                     |

---

### AI Contribution Breakdown

| Task                    | AI Contribution | Human Contribution |
| ----------------------- | --------------- | ------------------ |
| Research & Synthesizing | 50%             | 50%                |
| Document Structuring    | 50%             | 50%                |
| Code Writing            | 50%             | 50%                |

---

## Compliance Checklist (HW02 §9)

- [x] Tuyên bố sử dụng AI
- [x] Tên công cụ AI sử dụng
- [x] Ngày và giờ của từng tương tác
- [x] Prompt chi tiết của người dùng
- [x] Kết quả phản hồi của AI
- [x] Nhật ký đánh giá của sinh viên (Human Review)
- [x] Định dạng Markdown chuẩn
