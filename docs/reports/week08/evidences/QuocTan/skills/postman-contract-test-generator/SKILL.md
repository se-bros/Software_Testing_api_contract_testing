---
name: postman-contract-test-generator
description: Sinh Postman test script (pm.test/pm.expect), Postman collection JSON, contract test dựa trên schema (OpenAPI/Swagger), và Pact consumer-driven contract test (Consumer Interaction Test, Provider Verification & State Test, Pact Broker/can-i-deploy, Bi-Directional Contract Testing). Dùng skill này bất cứ khi nào người dùng yêu cầu viết test cho API bằng Postman, sinh collection .postman_collection.json, viết contract test, viết test bằng Pact, kiểm tra breaking change giữa provider/consumer, hoặc khi có file OpenAPI/Swagger/Postman collection/pact.json trong repo cần được bổ sung test. Kích hoạt cả khi người dùng chỉ nói "viết test cho API này", "test Postman", "contract test", "Pact", "consumer-driven contract", "provider verification", "kiểm tra schema response", hay đưa đường dẫn tới file .yaml/.json OpenAPI, .postman_collection.json, pact.json.
---

# Postman & Contract Test Generator

Skill này giúp agent tự động phân tích API (từ OpenAPI spec, Postman collection có sẵn, pact.json, hoặc request/response mẫu do người dùng cung cấp/đọc từ code) và sinh ra:
1. **Functional Postman test script** (`pm.test`) — bao gồm happy path, performance, auth (401/403), negative/validation, boundary & sanitization (SQLi/XSS), data-driven, E2E workflow chain
2. **Contract test kiểu JSON Schema** trong Postman (kiểm tra cấu trúc/kiểu dữ liệu response có khớp spec, không quan tâm giá trị nghiệp vụ)
3. **Pact consumer-driven contract test** — Consumer Interaction Test (Matchers, provider state), Provider Verification & State Test (state handler, verify against real provider), Pact Broker publish/`can-i-deploy` gating, Bi-Directional Contract Testing khi phù hợp
4. **Postman collection JSON** hoàn chỉnh có thể chạy bằng `newman` trong CI

## Khi nào dùng skill này

- Người dùng yêu cầu viết/generate test cho API bằng Postman
- Người dùng nhắc đến "contract test", "consumer-driven contract", "schema validation test"
- Repo có file OpenAPI/Swagger (`*.yaml`, `*.yml`, `openapi.json`) và người dùng muốn có test tương ứng
- Repo có sẵn `*.postman_collection.json` cần bổ sung/refactor test script
- Người dùng muốn tích hợp test Postman vào CI (chạy bằng `newman`)

## Quy trình làm việc

### Bước 1 — Thu thập nguồn thông tin API

Ưu tiên theo thứ tự, dùng công cụ đọc file/tìm kiếm (Grep/Glob/Read) để tự tìm trước khi hỏi người dùng:

1. Tìm file OpenAPI/Swagger trong repo (`**/openapi*.y*ml`, `**/swagger*.json`, `**/*.openapi.json`)
2. Tìm Postman collection có sẵn (`**/*.postman_collection.json`)
3. Tìm code định nghĩa route/controller (Express, NestJS, Spring, FastAPI...) để suy ra request/response shape nếu không có spec
4. Nếu không tìm thấy gì đủ dùng, hỏi người dùng cung cấp: method, URL, request/response mẫu, hoặc đường dẫn file spec

**Không tự bịa field hoặc kiểu dữ liệu.** Nếu thiếu thông tin quan trọng (ví dụ response schema của 1 field phức tạp), dừng lại và hỏi, hoặc đánh dấu rõ trong output là `// ASSUMPTION: ...`.

### Bước 2 — Phân loại loại test cần sinh

Đọc `references/test-type-decision.md` nếu chưa rõ nên sinh functional test, contract test, hay cả hai cho từng endpoint. Quy tắc nhanh:

- Có OpenAPI spec chính thức, không có Pact → sinh **contract test JSON Schema** trong Postman dựa trên `components/schemas`
- Có response mẫu thực tế kèm business rule (tính toán, điều kiện) → sinh thêm **functional test**
- Người dùng nhắc "Pact", có 2 service nội bộ cả 2 phía đều sửa được test, hoặc cần provider state/gating deploy → dùng **Pact consumer-driven contract test** thay vì JSON Schema, xem `references/pact-contract-patterns.md`
- Provider có OpenAPI spec, nhiều consumer bên ngoài không kiểm soát được → **Bi-Directional Contract Testing**, xem `references/pact-contract-patterns.md` §5
- Endpoint có auth → luôn tách riêng test 401 (chưa xác thực) và 403 (RBAC, sai quyền)
- Field input string tự do → thêm boundary & sanitization test (SQLi/XSS payload benign)

### Bước 3 — Sinh test script

Đọc `references/postman-test-patterns.md` để lấy đúng snippet chuẩn (status code, response time, header, schema validation qua `pm.response.to.have.jsonSchema`, chaining variable, data-driven test).

Nguyên tắc viết script:
- Mỗi `pm.test()` chỉ kiểm tra một điều, đặt tên rõ ràng bằng tiếng Anh, có tiền tố `Contract:` cho contract test và `Functional:` cho functional test để dễ lọc report
- Contract test không hard-code giá trị nghiệp vụ cụ thể, chỉ kiểm tra kiểu/ràng buộc/required
- Có comment ngắn giải thích assertion phức tạp
- Nếu schema lớn, định nghĩa `const schema = {...}` ở đầu script hoặc tách vào Collection Variable nếu dùng lại nhiều nơi

### Bước 4 — Lắp ráp output

Tuỳ theo yêu cầu người dùng, chọn 1 trong 2 dạng output:

**(a) Script rời** — dán trực tiếp vào tab Tests của 1 request cụ thể. Trả về block code JS, kèm ghi chú "dán vào tab Tests của request [tên]".

**(b) Postman Collection JSON hoàn chỉnh** — tạo file `.postman_collection.json` (schema v2.1.0) chứa toàn bộ request + test script, có thể chạy ngay bằng:
```bash
newman run <file>.postman_collection.json -e <environment>.json
```
Xem cấu trúc mẫu trong `references/collection-json-template.md`.

### Bước 5 — Validate

Trước khi coi là hoàn tất:
- Nếu tạo file `.json`, chạy `node -e "JSON.parse(require('fs').readFileSync('<file>'))"` hoặc `python3 -m json.tool <file>` để đảm bảo JSON hợp lệ
- Nếu môi trường có `newman` cài sẵn, có thể chạy thử `newman run <file> --dry-run` (nếu hỗ trợ) hoặc chạy thật nếu có network tới API test; nếu không có `newman`/không có mạng tới API đích, bỏ qua bước chạy thật và nói rõ với người dùng là chưa verify bằng cách chạy thực tế
- Đọc lại từng `pm.test()` để đảm bảo không có assertion nào tham chiếu field không tồn tại trong response mẫu đã cho

### Bước 6 — Bàn giao

- Lưu file vào vị trí phù hợp trong repo (thường `tests/postman/` hoặc theo cấu trúc project hiện có — kiểm tra trước khi tạo thư mục mới)
- Tóm tắt ngắn gọn: đã sinh bao nhiêu request, bao nhiêu test case, loại nào (functional/contract), giả định nào đã đưa ra nếu có

## Tài liệu tham khảo

- `references/postman-test-patterns.md` — Thư viện snippet chuẩn cho pm.test (status, time, header, schema, chaining, data-driven, auth 401/403, boundary/sanitization)
- `references/contract-testing-patterns.md` — Cách viết contract test JSON Schema từ OpenAPI trong Postman (khi không dùng Pact)
- `references/pact-contract-patterns.md` — Pact consumer-driven contract test: Consumer Interaction Test, Provider Verification & State, Pact Broker/can-i-deploy, Pending/WIP Pacts, Bi-Directional Contract Testing, Message Contract Test
- `references/collection-json-template.md` — Khung Postman Collection JSON v2.1.0 mẫu để điền vào
- `references/test-type-decision.md` — Quy tắc quyết định sinh functional test, contract test JSON Schema, hay Pact contract test

Đọc các file trên khi cần chi tiết cụ thể thay vì tự nhớ lại cú pháp — Postman API sandbox có một số hạn chế riêng (không có Node.js `require` đầy đủ, chỉ có tập thư viện built-in như `ajv`, `cheerio`, `lodash`, `moment`, `chai`) nên cần bám theo pattern đã kiểm chứng trong references.
