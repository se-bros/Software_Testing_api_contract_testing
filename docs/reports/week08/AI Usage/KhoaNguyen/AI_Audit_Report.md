# AI Audit Report — Agent Skill kiểm thử & Kịch bản Video 3 (W08)

## Thông tin sinh viên (Student Information)

| Field                          | Value                                                   |
| ------------------------------ | ------------------------------------------------------- |
| **MSSV (Student ID)**          | 23127211                                                |
| **Họ tên (Full Name)**         | Nguyễn Lê Hồ Anh Khoa                                   |
| **Mã bài tập (Assignment)**    | Seminar W08 — Agent Skill kiểm thử & Kịch bản Video 3   |
| **Ngày nộp (Submission Date)** | 2026-07-31                                              |

## Tuyên bố sử dụng AI (AI Usage Declaration)

> "Tôi sử dụng công cụ AI để thực hiện các công việc: khảo sát nội dung slide seminar và cấu
> trúc mã nguồn hiện có trong repository; thiết kế và biên soạn hai Agent Skill `api-testing`
> và `contract-testing` dưới dạng file `SKILL.md`; và biên soạn kịch bản chi tiết cho Video 3
> (Demo thực hành tổng hợp) gồm lời thoại, lệnh thực thi, kết quả mong đợi và quy trình xử lý
> sự cố khi quay."

## Tổng quan sử dụng AI (AI Usage Overview)

| #   | AI Tool        | Task Category            | Feature                                     | Date       | Bloom-AI Level |
| --- | -------------- | ------------------------ | ------------------------------------------- | ---------- | -------------- |
| 1   | Claude Opus 5  | Design & Content Writing | Agent Skill (api-testing, contract-testing) | 2026-07-31 | G9.4 (Create)  |
| 2   | Claude Opus 5  | Content Writing          | Kịch bản Video 3 — Demo thực hành tổng hợp  | 2026-07-31 | G9.4 (Create)  |

## Chi tiết từng lần sử dụng AI

### Entry 1 — Thiết kế bộ Agent Skill api-testing và contract-testing

| Field              | Value                                                                       |
| ------------------ | --------------------------------------------------------------------------- |
| **AI Tool**        | Claude Opus 5 (Claude Code CLI)                                             |
| **Date/Time**      | 2026-07-31 11:38:00 +07:00                                                  |
| **Task**           | Thiết kế hai Agent Skill sinh bộ kiểm thử API và contract test, dựa trên nội dung slide seminar đã hoàn thiện và quy ước thực tế trong repository |
| **Feature**        | Agent Skill — AI-driven Test Generator (mục 6.3 của seminar)                |
| **Bloom-AI Level** | G9.4 (Create) — tổng hợp lý thuyết từ slide, đối chiếu mã nguồn thật trong repo, rồi tạo ra tài liệu quy trình mới có cấu trúc |

#### Prompt

**Prompt người dùng:**

```text
Dựa vào nội dung trong slide, hãy thiết kế ra bộ agent skill về api-testing và contract-testing
sau đó hãy dùng skill @.agents/skills/ai-audit-report/SKILL.md để log lại toàn bộ
```

**Chi tiết thực thi:**

```text
Skill: api-testing, contract-testing (tạo mới) + ai-audit-report (GENERATE)
Mode: GENERATE

Các bước AI đã thực hiện:

1. Đọc toàn bộ 39 slide trong docs/slides/pages/ để trích xuất nội dung lý thuyết:
   6 loại test case và 3 kỹ thuật thiết kế (slide 2.4), cơ chế auth Bearer ISO-8601
   (slide 2.3), quy ước tổ chức Collection (slide 2.6), cấu trúc data-driven (slide 2.8),
   vòng đời contract và can-i-deploy (slide 4.x, 5.x).
2. Khảo sát cấu trúc thư mục .agents/skills/ và .claude/skills/, xác định .agents/ là bản
   được git theo dõi, .claude/ là bản mirror cục bộ không tracked.
3. Xác nhận hai file .agents/skills/api-testing/SKILL.md và
   .agents/skills/contract-testing/SKILL.md hiện chỉ chứa nội dung "# Placeholder".
4. Đọc các artifact thật trong repository để skill bám đúng thực tế, không viết chung chung:
   - src/postman/README.md (bảng mapping folder - data file - iterations, cơ chế auth)
   - src/postman/data/get-product-by-id.data.json (schema data file: tc_id, description,
     auth_header, expected_status, expect_field_*)
   - src/pact/README.md (luồng consumer - provider - broker)
   - consumer/src/api.pact.spec.js (khuôn mẫu PactV3, MatchersV3, regex cho Authorization)
   - provider/product/product.pact.test.js (stateHandlers, requestFilter, fallback pactUrls)
5. Biên soạn .agents/skills/api-testing/SKILL.md (219 dòng) gồm: frontmatter name/description,
   phạm vi áp dụng, đầu vào bắt buộc, quy trình 6 bước, khuôn mẫu Pre-request Script và
   Test Script, lệnh Newman, checklist 11 mục, bảng 8 cạm bẫy.
6. Biên soạn .agents/skills/contract-testing/SKILL.md (265 dòng) gồm: bảng "khi nào KHÔNG
   dùng", xử lý trường hợp Provider là API bên ngoài, quy trình 5 bước, khuôn mẫu consumer
   test và provider verification, kỷ luật dùng matcher, kịch bản breaking change,
   checklist 11 mục, bảng 9 cạm bẫy.
7. Sao chép hai file sang .claude/skills/ để khớp với pattern đồng bộ sẵn có của repo,
   xác minh hash MD5 trùng khớp.
8. Lấy giờ hệ thống (2026-07-31 11:38 +07:00) và hỏi gộp người dùng các field bắt buộc
   còn thiếu theo yêu cầu của skill ai-audit-report: thành viên/tuần, mốc thời gian,
   quality rating, issues found.
9. Ghi file AI_Audit_Report.md này theo mode GENERATE.
```

#### AI Output

```text
Đã tạo 2 file Agent Skill (tổng 484 dòng), mỗi file có frontmatter YAML hợp lệ
(name + description) để Claude Code nhận diện và kích hoạt:

1. .agents/skills/api-testing/SKILL.md (219 dòng)
   - Quy trình 6 bước: phân tích đặc tả, sinh test case theo 6 nhóm, sinh data file,
     sinh Collection, sinh script, sinh lệnh Newman.
   - Quy ước bắt buộc: tc_id + description trong mọi data row; kỳ vọng nằm trong data
     file thay vì hardcode trong script; tách Happy Path/Negative theo HTTP method.
   - Cảnh báo riêng cho sandbox công cộng (PetStore, ReqRes, JSONPlaceholder) về ba rủi ro:
     auth không được thực thi, validation không được thực thi, dữ liệu bị người khác sửa.
   - Checklist nghiệm thu 11 mục, bảng 8 cạm bẫy kèm hậu quả và cách tránh.

2. .agents/skills/contract-testing/SKILL.md (265 dòng)
   - Bảng "khi nào KHÔNG dùng" phân định rõ ranh giới với api-testing, unit test và E2E.
   - Mục riêng xử lý trường hợp Provider là API bên ngoài không sở hữu: nêu rõ vòng lặp
     consumer-driven đầy đủ không áp dụng được, đề xuất hai phương án hợp lệ
     (chỉ làm phía Consumer, hoặc Bi-Directional Contract Testing với OpenAPI spec).
   - Khuôn mẫu consumer test (PactV3 + MatchersV3) và provider verification (stateHandlers,
     requestFilter, fallback pactUrls) trích từ mã nguồn thật của repo.
   - Kỷ luật dùng matcher: bảng chọn matcher theo loại dữ liệu, phân tích cặp lỗi đối xứng
     over-specify và under-specify.
   - can-i-deploy có 3 nhánh, trong đó unknown cũng chặn deploy theo nguyên tắc fail-safe.
   - Checklist nghiệm thu 11 mục, bảng 9 cạm bẫy.

Cả hai file đã được sao chép sang .claude/skills/ và xác minh trùng hash MD5.
Sau khi ghi, Claude Code đã nhận diện được cả hai skill với description mới
(thay cho nội dung "# Placeholder" trước đó).
```

#### Human Review

| Aspect           | Detail                                                                    |
| ---------------- | ------------------------------------------------------------------------- |
| Reviewed by      | Nguyễn Lê Hồ Anh Khoa                                                     |
| Review date      | 2026-07-31                                                                |
| Corrections made | Không — nội dung hai skill bám đúng quy ước sẵn có của repository và nội dung slide, không cần chỉnh sửa |
| Quality rating   | Excellent                                                                 |
| Issues found     | None                                                                      |

### Entry 2 — Biên soạn kịch bản chi tiết Video 3 (Demo thực hành tổng hợp)

| Field              | Value                                                                       |
| ------------------ | --------------------------------------------------------------------------- |
| **AI Tool**        | Claude Opus 5 (Claude Code CLI)                                             |
| **Date/Time**      | 2026-07-31 13:49:00 +07:00                                                  |
| **Task**           | Viết kịch bản chi tiết Video 3 theo luồng Postman → Newman/CI-CD → Pact Consumer/Provider → Breaking Change → Agent Skill trên PetStore API |
| **Feature**        | Deliverable Video 3 — Demo thực hành tổng hợp (seminar W08)                 |
| **Bloom-AI Level** | G9.4 (Create) — tổng hợp mã nguồn, workflow và Agent Skill thành kịch bản quay có lệnh thực thi và kết quả mong đợi |

#### Prompt

**Prompt người dùng:**

```text
Dựa vào agent skill bạn đã gen, tiến hành - Viết kịch bản chi tiết **Video 3 (Demo thực hành
tổng hợp)**: có thể tham khảo thiết kế luồng demo Postman test script → Newman CI/CD → Pact
Consumer/Provider → Breaking Change simulation → Agent Skill chạy trên PetStore API (chứng
minh Reusability >80%).

Sau đó dùng skill @.agents/skills/ai-audit-report/SKILL.md  để log lại toàn bộ
```

**Chi tiết thực thi:**

```text
Skill: ai-audit-report
Mode: APPEND

Các bước AI đã thực hiện:

1. Đọc các artifact thực thi để kịch bản có lệnh chính xác thay vì lệnh giả định:
   - src/newman/run-newman.ps1 (tham số -Collection, -Data, -Folder, -SkipProviderCheck;
     hàm Test-Provider gọi /products với token tự sinh)
   - src/newman/README.md (đường dẫn báo cáo theo timestamp, cảnh báo test isolation)
   - .github/workflows/pact-verification.yml (3 job: consumer-pact, provider-verification,
     can-i-deploy dùng pact-broker CLI kiểm tra hai chiều)
   - .github/workflows/newman-api-test.yml (readiness probe /health public)
   - package.json của root/consumer/provider (script test:pact, pretest:pact rimraf)
   - provider/product/product.js và product.controller.js (vị trí sửa breaking change)
2. Phát hiện xung đột cổng 8080: product.pact.test.js tự gọi createApp().listen("8080")
   ngay khi nạp module, sẽ fail EADDRINUSE nếu Provider thủ công còn chạy từ phần demo trước.
   Đưa việc dừng Provider thành một cảnh có chủ đích trong kịch bản.
3. Xác định điểm sửa breaking change tối thiểu: đổi this.name thành this.title trong
   constructor của class Product (một dòng).
4. Thiết kế thí nghiệm đối chứng ở Phần 4: chạy lại bộ Newman trên bản đã có breaking change
   để cho thấy test chỉ assert status vẫn pass, trong khi contract test fail.
5. Áp dụng quy tắc từ hai Agent Skill vừa tạo vào Phần 5: cảnh báo sandbox công cộng
   (auth/validation có thể không được thực thi, dữ liệu không cô lập) và lý do không chạy
   provider verification trên API không sở hữu.
6. Lập bảng reusability phân tách theo từng thành phần thay vì đưa một con số tổng.
7. Viết docs/demo/videos/video-03-integrated-demo-script.md (12 mục, 22 cảnh, timeline
   28-32 phút) và cập nhật docs/demo/videos/README.md.
8. Hỏi người dùng các field bắt buộc còn thiếu (thời gian, quality rating, issues) rồi
   APPEND Entry này, cập nhật bảng Tổng quan, Thống kê tổng hợp và Contribution Breakdown.
```

#### AI Output

```text
Đã tạo docs/demo/videos/video-03-integrated-demo-script.md gồm:

- Mục tiêu, bảng thông điệp chính của từng phần trong 5 phần demo.
- Mục "Chuẩn bị trước khi quay" nêu 3 cạm bẫy kỹ thuật: xung đột cổng 8080 giữa Phần 2 và
  Phần 3, test DELETE phá dữ liệu in-memory, và rủi ro của sandbox công cộng PetStore.
- Timeline 22 cảnh kèm chapter marker, tổng 28-32 phút.
- Kịch bản chi tiết 5 phần, mỗi cảnh có: thao tác, lệnh thực thi chính xác, kết quả mong đợi,
  lời thoại, và chú thích dựng phim.
- Phần 4 có thí nghiệm đối chứng: chạy lại Newman trên bản mang breaking change để chứng minh
  functional test có thể bỏ lọt trong khi contract test bắt được theo thiết kế.
- Phần 5 trình bày kết quả PetStore trung thực, hướng dẫn không cắt đoạn test fail và giải
  thích nguyên nhân là do API đích không thực thi ràng buộc nó khai báo.
- Bảng reusability phân tách 8 thành phần với tỉ lệ riêng (100% cho Agent Skill, cấu trúc
  collection, schema data file và test script template; ~95% workflow; ~90% runner;
  ~60% pre-request script; 0% dữ liệu test).
- Bảng kiểm 26 mục, mục xử lý 7 loại sự cố thường gặp khi quay.

Đã cập nhật docs/demo/videos/README.md để liệt kê đủ ba kịch bản video.
```

#### Human Review

| Aspect           | Detail                                                                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reviewed by      | Nguyễn Lê Hồ Anh Khoa                                                                                                                                                     |
| Review date      | 2026-07-31                                                                                                                                                                |
| Corrections made | Không — các lệnh và đường dẫn đã được đối chiếu trực tiếp với mã nguồn trong repository                                                                                    |
| Quality rating   | Good                                                                                                                                                                      |
| Issues found     | Phần 5 (PetStore) chưa được dry run: kịch bản dự đoán PetStore không thực thi auth và validation nhưng chưa chạy request thật để xác nhận, và thư mục `src/postman/petstore/` chưa được sinh ra. Cần chạy Agent Skill và kiểm chứng hành vi API trước khi quay, sau đó cập nhật lại lời thoại Cảnh 19-20 theo kết quả thực tế. |

## Thống kê tổng hợp (Summary Statistics)

| Metric                          | Value                                                                                                                                              |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Total AI interactions           | 2                                                                                                                                                  |
| AI tools used                   | Claude Opus 5 (Claude Code CLI)                                                                                                                    |
| Features covered                | Agent Skill (api-testing, contract-testing); Kịch bản Video 3 — Demo thực hành tổng hợp                                                             |
| Documents created / updated     | `.agents/skills/api-testing/SKILL.md`, `.agents/skills/contract-testing/SKILL.md`, hai bản mirror trong `.claude/skills/`, `docs/demo/videos/video-03-integrated-demo-script.md`, `docs/demo/videos/README.md` |
| Issues found by audit           | 1                                                                                                                                                  |
| Issues resolved                 | 0 / 1 (Phần 5 PetStore cần dry run trước khi quay)                                                                                                  |
| Skills created                  | 2                                                                                                                                                  |
| Video scripts created           | 1 (Video 3, 22 cảnh, timeline 28–32 phút)                                                                                                           |
| Total lines written             | 484 dòng SKILL.md (api-testing: 219, contract-testing: 265) + kịch bản Video 3                                                                       |
| Checklist items defined         | 48 (22 trong hai skill, 26 trong kịch bản Video 3)                                                                                                  |
| Pitfalls documented             | 24 (api-testing: 8, contract-testing: 9, Video 3: 7 loại sự cố khi quay)                                                                             |
| Source files surveyed           | 15 (5 slide section, `src/postman/README.md`, data file mẫu, `api.pact.spec.js`, `product.pact.test.js`, `product.js`, `product.controller.js`, `run-newman.ps1`, `src/newman/README.md`, 2 workflow YAML) |

### AI Contribution Breakdown

| Task                                        | AI Contribution | Human Contribution |
| ------------------------------------------- | --------------- | ------------------ |
| Research & Synthesizing (slide + repo code) | 80%             | 20%                |
| Document Structuring                        | 90%             | 10%                |
| Code Template Writing                       | 85%             | 15%                |
| Convention & Pitfall Design                 | 70%             | 30%                |
| Video Script & Narration Writing            | 85%             | 15%                |
| Review & Verification                       | 0%              | 100%               |

## Compliance Checklist (HW02 §9)

- [x] Tuyên bố sử dụng AI
- [x] Tên công cụ AI sử dụng
- [x] Ngày và giờ của từng tương tác
- [x] Prompt chi tiết của người dùng
- [x] Kết quả phản hồi của AI
- [x] Nhật ký đánh giá của sinh viên (Human Review)
- [x] Định dạng Markdown chuẩn
