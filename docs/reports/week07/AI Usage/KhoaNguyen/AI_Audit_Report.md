# AI Audit Report — Tích hợp Newman vào GitHub Actions CI/CD

## Thông tin sinh viên (Student Information)

| Field                          | Value                                                    |
| ------------------------------ | -------------------------------------------------------- |
| **MSSV (Student ID)**          | 23127211                                                 |
| **Họ tên (Full Name)**         | Nguyễn Lê Hồ Anh Khoa                                    |
| **Mã bài tập (Assignment)**    | Seminar W07 — CI/CD: Newman + GitHub Actions + Artifacts |
| **Ngày nộp (Submission Date)** | 2026-07-18                                               |

## Tuyên bố sử dụng AI (AI Usage Declaration)

> "Tôi sử dụng công cụ AI để thực hiện các công việc: xây dựng workflow GitHub Actions chạy Newman tự động trên Postman Collection của Product Service; cấu hình khởi động API mẫu và cơ chế chờ sẵn sàng trong CI; tích hợp reporter htmlextra; cấu hình upload artifact báo cáo kết quả test kể cả khi test fail; và thêm route `/health` public cho provider để làm readiness probe trong CI."

## Tổng quan sử dụng AI (AI Usage Overview)

| #   | AI Tool                       | Task Category               | Feature                          | Date       | Bloom-AI Level |
| --- | ----------------------------- | --------------------------- | -------------------------------- | ---------- | -------------- |
| 1   | Claude Opus 4.8 (Claude Code) | CI/CD config & verification | GitHub Actions workflow (Newman) | 2026-07-18 | G9.4 (Create)  |
| 2   | Claude Opus 4.8 (Claude Code) | Code change & config update | Route /health + readiness probe  | 2026-07-18 | G9.2 (Apply)   |

---

## Chi tiết từng lần sử dụng AI

### Entry 1 — Xây dựng workflow GitHub Actions chạy Newman + upload artifact

| Field              | Value                                                                                                                                                          |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AI Tool**        | Claude Opus 4.8 (Claude Code, VS Code extension)                                                                                                               |
| **Date/Time**      | 2026-07-18 16:00:00 +07:00                                                                                                                                     |
| **Task**           | Viết file `.github/workflows/newman-api-test.yml`: trigger push/PR, khởi động provider, chạy Newman với reporter htmlextra, upload artifact với `if: always()` |
| **Feature**        | Automation / CI-CD — Newman trên Product Service                                                                                                               |
| **Bloom-AI Level** | G9.4 (Create) — tạo mới cấu hình pipeline hoàn chỉnh, tổng hợp từ mã nguồn + ràng buộc thực tế của API                                                         |

#### Prompt

**Prompt người dùng:**

```text
Chào bạn, để hoàn thiện quy trình kiểm thử tự động cho đồ án môn Kiểm thử phần mềm
với API `pact-workshop-js`, tôi cần bạn giúp xây dựng cấu hình CI/CD pipeline sử dụng GitHub
Actions và Newman.

**[NGỮ CẢNH CÁC TASK ĐÃ HOÀN THÀNH]**
- Chúng ta đã có bộ Postman Collection chuẩn hóa (CRUD) và file Environment được cấu hình hoàn chỉnh.

**[YÊU CẦU CÔNG VIỆC MỚI]**
Dựa trên các file kiểm thử đã có, hãy thực hiện các task sau:

1. **Xây dựng tệp cấu hình YAML cho GitHub Actions:**
   - Viết mã nguồn cho file workflow (ví dụ: `.github/workflows/newman-api-test.yml`).
   - Cấu hình các trigger để pipeline tự động kích hoạt: khi có sự kiện `push` hoặc `pull_request`
     vào nhánh chính (main/master), hoặc coi nó như một job chạy ngay sau bước build/deploy.

2. **Cấu hình môi trường và thực thi Newman:**
   - Cấu hình các step để checkout source code và thiết lập môi trường Node.js.
   - Cài đặt `newman` CLI và một reporter trực quan (tôi đề xuất `newman-reporter-htmlextra` để
     báo cáo đẹp và dễ đọc hơn).
   - Viết lệnh command chạy Newman tích hợp với file Collection và Environment đã có, đồng thời
     cấu hình xuất report ra một thư mục cụ thể (vd: `newman/`).

3. **Thiết lập hệ thống lưu trữ báo cáo (Artifacts Upload):**
   - Viết step sử dụng Action `actions/upload-artifact@v4` để đóng gói và tải lên toàn bộ thư mục
     chứa file báo cáo kết quả của Newman (HTML/JSON).
   - **Quan trọng:** Đảm bảo thêm cờ `if: always()` ở step upload artifact này, để hệ thống luôn
     lưu trữ được báo cáo ngay cả khi lệnh Newman trước đó bị fail (do API tạch test case hoặc do
     cái bug middleware chưa được fix).

Hãy cung cấp mã YAML hoàn chỉnh và giải thích ngắn gọn cách các step liên kết với nhau. Chúng ta
sẽ review bản YAML này trước khi đưa vào project chính thức.

```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: GENERATE

Các bước AI đã thực hiện:

1. Đọc CI hiện có trong repo để khớp style: .github/workflows/pact-verification.yml
   (permissions, concurrency, timeout-minutes, node cache) và ci.yml.example.
2. Phân tích ràng buộc thực tế của API mẫu ảnh hưởng tới CI:
   - provider chạy port 8080 (server.js), KHONG co endpoint /health.
   - auth.middleware áp cho MỌI route -> mọi request không token đều 401.
   - token do Pre-request script tự sinh (ISO timestamp) -> CI không cần secret.
3. Viết file .github/workflows/newman-api-test.yml gồm 9 step.
4. Kiểm chứng cục bộ trước khi giao:
   - Chạy đúng lệnh Newman với reporter cli,htmlextra,json trên server thật.
   - Xác nhận cơ chế readiness đúng (ban đầu bằng `wait-on tcp:8080`).
   - Xác nhận `GET /products` không token trả 401 (chứng minh http-get probe sẽ sai).
   - Parse YAML bằng parser chuẩn để xác nhận cú pháp hợp lệ.
5. (Follow-up theo yêu cầu) Kiểm tra ĐỘC LẬP lại các issue đã raise, chọn giải pháp tối ưu
   hợp codebase và áp thẳng vào workflow:
   - C1: `git check-ignore` xác nhận `newman/report.html` KHONG bị ignore, còn `newman/output/`
     thì CÓ -> đổi REPORT_DIR thành `newman/output` (khớp convention `src/newman/README.md`).
   - C3: xác nhận `curl` exit 0 với response 401, exit 7 khi connection refused -> thay `wait-on`
     (npx tải mỗi lần) bằng vòng lặp `curl` thuần, không cần dependency.
   - C2: xác nhận repo không có job build/deploy để gate -> giữ push/PR + workflow_dispatch,
     ghi rõ hướng `needs:` / `workflow_run` trong comment.
   - Chạy lại Newman ghi ra `newman/output/` (37/37 pass), xác nhận file bị gitignore và
     `git status` không còn thấy `newman/`.
```

#### AI Output

```text
Tạo file .github/workflows/newman-api-test.yml:

- Trigger: push [main], pull_request [main], workflow_dispatch. Kèm comment hướng dẫn cách
  chuyển thành job chạy sau build/deploy bằng `needs:`.
- permissions: contents: read; concurrency group; timeout-minutes: 10.
- 9 step: checkout -> setup-node@v4 (node 20, cache npm theo provider lock) ->
  npm ci (provider) -> mkdir newman/output -> khởi động provider (nohup npm start &,
  log ra newman/output/provider.log) -> readiness bằng vòng lặp `curl` ->
  npm install -g newman newman-reporter-htmlextra ->
  newman run (reporters cli,htmlextra,json -> newman/output/report.html + report.json) ->
  upload-artifact@v4 với `if: always()`, if-no-files-found: error, retention 7 ngày.

Kiểm chứng cục bộ (bao gồm cả pass follow-up):
- Newman: 16 requests / 37 assertions / 0 failed; report.html (340KB) + report.json (144KB) tạo ra.
- curl readiness: exit 0 với response 401 (server sống), exit 7 khi connection refused.
- git check-ignore: `newman/output/report.html` bị ignore; `git status` không thấy `newman/`.
- YAML: parse hợp lệ, 9 step, 3 trigger.

KHÔNG kiểm chứng: chưa chạy trong runner GitHub Actions thật (chỉ verify từng lệnh cục bộ trên Windows).
```

#### Human Review

| Aspect           | Detail                                                                                                                                                                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reviewed by      | Nguyễn Lê Hồ Anh Khoa                                                                                                                                                                                                                                                                 |
| Review date      | 2026-07-18                                                                                                                                                                                                                                                                            |
| Corrections made | Có. (1) Bổ sung nhóm step khởi động provider + readiness mà prompt bỏ sót — nếu thiếu, Newman ECONNREFUSED toàn bộ. (2) Sau pass kiểm tra độc lập: đổi report sang `newman/output/` (C1) và thay `wait-on` bằng vòng lặp `curl` không dependency (C3); C2 chốt giữ nguyên có luận cứ. |
| Quality rating   | Good.                                                                                                                                                                                                                                                                                 |
| Issues found     | Xem mục "Vấn đề đã phát hiện" bên dưới - 1 ngữ cảnh prompt + 2 bổ sung thiết yếu + 3 tradeoff (đã kiểm tra độc lập & xử lý).                                                                                                                                                          |

> Ghi chú cập nhật: cách readiness "curl-any-response" mô tả ở B2/C3 của Entry 1 **sau đó được thay** bằng probe `/health` sau khi thêm route `/health` public — xem Entry 2.

---

### Entry 2 — Thêm route /health public và đổi readiness probe sang /health

| Field              | Value                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------ |
| **AI Tool**        | Claude Opus 4.8 (Claude Code, VS Code extension)                                                             |
| **Date/Time**      | 2026-07-18 16:38:00 +07:00                                                                                   |
| **Task**           | Thêm endpoint `/health` public vào provider; sửa workflow dùng `/health` làm readiness probe; cập nhật audit |
| **Feature**        | Automation / CI-CD + Provider API (health check)                                                             |
| **Bloom-AI Level** | G9.2 (Apply) — áp dụng pattern health-check chuẩn, kèm phân tích vị trí đăng ký để giữ public                |

#### Prompt

**Prompt người dùng:**

```text
Implement giúp tôi route /health và sửa lại action cho phù hợp
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: APPEND

Các bước AI đã thực hiện:

1. Đọc test hiện có (server.test.js, product.pact.test.js) để xác nhận thêm /health không làm vỡ:
   - server.test.js không assert "mọi route đều 401" -> an toàn.
   - pact contract không có interaction /health -> provider verification không bị ảnh hưởng.
2. Thêm route /health vào server.js, đăng ký TRUOC authMiddleware để endpoint là public
   (không đòi token) -> tra 200 {"status":"ok"}.
3. Sửa .github/workflows/newman-api-test.yml:
   - Header comment: mô tả lại readiness bằng /health.
   - Step readiness: đổi vòng lặp `curl` sang `curl -fsS .../health` (chỉ pass khi thật sự 200).
4. Kiểm chứng thật:
   - jest server.test.js: 9/9 pass (không vỡ).
   - GET /health không token -> 200; curl -f /health -> exit 0.
   - GET /products không token -> vẫn 401; curl -f /products -> exit 22 (auth còn nguyên).
   - Newman: 37/37 pass.
5. Cập nhật audit: thêm Entry 2 (APPEND), cập nhật overview + thống kê.
```

#### AI Output

```text
1. src/sample-api/pact-workshop-js/provider/server.js
   - Thêm: app.get('/health', ...) đăng ký TRUOC app.use(authMiddleware) -> public, tra 200.

2. .github/workflows/newman-api-test.yml
   - Header comment mô tả readiness bằng /health.
   - Step "Wait for provider to be ready": curl -fsS http://127.0.0.1:8080/health trong vòng lặp.

Kiểm chứng: jest 9/9 pass; /health 200 (public); route khác vẫn 401; curl -f phân biệt đúng
(exit 0 cho /health, exit 22 cho /products 401); Newman 37/37 pass.

KHÔNG kiểm chứng: chạy thật trong runner GitHub Actions.
```

#### Human Review

| Aspect           | Detail                       |
| ---------------- | ---------------------------- |
| Reviewed by      | Nguyễn Lê Hồ Anh Khoa        |
| Review date      | 2026-07-18                   |
| Corrections made | Không có lỗi phải sửa. dụng. |
| Quality rating   | Good                         |
| Issues found     | Không phát sinh lỗi mới.     |

---

## Vấn đề đã phát hiện (Issues Found)

> Mục này ghi các vấn đề của **Entry 1**. Entry 2 không phát sinh lỗi (xem Human Review của Entry 2).

### Nhóm A — Ngữ cảnh trong prompt không khớp thực tế

| #   | Vấn đề                                                                                                                                                                                                                                                                                                                                    | Bằng chứng                                                             |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| A1  | Prompt nói `if: always()` cần để lưu report khi Newman fail "do cái bug middleware chưa được fix". Thực tế **bug middleware ĐÃ được sửa** (commit `ec080de`, tuần 6). Với code hiện tại, cả 37 assertion pass -> Newman exit 0 -> job xanh. Lý do "bug chưa fix" không còn đúng, nhưng `if: always()` vẫn nên giữ (phòng future failure). | Đã kiểm chứng ở audit tuần 6; chạy lại tuần này Newman vẫn 37/37 pass. |

### Nhóm B — Bổ sung thiết yếu mà prompt bỏ sót

| #   | Vấn đề                                                                                                                                                                                                                        | Xử lý                                                                                                          |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| B1  | Prompt liệt kê step: checkout -> setup node -> cài newman -> chạy newman -> upload. **Không hề nhắc việc khởi động API mẫu.** Newman test là E2E, cần API sống ở localhost:8080; thiếu bước này thì mọi request ECONNREFUSED. | Đã thêm: `npm ci` provider -> `nohup npm start &` -> `wait-on tcp:127.0.0.1:8080`.                             |
| B2  | Không thể dùng http-get làm readiness probe: API không có `/health`, và mọi route trả 401 khi thiếu token. `wait-on http://...` sẽ coi 401 là "chưa sẵn sàng" và treo tới timeout.                                            | Ban đầu dùng `wait-on tcp:`, sau đổi sang vòng lặp `curl` (xem C3). Đã verify: `/products` không token -> 401. |

### Nhóm C — Tradeoff đã kiểm tra độc lập & xử lý

| #   | Vấn đề                                                                                                                                                              | Giải pháp đã áp (tối ưu, hợp codebase)                                                                                                                                                                                                                                                          |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C1  | (ĐÃ XỬ LÝ) Report ban đầu xuất ra `newman/` ở gốc repo, nhưng `.gitignore` chỉ ignore `newman/output/`; chạy **local** để lại `newman/report.html` không bị ignore. | Đổi `REPORT_DIR` = `newman/output` — đã được `.gitignore:16` che sẵn, khớp convention tài liệu ở `src/newman/README.md`, KHÔNG phải sửa `.gitignore`. Verify: `git check-ignore` xác nhận bị ignore; `git status` sạch, không thấy `newman/`.                                                   |
| C2  | (ĐÃ CHỐT) Yêu cầu "coi như job chạy sau build/deploy" chưa hiện thực hóa bằng `needs:`.                                                                             | Repo KHÔNG có job build/deploy nào để gate (provider chỉ `node server.js`, không có bước build) -> không tạo job build giả để tránh code thừa. Giữ push/PR + `workflow_dispatch`; comment ghi rõ 2 cách nối khi có build: `needs:` (cùng workflow) hoặc `workflow_run` (workflow deploy riêng). |
| C3  | (ĐÃ XỬ LÝ) `wait-on` gọi qua `npx --yes` tải package mỗi lần chạy (vài giây).                                                                                       | Thay bằng vòng lặp `curl` thuần (curl có sẵn trên ubuntu-latest -> 0 dependency, 0 download). Verify: `curl` exit 0 với response 401, exit 7 khi refused -> readiness đúng, đồng thời xử lý được ca 401 mà `wait-on http-get` không làm được.                                                   |

### Nhóm D — Ghi chú tích cực (không phải lỗi)

- Provider dùng dữ liệu **in-memory** (`Map`), reset mỗi lần khởi động -> state trong CI **tất định**, khớp với chaining của Collection (POST tạo id 12, PUT/DELETE dùng lại). Không cần dọn dẹp dữ liệu.
- Workflow bám đúng style repo (khớp `pact-verification.yml`): `permissions`, `concurrency`, `timeout-minutes`, node cache theo `package-lock.json`.

---

## Thống kê tổng hợp (Summary Statistics)

| Metric                      | Value                                                                                                                                                                                            |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Total AI interactions       | 2                                                                                                                                                                                                |
| AI tools used               | Claude Opus 4.8 (Claude Code, VS Code extension)                                                                                                                                                 |
| Features covered            | Automation / CI-CD — GitHub Actions, Newman CLI, htmlextra reporter, artifacts upload; Provider health check                                                                                     |
| Documents created / updated | `.github/workflows/newman-api-test.yml`, `src/sample-api/pact-workshop-js/provider/server.js`, `docs/reports/week07/AI Usage/KhoaNguyen/AI_Audit_Report.md`                                      |
| Issues found by audit       | 6 (A: 1 ngữ cảnh prompt, B: 2 bổ sung thiết yếu, C: 3 tradeoff) — đều thuộc Entry 1; Entry 2 không phát sinh lỗi                                                                                 |
| Issues resolved             | Nhóm B (2/2) và Nhóm C (3/3) đã xử lý/chốt trong workflow. Nhóm A (1) là ngữ cảnh prompt — ghi nhận, `if: always()` giữ nguyên có chủ đích.                                                      |
| Workflow steps created      | 9                                                                                                                                                                                                |
| Verified locally            | jest server.test.js 9/9 pass; Newman 37/37 pass; `/health` 200 public + route khác vẫn 401; `curl -f` phân biệt đúng (exit 0 /health, exit 22 /products); report bị gitignore; YAML parse hợp lệ |
| Not verified                | Chạy thật trong GitHub Actions runner                                                                                                                                                            |

### AI Contribution Breakdown

| Task                                         | AI Contribution | Human Contribution |
| -------------------------------------------- | --------------- | ------------------ |
| API constraint analysis (port, auth, health) | 90%             | 10%                |
| Workflow YAML authoring                      | 90%             | 10%                |
| Local verification & debugging               | 85%             | 15%                |
| Issue identification & critique              | 80%             | 20%                |
| Yêu cầu & định hướng task                    | 0%              | 100%               |
| Final decision & sign-off                    | 0%              | 100%               |

---

## Compliance Checklist (HW02 §9)

- [x] Tuyên bố sử dụng AI
- [x] Tên công cụ AI sử dụng
- [x] Ngày và giờ của từng tương tác
- [x] Prompt chi tiết của người dùng
- [x] Kết quả phản hồi của AI
- [x] Nhật ký đánh giá của sinh viên
- [x] Định dạng Markdown chuẩn
