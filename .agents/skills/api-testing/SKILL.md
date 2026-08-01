---
name: api-testing
description: >
  Sinh bộ kiểm thử API hoàn chỉnh (Postman Collection data-driven + data files + lệnh Newman)
  từ một đặc tả API bất kỳ (OpenAPI/Swagger, Markdown, hoặc mô tả endpoint). Skill áp dụng
  quy ước của Nhóm 3 - SEBros: tách Happy Path/Negative theo HTTP method, 6 loại test case,
  kỳ vọng nằm trong data file, auth sinh tự động bằng Pre-request Script. Dùng khi cần tạo
  mới hoặc mở rộng test suite API, hoặc chứng minh tính tái sử dụng trên một API khác.
---

# API Testing Suite Generator

## Mục đích

Sinh ra một bộ kiểm thử API **chạy được ngay** từ đặc tả API, gồm ba thành phần:

1. **Postman Collection** (data-driven) — cấu trúc thư mục, request, script.
2. **Data files** (`.json` + `.csv`) — mỗi dòng là một test case.
3. **Lệnh Newman** — để chạy trong CI/CD.

Skill này **không gắn với API cụ thể nào**. Product Service của nhóm chỉ là bản tham chiếu.
Toàn bộ quy ước dưới đây áp dụng được cho API bất kỳ — đó là cơ sở của tuyên bố tái sử dụng
trong đồ án.

## Khi nào sử dụng

- Có đặc tả API mới, cần dựng bộ test từ đầu.
- Cần bổ sung test case cho endpoint mới vào collection đã có.
- Cần chứng minh tính tái sử dụng bằng cách chạy trên một API khác (ví dụ Swagger PetStore).
- Cần rà soát bộ test hiện có xem đã phủ đủ 6 loại test case chưa.

**Không dùng skill này khi:** cần kiểm tra tính tương thích giữa hai service — đó là việc của
skill `contract-testing`.

## Đầu vào bắt buộc

Trước khi sinh bất cứ file nào, phải có đủ các thông tin sau. Nếu thiếu, **hỏi gộp một lần**,
không tự suy đoán:

| Thông tin | Ví dụ | Vì sao cần |
| --- | --- | --- |
| Nguồn đặc tả | URL OpenAPI, file `.yaml`, hoặc bảng endpoint | Nguồn sự thật để sinh test |
| Base URL | `http://localhost:8080` | Đưa vào environment |
| Cơ chế auth | Bearer ISO-8601 / API key header / OAuth2 / không có | Quyết định Pre-request Script |
| Endpoint cần phủ | 5 endpoint CRUD, hoặc "toàn bộ" | Phạm vi |
| Dữ liệu mẫu có sẵn | id nào chắc chắn tồn tại | Cần cho Happy Path |
| Ràng buộc validation | trường bắt buộc, kiểu, độ dài | Cần cho nhóm Validation |

**Cảnh báo quan trọng:** nếu API đích là **sandbox công cộng dùng chung** (Swagger PetStore,
ReqRes, JSONPlaceholder), phải xác minh trước ba điều và báo lại cho người dùng:

- **Auth có được thực thi thật không?** Nhiều sandbox khai báo `api_key` trong spec nhưng
  chấp nhận mọi request. Khi đó nhóm test case Authentication kỳ vọng `401` sẽ **fail** —
  không phải do test sai mà do API không thực thi.
- **Validation có được thực thi không?** Nhiều sandbox trả `200` cho body thiếu trường bắt
  buộc thay vì `400`.
- **Dữ liệu có bị người khác sửa không?** Sandbox dùng chung không bảo đảm test isolation;
  bản ghi bạn tạo có thể bị người khác xóa giữa chừng, khiến test fail ngẫu nhiên.

Nếu gặp các trường hợp trên, **ghi rõ trong báo cáo là giới hạn của API đích**, và điều chỉnh
kỳ vọng theo hành vi thực tế đã kiểm chứng — tuyệt đối không sửa test cho "xanh" mà không
giải thích.

## Quy trình 6 bước

### Bước 1 — Phân tích đặc tả

Lập bảng endpoint. Với mỗi endpoint, liệt kê **mọi** status code có thể xảy ra:

| Method | Path | Success | Error |
| --- | --- | --- | --- |
| `GET` | `/products` | 200 + array | 401 |
| `GET` | `/product/:id` | 200 + object | 401, 404 |
| `POST` | `/products` | 201 + created | 400, 401 |

Bảng này là **bản đồ sinh test case**: mỗi ô trong hai cột cuối tương ứng ít nhất một test case.

### Bước 2 — Sinh test case theo 6 nhóm

Với **mỗi** endpoint, duyệt đủ 6 nhóm dưới đây. Nhóm nào không áp dụng thì ghi rõ lý do,
không im lặng bỏ qua.

| Nhóm | Mô tả | Ví dụ |
| --- | --- | --- |
| **Happy Path** | Request hợp lệ, response đúng đặc tả | `GET /product/10` + token hợp lệ → 200 |
| **Negative** | Input sai, hệ thống xử lý lỗi đúng | `GET /product/99999` → 404 |
| **Authentication** | Thiếu / sai / hết hạn token → 401 | Không gửi header `Authorization` |
| **Validation** | Body thiếu trường hoặc sai kiểu → 400 | `POST` thiếu `name` → 400 |
| **Schema** | Response đúng cấu trúc kỳ vọng | Body có đủ `id`, `type`, `name`, `version` |
| **Boundary** | Giá trị biên | Token đúng tròn 1 giờ trước |

Áp dụng ba kỹ thuật khi chọn giá trị:

- **Domain Partitioning** — chia miền đầu vào thành các lớp cho cùng hành vi, mỗi lớp lấy một
  đại diện. Không test 1000 id hợp lệ; test một id hợp lệ, một id không tồn tại, một id sai định dạng.
- **Boundary Value Analysis** — thêm giá trị tại rìa và sát rìa mỗi lớp.
- **State Transition** — khi kết quả phụ thuộc thứ tự thao tác: tạo → xóa → GET lại phải ra 404.

### Bước 3 — Sinh data files

Một data file cho mỗi endpoint. Sinh **cả `.json` và `.csv`** với nội dung tương đương.

Schema bắt buộc của mỗi phần tử:

```json
{
  "tc_id": "GET_BY_ID_01",
  "description": "Happy path — id=10 (28 Degrees) tồn tại",
  "product_id": "10",
  "auth_header": "{{validToken}}",
  "expected_status": 200,
  "expect_field_id": "10",
  "expect_field_name": "28 Degrees"
}
```

Quy tắc bất di bất dịch:

- **`tc_id` và `description` là bắt buộc.** Khi một iteration fail, Newman chỉ báo "iteration 7";
  không có hai trường này thì không dò ngược được.
- **Kỳ vọng nằm trong data, không nằm trong script.** Script chỉ có một câu
  `pm.response.to.have.status(Number(pm.iterationData.get("expected_status")))`, dùng chung cho
  cả case kỳ vọng 200 lẫn 404.
- **`tc_id` đặt theo mẫu `{METHOD}_{RESOURCE}_{NN}`**, đánh số liên tục trong cùng file.
- Trường kỳ vọng tùy chọn đặt tiền tố `expect_`: `expect_field_*`, `expect_error_field`,
  `expect_message_field`.

### Bước 4 — Sinh Collection

Cấu trúc thư mục bắt buộc:

```
{API Name} — Data Driven Tests
├── _Setup (Pre-flight)        ← sinh token / dữ liệu nền
├── GET — Happy Path
├── GET — Negative
├── POST — Happy Path
├── POST — Negative
├── PUT — Happy Path
├── PUT — Negative
├── DELETE — Happy Path
└── DELETE — Negative
```

Ba nguyên tắc:

1. `_Setup` có dấu gạch dưới đầu tên để luôn nằm trên cùng khi sắp xếp.
2. Nhóm theo HTTP method.
3. **Tách Happy Path và Negative thành thư mục riêng** — hai nhóm dùng bộ dữ liệu khác nhau và
   khi đọc báo cáo lỗi biết ngay lỗi thuộc loại nào.

Thứ tự chạy: đặt `DELETE — Happy Path` **cuối cùng** nếu nó xóa dữ liệu seed, và ghi chú rằng
cần restart provider để reset.

### Bước 5 — Sinh script

**Pre-request Script đặt ở cấp Collection** (chạy trước mọi request), xử lý auth tập trung:

```javascript
// Sinh token hợp lệ cho mọi iteration
pm.collectionVariables.set("validToken", "Bearer " + new Date().toISOString());

// Map auth_header từ data file sang header thật
const raw = pm.iterationData.get("auth_header");
if (raw === "" || raw === null || raw === undefined) {
    pm.request.headers.remove("Authorization");          // case: không gửi token
} else if (raw === "{{validToken}}") {
    pm.request.headers.upsert({
        key: "Authorization",
        value: pm.collectionVariables.get("validToken")  // case: token hợp lệ
    });
} else {
    pm.request.headers.upsert({ key: "Authorization", value: raw }); // case: token hết hạn/sai
}
```

Cơ chế này phục vụ cả ba tình huống xác thực bằng **một** đoạn code. Nếu API đích dùng cơ chế
khác (API key tĩnh, OAuth2), thay phần sinh token nhưng **giữ nguyên ba nhánh xử lý**.

Lưu ý Newman: biến `{{validToken}}` là **collection variable**, Newman không tự resolve nó
trong data file. Pre-request Script phải tự replace vào header như trên thì mới chạy đúng
cả trên GUI lẫn CLI.

**Test Script** ở cấp request, đọc kỳ vọng từ data:

```javascript
const expected = Number(pm.iterationData.get("expected_status"));
const tcId = pm.iterationData.get("tc_id");

pm.test(`[${tcId}] Status is ${expected}`, () => {
    pm.response.to.have.status(expected);
});

if (expected === 200 || expected === 201) {
    pm.test(`[${tcId}] Response has required schema fields`, () => {
        const json = pm.response.json();
        ["id", "type", "name", "version"].forEach((f) =>
            pm.expect(json).to.have.property(f)
        );
    });
}
```

Hai quy tắc viết assertion:

- **Nhúng `tc_id` vào tên test** — tên test hiện nguyên văn trong báo cáo Newman.
- **Tách nhiều `pm.test` nhỏ** thay vì gộp một khối lớn, để biết chính xác điều kiện nào hỏng.

### Bước 6 — Sinh lệnh Newman và tài liệu

```bash
newman run <collection>.json \
  -e <environment>.json \
  -d <data-file>.json \
  --folder "GET — Happy Path" \
  --reporters cli,htmlextra,json \
  --reporter-htmlextra-export report.html \
  --reporter-json-export report.json
```

Kèm theo **bảng mapping folder → data file → số iterations**, vì Postman và Newman cần chỉ
đúng data file cho từng folder.

Trong CI, luôn có:

- **Readiness probe** — gọi `/health` tới khi service trả lời, **trước** khi chạy Newman. Thiếu
  bước này pipeline sẽ flaky.
- **`if: always()`** khi upload report — cần báo cáo nhất là lúc test fail.
- Newman trả **mã thoát khác 0** khi có test fail; đó là cách CI biết build hỏng.

## Đầu ra và vị trí file

```
src/postman/
├── collections/{api-name}-data-driven.postman_collection.json
├── environments/{env}.postman_environment.json
└── data/{method}-{resource}.data.json  (+ .csv)
src/newman/run-newman.ps1  |  run-newman.sh
```

Khi chạy trên API khác (demo tái sử dụng), đặt trong thư mục riêng để không lẫn với bộ test
gốc, ví dụ `src/postman/petstore/`.

## Checklist nghiệm thu

- [ ] Mỗi endpoint đã duyệt đủ 6 nhóm test case, nhóm bỏ qua có ghi lý do.
- [ ] Mọi phần tử data file có `tc_id` và `description`.
- [ ] Kỳ vọng nằm trong data file, không hardcode trong script.
- [ ] Có cả `.json` và `.csv`, nội dung tương đương.
- [ ] Collection tách Happy Path / Negative theo method.
- [ ] Pre-request Script xử lý đủ ba nhánh auth (hợp lệ / hết hạn / không có).
- [ ] Tên mỗi `pm.test` có nhúng `tc_id`.
- [ ] Có bảng mapping folder → data file → iterations.
- [ ] Lệnh Newman chạy được và trả mã thoát đúng.
- [ ] Đã ghi chú các endpoint có tác dụng phụ (DELETE) và cách reset dữ liệu.
- [ ] Nếu API đích là sandbox công cộng: đã kiểm chứng và ghi rõ auth/validation có được thực thi không.

## Cạm bẫy thường gặp

| Cạm bẫy | Hậu quả | Cách tránh |
| --- | --- | --- |
| Chỉ viết Happy Path | Bộ test gần như vô dụng | Tỉ lệ negative phải cao hơn happy path |
| Hardcode kỳ vọng trong script | Không mở rộng được bằng data | Đọc từ `pm.iterationData` |
| Thiếu `tc_id` | Không dò được iteration nào fail | Bắt buộc từ đầu |
| Chỉ assert status code | Bỏ lọt lỗi đổi tên trường | Luôn có nhóm Schema |
| Gộp mọi assertion vào một `pm.test` | Chỉ biết "có gì đó sai" | Tách nhiều test nhỏ |
| Chạy DELETE giữa chừng | Các test sau fail dây chuyền | Đặt DELETE cuối, ghi chú reset |
| Không có readiness probe trong CI | Pipeline flaky ngẫu nhiên | Chờ `/health` trước khi chạy |
| Sửa kỳ vọng cho test "xanh" | Che giấu lỗi thật của API | Ghi nhận là giới hạn của API, giải thích rõ |

## Bản tham chiếu

Bộ test Product Service của nhóm là bản hiện thực đầy đủ các quy ước trên:

- Collection: `src/postman/collections/product-service-data-driven.postman_collection.json`
- Data files: `src/postman/data/` — 29 test case, 5 endpoint, 9 folder
- Runner: `src/newman/run-newman.ps1`, `run-newman.sh`
- Hướng dẫn và bảng mapping: `src/postman/README.md`
- CI: `.github/workflows/newman-api-test.yml`

Lý thuyết nền: slide `docs/slides/pages/2.api_testing/` (2.2 API basics, 2.3 authentication,
2.4 test design, 2.5–2.8 Postman) và `docs/slides/pages/3.automation_cicd/` (3.2 Newman,
3.3 CI pipeline).
