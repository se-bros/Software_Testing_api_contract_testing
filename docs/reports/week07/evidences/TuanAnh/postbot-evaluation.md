# Đánh giá Postman Postbot — Tính thực tiễn khi sinh test case tự động

> **Dự án:** API & Contract Testing — Nhóm 3 SEBros  
> **Task:** W07 — Nguyễn Tuấn Anh (23127152)  
> **Công cụ:** Postman Postbot (AI assistant tích hợp)  
> **API thử nghiệm:** Pact Workshop JS Provider (`src/sample-api/pact-workshop-js`), tham chiếu smoke test W06  
> **Ngày:** 2026-07-25  
> **Collection:** `w07-postbot-testing.postman_collection.json` → folder `testing` (9 request)

---

## Mục lục

- [1. Mục tiêu đánh giá](#1-mục-tiêu-đánh-giá)
- [2. Môi trường & phạm vi thử nghiệm](#2-môi-trường--phạm-vi-thử-nghiệm)
- [3. Quy trình sử dụng Postbot](#3-quy-trình-sử-dụng-postbot)
- [4. Kết quả thử nghiệm theo endpoint](#4-kết-quả-thử-nghiệm-theo-endpoint)
- [5. Phân tích chất lượng script được sinh](#5-phân-tích-chất-lượng-script-được-sinh)
- [6. Ưu điểm / Nhược điểm / Giới hạn](#6-ưu-điểm--nhược-điểm--giới-hạn)
- [7. So sánh nhanh với viết tay và ChatGPT/Claude](#7-so-sánh-nhanh-với-viết-tay-và-chatgptclaude)
- [8. Kết luận & khuyến nghị](#8-kết-luận--khuyến-nghị)
- [9. Ảnh minh chứng](#9-ảnh-minh-chứng)
- [10. Đối chiếu sau khi chạy Prompt Guide (cùng ngày)](#10-đối-chiếu-sau-khi-chạy-prompt-guide-cùng-ngày)

---

## 1. Mục tiêu đánh giá

1. Postbot sinh được những loại assertion nào từ response thực tế?
2. Script sinh ra có đủ cho happy path, negative, auth, boundary không?
3. Cần chỉnh tay bao nhiêu % trước khi dùng được trong collection/CI?
4. Có nên đưa Postbot vào quy trình thực hành seminar / Lab Manual không?

---

## 2. Môi trường & phạm vi thử nghiệm

| Hạng mục | Giá trị |
| --- | --- |
| Ngày thử | 2026-07-25 |
| Postman / Postbot | Postman Desktop — Postbot (prompt: `Add tests to this request`) |
| Provider | Docker Compose — `docker compose up --build provider` (`pact-workshop-js`) |
| Base URL | `http://localhost:8080` (`{{baseUrl}}`) |
| Auth | Bearer ISO-8601 sinh ở Pre-request collection (`{{authToken}}`) |
| Collection / folder | `Postbot Testing` → `testing` (9 request smoke W06) |

**Phạm vi đã chạy đủ 9 request:**

| # | Request | Kỳ vọng | Kết quả chạy lại |
| :-: | --- | :-: | :-: |
| 01 | `GET /products` — no Authorization | 401 | 4/4 PASS |
| 02 | `GET /products` — Bearer hợp lệ | 200 | 4/4 PASS |
| 03 | `POST /products` — no Authorization | 401 | 5/5 PASS |
| 04 | `POST /products` — body hợp lệ | 201 | 7/7 PASS |
| 05 | `POST /products` — thiếu type/name | 400 | 3/3 PASS |
| 06 | `PUT /product/:id` — id tồn tại | 200 | 7/7 PASS |
| 07 | `PUT /product/:id` — id không tồn tại | 404 | 4/4 PASS |
| 08 | `DELETE /product/:id` — id vừa tạo | 204 | **0/2 FAIL** (thực tế 404) |
| 09 | `DELETE /product/:id` — id không tồn tại | 404 | 3/3 PASS |

**Tóm tắt:** 8/9 request đạt PASS với script Postbot gần như giữ nguyên; **08** fail do phụ thuộc biến `createdProductId` / thứ tự chạy, không phải do sai cú pháp assertion.

---

## 3. Quy trình sử dụng Postbot

1. Import collection `w07-postbot-testing.postman_collection.json`, bật Provider `:8080`.
2. Chọn từng request trong folder `testing` → **Send** nhận response thật.
3. Mở **Postbot** → prompt thống nhất: `Add tests to this request`.
4. Postbot ghi script vào tab **Scripts → Post-response**.
5. **Send** lại → ghi Pass/Fail + chụp evidence.
6. Human review (mục 4–5): giữ / sửa / bổ sung.

**Prompt dùng cho cả 9 request:**

```text
Add tests to this request
```

---

## 4. Kết quả thử nghiệm theo endpoint

### 4.1 `01 GET /products` — no Authorization → 401

| Field | Nội dung |
| --- | --- |
| Status / body thực tế | `401 Unauthorized`, `{"error":"Unauthorized"}` (~7 ms) |
| Số `pm.test` Postbot sinh | 4 |
| Chạy lại | **4/4 PASS** |
| Đã chỉnh tay? | **Không** — script đủ cho case auth fail |
| Evidence | `r1.png` |

**Script Postbot sinh:**

```javascript
pm.test("Status code is 401", function () {
    pm.response.to.have.status(401);
});

pm.test("Response body contains error field", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("error");
});

pm.test("Error message is 'Unauthorized'", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.error).to.eql("Unauthorized");
});

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(2000);
});
```

**Human review:** Giữ nguyên. Tuỳ chọn bổ sung assert `Content-Type` chứa `application/json` (không bắt buộc).

---

### 4.2 `02 GET /products` — Bearer hợp lệ → 200

| Field | Nội dung |
| --- | --- |
| Status / body thực tế | `200 OK`, mảng product (~473 B, 7 ms) |
| Số `pm.test` Postbot sinh | 4 |
| Chạy lại | **4/4 PASS** |
| Đã chỉnh tay trên script Postbot? | **Chưa sửa file Postbot gốc** (`r2.png` vẫn là bản AI sinh) |
| Rủi ro đã xác nhận | Assert `version` bắt buộc cho *mọi* product → dễ false-negative nếu sau này có product thiếu `version` (ghi nhận W06) |
| Evidence Postbot | `r2.png` |
| Cách xử lý đã làm (cùng ngày) | Sinh lại bằng **ChatGPT + Prompt Guide mục 4**: chỉ siết `version` cho seed 09/10/11 — PASS trên Postman (`r2_chatgpt.png`). Review thêm mục 7: [`r2_chatgpt_ai_review.md`](./r2_chatgpt_ai_review.md) |

**Script Postbot sinh (rút gọn ý):** status 200; body là array; array không rỗng; mỗi phần tử có `id`, `type`, `name`, **`version`**.

**Hướng chỉnh đề xuất** (đã hiện thực hoá qua Prompt Guide, không ghi đè evidence Postbot):

```javascript
// Hợp đồng: id/type/name bắt buộc; version chỉ chắc với seed 09/10/11
pm.test("Moi product co id, type, name", function () {
    pm.response.json().forEach(function (p) {
        pm.expect(p).to.have.property("id");
        pm.expect(p).to.have.property("type");
        pm.expect(p).to.have.property("name");
    });
});

pm.test("Product seed (09/10/11) co field version", function () {
    pm.response.json()
        .filter(function (p) { return ["09", "10", "11"].indexOf(p.id) !== -1; })
        .forEach(function (p) { pm.expect(p).to.have.property("version"); });
});
```

Chi tiết script ChatGPT đã chạy: xem [`prompt-guide.md`](./prompt-guide.md) §10.1.

---

### 4.3 `03 POST /products` — no Authorization → 401

| Field | Nội dung |
| --- | --- |
| Status / body thực tế | `401`, `{"error":"Unauthorized"}` (~10 ms) |
| Số `pm.test` Postbot sinh | 5 |
| Chạy lại | **5/5 PASS** |
| Đã chỉnh tay? | **Không** |
| Evidence | `r3.png` |

**Nhận xét:** Tương tự 01; có thêm assert “JSON body”. Chất lượng tốt cho negative auth trên POST.

---

### 4.4 `04 POST /products` — body hợp lệ → 201

| Field | Nội dung |
| --- | --- |
| Status / body thực tế | `201 Created` (~344 ms) |
| Số `pm.test` Postbot sinh | 7 (+ giữ logic lưu `createdProductId` có sẵn) |
| Chạy lại | **7/7 PASS** |
| Đã chỉnh tay trên script Postbot? | **Không** — giữ bản Postbot cho evidence |
| Evidence Postbot | `r4.png` |
| Đối chiếu Prompt Guide | ChatGPT mục 4 (`r4_chatgpt.png`, **9/9 PASS**): echo field bằng `JSON.parse(pm.request.body.raw)` thay vì hard-code tên — bền hơn khi đổi payload |

**Điểm mạnh Postbot:** assert echo `type` / `name` / `version` khớp body; *giữ* logic set `createdProductId` có sẵn (điểm cộng lớn).

**Rủi ro nhỏ:** hard-code `"Postbot Test Card"` trong assert — đổi body thì phải sửa test (ChatGPT đã tránh được bằng cách đọc từ request body).

---

### 4.5 `05 POST /products` — thiếu type/name → 400

| Field | Nội dung |
| --- | --- |
| Status / body thực tế | `400`, `message: "type and name are required"` |
| Số `pm.test` Postbot sinh | 3 |
| Chạy lại | **3/3 PASS** |
| Đã chỉnh tay? | **Không** |
| Evidence | `r5.png` |

**Script đủ:** status 400 + đúng message + Content-Type JSON. Đây là case negative validation tốt nhất trong bộ thử.

---

### 4.6 `06 PUT /product/:id` — id tồn tại → 200

| Field | Nội dung |
| --- | --- |
| Status / body thực tế | `200 OK` (~4 ms) |
| Số `pm.test` Postbot sinh | 7 |
| Chạy lại | **7/7 PASS** |
| Đã chỉnh tay? | **Tuỳ chọn** — hard-code `name`/`version` theo body hiện tại; có thể đọc từ `pm.request.body` để bền hơn |
| Evidence | `r6.png` |

**Nhận xét:** Postbot hiểu context update (assert `"Updated By Postbot"`, `"v2"`). Phù hợp demo; kém bền nếu đổi payload.

---

### 4.7 `07 PUT /product/:id` — id không tồn tại → 404

| Field | Nội dung |
| --- | --- |
| Status / body thực tế | `404`, `{"message":"Product not found"}` |
| Số `pm.test` Postbot sinh | 4 |
| Chạy lại | **4/4 PASS** |
| Đã chỉnh tay? | **Không** |
| Evidence | `r7.png` |

---

### 4.8 `08 DELETE /product/:id` — id vừa tạo → 204 — FAIL

| Field | Nội dung |
| --- | --- |
| Status / body thực tế | **`404 Not Found`**, `{"message":"Product not found"}` (kỳ vọng 204) |
| Số `pm.test` Postbot sinh | 2 assert + đoạn `unset('createdProductId')` |
| Chạy lại | **0/2 FAIL** |
| Đã chỉnh tay? | **Có — bắt buộc sửa quy trình / bổ sung guard**, không phải sửa sai status kỳ vọng |
| Evidence | `r8.png` |

**Script Postbot sinh (ý chính):** assert 204; body rỗng; nếu 204 thì `pm.collectionVariables.unset("createdProductId")`.

**Root cause (human review):**

1. Request 08 phụ thuộc `{{createdProductId}}` do **04** set sau khi POST thành công.
2. Khi chạy 08 mà biến trống / id cũ đã bị xoá / không chạy lại 04 ngay trước đó → Provider trả 404 → cả 2 assert fail.
3. Script assertion *đúng với hợp đồng 204*; lỗi nằm ở **state & thứ tự chạy**, không phải Postbot “đoán sai status”.

**Việc cần làm (sửa tay / bổ sung):**

1. Trước mỗi lần verify 08: **Send 04** → kiểm tra Variables có `createdProductId` → **Send 08**.
2. Thêm Pre-request guard (khuyến nghị):

```javascript
const id = pm.collectionVariables.get("createdProductId");
if (!id) {
    throw new Error("createdProductId trống — hãy chạy request 04 POST trước.");
}
```

3. (Tuỳ chọn) Không `unset` ngay trong 08 nếu muốn debug chuỗi fail; hoặc unset chỉ khi đã assert 204 pass.

---

### 4.9 `09 DELETE /product/:id` — id không tồn tại → 404

| Field | Nội dung |
| --- | --- |
| Status / body thực tế | `404`, `{"message":"Product not found"}` |
| Số `pm.test` Postbot sinh | 3 |
| Chạy lại | **3/3 PASS** |
| Đã chỉnh tay? | **Không** |
| Evidence | `r9.png` |

---

## 5. Phân tích chất lượng script được sinh

| Tiêu chí | Kết quả | Ghi chú |
| --- | :-: | --- |
| Assert status code | Có | Đúng trên 8/9 case; 08 fail do state |
| Assert response time | Có | Thường `< 2000ms` hoặc `< 3000ms` |
| Assert kiểu dữ liệu field | Có | Array/JSON/property trên GET/POST/PUT |
| Assert giá trị / enum hợp lệ | Có | Echo body (04, 06); message lỗi (05, 07, 09) |
| Negative / auth (401, 400, 404) | Có | 01, 03, 05, 07, 09 chất lượng tốt |
| Boundary / equivalence | Không | Postbot không tự sinh BVA/EP |
| Security (mass assignment, header…) | Không | Không cover ngoài thiếu Bearer |
| Tái sử dụng biến env / collection | Một phần | 04 giữ `createdProductId`; 08 cleanup — nhưng dễ gãy nếu chạy lẻ |
| Phù hợp chạy Newman/CI | Một phần | Cần giữ thứ tự 04→08 + guard; chỉnh 02 (version) trước khi đưa CI |

**Nhận xét tổng hợp:**

> Postbot rất mạnh khi đã có **response thật** và tên request mô tả rõ kỳ vọng (401/400/404/201): sinh nhanh status + message + vài field assert, thường Pass ngay. Với happy path (02, 04, 06) script “đủ dùng demo” nhưng có xu hướng **hard-code** và **siết schema** (`version` mọi phần tử). Điểm yếu rõ nhất là **chuỗi phụ thuộc biến** (08): AI hiểu pairing 04→08 nhưng không đảm bảo state khi người dùng chạy lẻ — cần human + Pre-request guard. Boundary/security/Pact **không** nằm trong phạm vi Postbot với prompt một dòng.

**Ước lượng chỉnh tay trước khi vào CI:** ~15–25% (chủ yếu 02 với `version`, 08 thêm guard + quy ước Runner order). Không cần viết lại phần lớn script negative.

---

## 6. Ưu điểm / Nhược điểm / Giới hạn

### Ưu điểm

- Sinh assertion khớp response/error message thực tế chỉ với prompt một dòng.
- Nhận context từ tên request (`no Authorization → 401`, `thiếu type/name → 400`).
- Giữ được logic tay có sẵn (04 — `createdProductId`).
- Phù hợp bootstrap smoke / demo seminar trong vài phút.

### Nhược điểm

- Không sinh BVA, equivalence, mass-assignment, hay bộ data-driven.
- Hard-code giá trị body → dễ vỡ khi đổi payload.
- Assert schema có thể chặt hơn hợp đồng thật (`version` trên mọi product).
- Case có side-effect / biến chain (DELETE theo id tạo) dễ FAIL nếu chạy sai thứ tự.

### Giới hạn thực tiễn

- Phụ thuộc response vừa Send — không thay thế thiết kế test từ OpenAPI/spec.
- Không sinh Pact consumer/provider.
- Cần human review trước Newman/CI; không “một phát là xong” cho toàn bộ quality gate.

---

## 7. So sánh nhanh với viết tay và ChatGPT/Claude

*Cột ChatGPT bên dưới đã được **đối chiếu thực nghiệm W07** trên cùng request 02/04 (xem mục 10), không chỉ lý thuyết.*

| Tiêu chí | Postbot | Viết tay | ChatGPT + Prompt Guide (đã chạy W07) |
| --- | --- | --- | --- |
| Tốc độ có test cơ bản | Rất nhanh (giây, trong UI) | Chậm | Trung bình (copy prompt → dán Postman) |
| Độ bao phủ kỹ thuật test | Status/body/message; schema đôi khi siết quá | Tuỳ người viết | Cao hơn trên 02/04 (Content-Type, kiểu field, echo từ request); BVA/Pact chưa chạy ở W07 |
| Kiểm soát assertion | Trung bình (hay hard-code giá trị) | Cao | Cao — chỉnh được trong prompt; 04 đọc `pm.request.body` |
| Phù hợp học viên mới | Cao — học trong UI Postman | Trung bình | Cao nếu có template (`prompt-guide.md`) |
| Phản biện false-negative | Không | Có | Có (mục 7 → `r2_chatgpt_ai_review.md`) |
| Phù hợp contract / Pact | Thấp | Trung bình–cao | Template mục 6 sẵn; W07 chưa chạy thử |

---

## 8. Kết luận & khuyến nghị

**Kết luận ngắn:**

> Postbot **đủ thực tiễn** để bootstrap và demo sinh test Postman trên API mẫu của nhóm (8/9 case Pass ngay với prompt `Add tests to this request`). Tuy nhiên **chưa đủ** để là nguồn test duy nhất cho CI: cần human review schema, bổ sung guard cho chuỗi tạo–xoá, và dùng ChatGPT/Claude (Prompt Guide) / viết tay cho chỉnh assertion + BVA–security–Pact. Đối chiếu cùng ngày trên request 02/04 (mục 10) **xác nhận** Prompt Guide kiểm soát schema/`version` và hard-code tốt hơn Postbot.

**Khuyến nghị sử dụng:**

| Tình huống | Nên dùng |
| --- | --- |
| Bootstrap nhanh happy-path / negative status–message | Postbot → review tay |
| Chỉnh schema (`version`), biến chain, Newman order | Sửa tay (như mục 4.2, 4.8) |
| Negative nâng cao / BVA / security / data-driven | ChatGPT/Claude + [`prompt-guide.md`](./prompt-guide.md) |
| Contract testing (Pact) | Prompt Guide / viết tay — không dựa Postbot |
| Demo seminar | Có — chạy live 01+05 (PASS rõ) và nêu case 08 (giới hạn state) |

**Việc sửa tay / đối chiếu (checklist thao tác):**

- [x] Request **02**: đã có bản nới `version` qua ChatGPT + Prompt Guide (`r2_chatgpt.png`) — **không** ghi đè script Postbot gốc trên `r2.png` (giữ để minh chứng giới hạn AI)
- [ ] Request **08**: vẫn cần chạy lại theo thứ tự **04 → 08** (+ Pre-request guard) nếu muốn evidence PASS; hiện evidence W07 vẫn là FAIL có chủ đích (`r8.png`)
- [x] Request 01, 03, 05, 07, 09: giữ script Postbot
- [x] Request 04, 06: Postbot giữ cho smoke; 04 có thêm bản ChatGPT bền hơn (`r4_chatgpt.png`)

**Checklist hoàn thiện tài liệu này**

- [x] Đã thử ≥ 3 request (đủ 9, gồm nhiều negative)
- [x] Đã dán / mô tả script gốc + ghi rõ phần chỉnh tay / đối chiếu Prompt Guide
- [x] Đã chụp ảnh minh chứng (mục 9)
- [x] Đã điền kết luận & khuyến nghị
- [x] Đã cập nhật link Evidence trong `docs/reports/week07/Group3.md`
- [x] Đã đối chiếu thực nghiệm với Prompt Guide (mục 10)

---

## 9. Ảnh minh chứng (Postbot)

| File | Mô tả |
| --- | --- |
| `r1.png` | 01 — Postbot 4 test, 4/4 PASS (401) |
| `r2.png` | 02 — Postbot 4 test, 4/4 PASS (200 array; siết `version` mọi phần tử) |
| `r3.png` | 03 — Postbot 5 test, 5/5 PASS (401) |
| `r4.png` | 04 — Postbot 7 test + giữ `createdProductId`, 7/7 PASS (201) |
| `r5.png` | 05 — Postbot 3 test, 3/3 PASS (400) |
| `r6.png` | 06 — Postbot 7 test, 7/7 PASS (200) |
| `r7.png` | 07 — Postbot 4 test, 4/4 PASS (404) |
| `r8.png` | 08 — Postbot assert 204 nhưng thực tế 404, 0/2 FAIL |
| `r9.png` | 09 — Postbot 3 test, 3/3 PASS (404) |

---

## 10. Đối chiếu sau khi chạy Prompt Guide (cùng ngày)

Cùng bộ request **02** và **04**, đã chạy thêm ChatGPT theo [`prompt-guide.md`](./prompt-guide.md) để kiểm chứng khuyến nghị ở mục 7–8:

| Request | Evidence Postbot | Evidence ChatGPT | Khác biệt chính đã quan sát |
| --- | --- | --- | --- |
| 02 GET | `r2.png` (4/4 PASS) | `r2_chatgpt.png` (PASS) + review [`r2_chatgpt_ai_review.md`](./r2_chatgpt_ai_review.md) | ChatGPT: Content-Type + kiểu string; `version` chỉ cho seed — khớp human review mục 4.2 |
| 04 POST | `r4.png` (7/7 PASS) | `r4_chatgpt.png` (9/9 PASS) | Cả hai đều lưu `createdProductId`; ChatGPT echo field từ request body (ít hard-code hơn) |

**Cập nhật kết luận sau đối chiếu:** khuyến nghị “Postbot bootstrap → Prompt Guide review/chỉnh” **đã được xác nhận bằng evidence**, không chỉ là giả định. Postbot vẫn là công cụ demo/bootstrap hợp lệ; Prompt Guide là lớp kiểm soát chất lượng assertion trước CI.

---

## Tham chiếu

- Smoke test W06: `docs/reports/week06/evidences/TuanAnh/smoke-test-auth.md`
- Collection thử nghiệm: [`w07-postbot-testing.postman_collection.json`](./w07-postbot-testing.postman_collection.json)
- Seminar scope (E2.2 Postbot): `docs/reports/week04/evidences/Output documents/QuocTan/Seminar_Scope.md`
- Postman docs: [About Postbot](https://learning.postman.com/docs/getting-started/basics/about-postbot/)
- Pair deliverable: [`prompt-guide.md`](./prompt-guide.md) (§10–11)
