# Video 3 — Demo thực hành tổng hợp

**Phiên bản:** 1.0
**Ngày cập nhật:** 31/07/2026
**Người soạn:** 23127211 — Nguyễn Lê Hồ Anh Khoa
**Thời lượng mục tiêu:** 28–32 phút (có chapter marker)
**Đối tượng:** Sinh viên đã xem Video 1 (lý thuyết) và Video 2 (cài đặt môi trường)

## Mục lục

- [1. Mục tiêu và luồng demo](#1-mục-tiêu-và-luồng-demo)
- [2. Chuẩn bị trước khi quay](#2-chuẩn-bị-trước-khi-quay)
- [3. Timeline tổng quan](#3-timeline-tổng-quan)
- [4. Phần 1 — Postman: Collection, Script, Collection Runner](#4-phần-1--postman-collection-script-collection-runner)
- [5. Phần 2 — Newman và CI/CD](#5-phần-2--newman-và-cicd)
- [6. Phần 3 — Pact: Consumer và Provider](#6-phần-3--pact-consumer-và-provider)
- [7. Phần 4 — Breaking Change Simulation](#7-phần-4--breaking-change-simulation)
- [8. Phần 5 — Agent Skill trên PetStore API](#8-phần-5--agent-skill-trên-petstore-api)
- [9. Bảng chứng minh Reusability](#9-bảng-chứng-minh-reusability)
- [10. Bảng kiểm kết thúc video](#10-bảng-kiểm-kết-thúc-video)
- [11. Xử lý sự cố khi quay](#11-xử-lý-sự-cố-khi-quay)
- [12. Tài liệu tham khảo](#12-tài-liệu-tham-khảo)

## 1. Mục tiêu và luồng demo

Video này cho người xem thấy **toàn bộ lý thuyết ở Video 1 chạy thật**. Không giảng lại khái
niệm; mỗi khi chạm tới một thuật ngữ, chỉ nhắc một câu rồi trỏ về Video 1.

Luồng năm phần, có quan hệ nhân quả với nhau:

```text
Phần 1  Postman        → xây và chạy test bằng giao diện
Phần 2  Newman + CI    → cùng bộ test đó chạy không cần giao diện, rồi chạy trên GitHub
Phần 3  Pact           → lớp bảo vệ thứ hai: contract giữa Consumer và Provider
Phần 4  Breaking change→ chứng minh contract bắt được lỗi mà functional test bỏ lọt
Phần 5  Agent Skill    → sinh lại toàn bộ Phần 1 cho một API khác, chứng minh tái sử dụng
```

Sau video, người xem có thể tự chạy lại từng bước bằng đúng các lệnh được chiếu.

### Thông điệp chính của mỗi phần

| Phần | Thông điệp người xem phải nhớ |
| --- | --- |
| 1 | Kỳ vọng nằm trong data file, nên thêm test case không cần viết code |
| 2 | Newman trả mã thoát khác 0 → đó là cách CI biết build hỏng |
| 3 | Consumer test và Provider verification chạy độc lập, không bên nào cần bên kia khởi động |
| 4 | HTTP 200 vẫn có thể là breaking change; functional test có thể không thấy, contract test thấy theo thiết kế |
| 5 | Phần tái sử dụng được là quy trình và công cụ, không phải dữ liệu test |

## 2. Chuẩn bị trước khi quay

### 2.1. Bắt buộc chạy thử trọn vẹn một lượt (dry run)

Demo hỏng giữa buổi quay rất tốn thời gian. Chạy hết mục 4 đến mục 8 **một lượt trước khi
bật ghi hình**, rồi mới quay lại từ đầu.

### 2.2. Ba cạm bẫy kỹ thuật phải biết trước

Đây là ba lỗi chắc chắn xảy ra nếu không chuẩn bị.

#### Cạm bẫy 1 — Xung đột cổng 8080 giữa Phần 2 và Phần 3

File `provider/product/product.pact.test.js` **tự khởi động server trên cổng 8080** ngay khi
nạp module:

```javascript
const server = createApp().listen("8080");
```

Nếu Provider đang chạy sẵn từ Phần 1 và Phần 2, lệnh provider verification sẽ fail với
`EADDRINUSE`. **Bắt buộc dừng Provider thủ công (Ctrl+C) trước khi sang Phần 3.**

Ghi vào kịch bản như một bước có chủ đích, và nói thành lời — đây là chi tiết hữu ích cho
người xem, không phải sự cố.

#### Cạm bẫy 2 — Test DELETE làm hỏng dữ liệu cho các test sau

Folder `DELETE — Happy Path` xóa vĩnh viễn sản phẩm `id = 11` khỏi bộ nhớ. Provider lưu dữ
liệu **in-memory**, nên cách reset duy nhất là restart.

Quy tắc khi quay: **chạy từng folder kèm đúng data file của nó**, và restart Provider trước
mỗi nhóm mới. Không chạy cả collection một lượt rồi mong 100% pass.

#### Cạm bẫy 3 — PetStore là sandbox công cộng

Trước khi quay Phần 5, phải tự kiểm chứng ba điều và ghi lại kết quả thật:

- Auth có được thực thi không? (nhiều khả năng là **không**)
- Validation có được thực thi không? (nhiều khả năng là **không**)
- Dữ liệu có bị người khác sửa không?

Kết quả kiểm chứng quyết định lời thoại ở Phần 5. **Không được sửa kỳ vọng cho test xanh** —
xem mục 8.4.

### 2.3. Trạng thái khởi điểm

```powershell
# Terminal 1 — Provider
cd src\sample-api\pact-workshop-js\provider
node server.js          # http://localhost:8080

# Terminal 2 — kiểm tra Provider sẵn sàng (endpoint /health là public, không cần token)
curl http://localhost:8080/health
```

Chuẩn bị sẵn:

- Postman Desktop đã import collection và environment (làm ở Video 2, không quay lại).
- VS Code mở repo, font size đủ lớn để đọc trên máy chiếu.
- Xóa sạch `src/newman/output/reports/` để thư mục kết quả trông gọn.
- Tab trình duyệt mở sẵn trang GitHub Actions của repo.
- Nếu dùng PactFlow: đã cấu hình `src/.env`, và **che token** khi quay.

### 2.4. Quy ước quay

- Terminal cỡ chữ lớn, nền tối, chỉ hiện thư mục hiện tại trong prompt.
- Mọi lệnh **gõ thật**, không dán, để người xem theo kịp — trừ lệnh dài quá 3 dòng thì dán.
- Đoạn chờ test chạy: giữ nguyên hình, **tăng tốc 2x–4x khi dựng** và chèn chữ "đang chạy".
- Không tua qua thông báo lỗi. Lỗi là nội dung có giá trị nhất của video demo.

## 3. Timeline tổng quan

|   Thời gian | Chương | Nội dung | Chapter marker |
| ----------: | ------ | -------- | -------------- |
| 00:00–01:10 | Mở đầu | Giới thiệu luồng 5 phần | Mở đầu |
| 01:10–02:20 | Setup | Khởi động Provider, health check | Chuẩn bị |
| 02:20–08:00 | Phần 1 | Postman: cấu trúc, script, Collection Runner | 1. Postman |
| 08:00–13:20 | Phần 2 | Newman CLI, HTML report, exit code, GitHub Actions | 2. Newman & CI/CD |
| 13:20–19:30 | Phần 3 | Consumer pact → pact.json → Provider verification | 3. Pact |
| 19:30–23:40 | Phần 4 | Breaking change: name → title | 4. Breaking Change |
| 23:40–30:10 | Phần 5 | Agent Skill sinh test cho PetStore | 5. Agent Skill |
| 30:10–31:20 | Kết | Bảng reusability, tổng kết | Tổng kết |

## 4. Phần 1 — Postman: Collection, Script, Collection Runner

### Cảnh 0 — Mở đầu (00:00–01:10)

**Hình ảnh:** title card, sau đó sơ đồ 5 phần.

**Lời thoại**

> Chào các bạn. Đây là video thứ ba, và là video thực hành. Ở Video 1 chúng ta đã đi qua toàn
> bộ lý thuyết; Video 2 đã cài xong môi trường. Hôm nay mình cho tất cả chạy thật.
>
> Luồng demo gồm năm phần, và chúng nối tiếp nhau có chủ đích. Bắt đầu bằng **Postman** — xây
> và chạy test bằng giao diện. Sau đó chuyển sang **Newman** để chạy đúng bộ test đó không cần
> giao diện, rồi đưa lên **GitHub Actions**. Phần ba là **Pact** — lớp bảo vệ thứ hai. Phần bốn,
> mình cố tình tạo ra một **breaking change** để xem lớp nào bắt được, lớp nào bỏ lọt. Và phần
> năm, mình chạy **Agent Skill** để sinh lại toàn bộ bộ test cho một API hoàn toàn khác, nhằm
> chứng minh tính tái sử dụng.
>
> Mình sẽ không giảng lại khái niệm. Chỗ nào cần nhớ định nghĩa, mời các bạn xem lại Video 1.

### Cảnh 1 — Khởi động Provider (01:10–02:20)

**Thao tác**

```powershell
cd src\sample-api\pact-workshop-js\provider
node server.js
```

Terminal thứ hai:

```powershell
curl http://localhost:8080/health
```

**Kết quả mong đợi:** HTTP 200, không cần token.

**Lời thoại**

> Trước hết khởi động Provider — chính là Product Service mình đã giới thiệu ở Video 1. Nó chạy
> ở cổng 8080.
>
> Mình kiểm tra bằng endpoint `/health`. Điểm đáng chú ý: endpoint này được đăng ký **trước**
> middleware xác thực nên nó public, gọi được mà không cần token. Đây chính là **readiness probe**
> mà pipeline CI sẽ dùng để biết service đã sẵn sàng chưa.
>
> Một lưu ý quan trọng: Provider lưu dữ liệu **in-memory**. Nghĩa là mỗi lần restart, dữ liệu
> trở về trạng thái ban đầu. Điều này sẽ có ý nghĩa ở vài phút nữa.

### Cảnh 2 — Cấu trúc Collection (02:20–04:00)

**Thao tác:** mở Postman, mở collection `Product Service — Data Driven Tests`, mở rộng cây thư mục.

**Lời thoại**

> Đây là collection thật của nhóm. Các bạn thấy đúng cấu trúc đã trình bày ở Video 1.
>
> Trên cùng là `_Setup (Pre-flight)` — dấu gạch dưới để nó luôn nằm đầu. Bên dưới nhóm theo HTTP
> method, và trong mỗi method **tách riêng Happy Path với Negative**.
>
> Lý do tách rất thực dụng: hai nhóm này dùng bộ dữ liệu khác nhau, kỳ vọng khác nhau về bản
> chất. Khi đọc báo cáo lỗi, mình biết ngay lỗi thuộc loại nào mà không phải mở từng test.
>
> Tổng cộng 29 test case, phủ 5 endpoint, trong 9 thư mục. Các bạn để ý tỉ lệ: negative nhiều
> hơn happy path. Đó là tỉ lệ lành mạnh, vì số cách để API sai luôn nhiều hơn số cách để nó đúng.

**Chú thích dựng phim:** zoom vào cây thư mục, highlight cặp `GET — Happy Path` / `GET — Negative`.

### Cảnh 3 — Pre-request Script (04:00–05:20)

**Thao tác:** click collection → tab **Scripts** → **Pre-request**.

**Lời thoại**

> Đây là đoạn script chạy **trước mọi request** trong collection, và nó giải quyết toàn bộ bài
> toán xác thực.
>
> Dòng đầu sinh một Bearer token hợp lệ từ thời gian hiện tại, đúng định dạng ISO-8601.
>
> Phần thú vị là ba nhánh bên dưới. Script đọc trường `auth_header` từ data file. Nếu giá trị là
> biến `validToken`, nó gắn token vừa sinh. Nếu là một chuỗi thời gian từ năm 2020, nó dùng
> nguyên — đó là case token hết hạn. Và nếu là chuỗi rỗng, nó **xóa hẳn header đi** — đó là case
> không gửi token.
>
> Một đoạn code, phục vụ cả ba tình huống xác thực. Đây cũng là lý do pipeline CI của nhóm
> không cần khai báo secret nào: token được sinh ngay lúc chạy.

### Cảnh 4 — Test Script (05:20–06:20)

**Thao tác:** mở một request, tab **Scripts** → **Post-response**.

**Lời thoại**

> Và đây là test script. Điểm mấu chốt: nó **không hardcode** kỳ vọng.
>
> Câu đầu đọc `expected_status` từ data file rồi assert. Cùng một dòng code này phục vụ cả test
> kỳ vọng 200 lẫn test kỳ vọng 404 — khác nhau chỉ ở dữ liệu.
>
> Các bạn cũng để ý mình nhúng `tc_id` vào tên test. Tên này hiện nguyên văn trong báo cáo, nên
> khi có lỗi mình biết ngay case nào hỏng mà không phải đếm iteration.
>
> Phía dưới là schema test — kiểm tra response có đủ các trường `id`, `type`, `name`, `version`.
> Hãy nhớ dòng này, vì ở Phần 4 nó sẽ là nhân vật chính.

**Chú thích dựng phim:** khoanh dòng kiểm tra trường `name`, chèn ghi chú "sẽ quay lại ở Phần 4".

### Cảnh 5 — Collection Runner (06:20–08:00)

**Thao tác**

1. Click **Run** trên collection.
2. Chọn riêng folder `GET — Happy Path`.
3. Bật **Data** → chọn `src/postman/data/get-product-by-id.data.json`.
4. Xác nhận Postman tự nhận 7 iterations.
5. Click **Run**.

**Lời thoại**

> Bây giờ chạy bằng Collection Runner. Mình chọn riêng folder `GET — Happy Path` và nạp data file
> tương ứng.
>
> Postman tự đọc file và nhận ra có 7 bộ dữ liệu, tức 7 iteration, tức 7 test case. Đây chính là
> **data-driven testing**: một request, nhiều bộ dữ liệu.
>
> *(sau khi chạy)* Kết quả hiện theo từng iteration. Các bạn thấy tên test có `tc_id` phía trước
> nên đọc rất dễ. Ba case đầu là happy path kỳ vọng 200. Case `GET_BY_ID_04` và `05` kỳ vọng 404 —
> và nó **pass**, vì API trả đúng 404 như mong đợi.
>
> Mình nhắc lại ý ở Video 1: **negative test pass nghĩa là hệ thống báo lỗi đúng cách.** Nó không
> phải test bị fail.
>
> Hai case cuối kỳ vọng 401: một case không gửi token, một case gửi token hết hạn. Cả hai đều pass.
>
> Muốn thêm test case mới? Chỉ cần thêm một phần tử vào file JSON. Không đụng vào code. Đó là giá
> trị lớn nhất của cách tổ chức này.

## 5. Phần 2 — Newman và CI/CD

### Cảnh 6 — Chạy Newman bằng runner script (08:00–10:10)

**Thao tác**

```powershell
powershell -ExecutionPolicy Bypass -File src\newman\run-newman.ps1 `
  -Collection src\postman\collections\product-service-data-driven.postman_collection.json `
  -Data src\postman\data\get-product-by-id.data.json `
  -Folder "GET — Happy Path"
```

**Kết quả mong đợi:** khối `Kiem tra yeu cau he thong` → `Kiem tra Provider API` → bảng kết quả
Newman → dòng `[OK] Tat ca bo kiem thu deu PASSED!` → đường dẫn thư mục báo cáo.

**Lời thoại**

> Giờ chạy đúng bộ test đó nhưng **không mở Postman**. Nhóm có sẵn một runner script.
>
> Script này làm ba việc trước khi chạy test. Một, kiểm tra Newman đã cài chưa. Hai — bước quan
> trọng — **kiểm tra Provider có sống không** bằng cách gọi thật vào `/products` với token tự sinh.
> Nếu Provider chưa chạy, script dừng ngay thay vì để Newman fail hàng loạt với lỗi khó hiểu.
> Ba, tạo thư mục báo cáo theo timestamp.
>
> Script cũng có tính năng **auto-discovery**: nếu không truyền tham số, nó tự quét toàn bộ
> collection trong `src/postman/collections/`. Thêm collection mới sau này không phải sửa script.
> Đây là một điểm sẽ được tính vào phần tái sử dụng ở cuối video.
>
> *(kết quả)* Toàn bộ pass. Và báo cáo đã được xuất ra thư mục có timestamp.

### Cảnh 7 — Đọc HTML report và exit code (10:10–11:40)

**Thao tác**

1. Mở file `src/newman/output/reports/<timestamp>/*-report.html` bằng trình duyệt.
2. Quay lại terminal, chạy:

```powershell
$LASTEXITCODE
```

**Lời thoại**

> Báo cáo HTML do reporter `htmlextra` sinh ra. Nó có tổng quan số test pass/fail, thời gian
> phản hồi từng request, và quan trọng nhất là **chi tiết từng iteration** — bấm vào là thấy
> request đã gửi gì và response trả về gì. Khi debug trong CI, đây là thứ mình đọc đầu tiên.
>
> *(chuyển sang terminal)* Và đây là chi tiết quyết định toàn bộ khả năng tự động hóa: **mã thoát**.
> Bằng 0 nghĩa là mọi test pass. Nếu có test fail, Newman trả về mã khác 0.
>
> Đây chính là cách CI biết phải đánh dấu build là hỏng. Không có gì phức tạp — toàn bộ cơ chế
> chặn của pipeline dựa trên quy ước đơn giản này.

### Cảnh 8 — GitHub Actions (11:40–13:20)

**Thao tác**

1. Mở `.github/workflows/newman-api-test.yml` trong VS Code, cuộn qua các bước.
2. Chuyển sang tab trình duyệt: repo → **Actions** → workflow **Newman API tests** → một lần chạy đã thành công.
3. Mở phần **Artifacts**, chỉ vào file report đã được lưu.

**Lời thoại**

> Bước cuối là đưa lên CI. Workflow này chạy khi có push hoặc pull request vào `main`.
>
> Các bước nối tiếp: checkout, cài Node 20, khởi động Provider, **chờ `/health`** — đúng readiness
> probe mình vừa nói — rồi cài Newman và chạy test.
>
> Bốn cấu hình nhỏ nhưng đáng học. `permissions: contents: read` cấp quyền tối thiểu.
> `timeout-minutes: 10` chặn pipeline treo. `concurrency` với `cancel-in-progress` hủy lần chạy cũ
> khi push liên tiếp. Và `if: always()` ở bước upload — **luôn** lưu báo cáo, kể cả khi test fail,
> vì đó chính là lúc cần đọc nó nhất.
>
> *(trên GitHub)* Đây là một lần chạy thật. Và đây là artifact — file báo cáo tải về được. Người
> review có thể truy ngược: commit nào, chạy test nào, kết quả ra sao.
>
> Xin nhấn mạnh: workflow này **không cần một secret nào**, vì token do pre-request script tự sinh.

## 6. Phần 3 — Pact: Consumer và Provider

### Cảnh 9 — Dừng Provider và giải thích lý do (13:20–14:10)

**Thao tác:** quay về Terminal 1, nhấn `Ctrl+C` để dừng Provider.

**Lời thoại**

> Trước khi sang Pact, mình phải **dừng Provider đang chạy**. Đây không phải thao tác thừa, và
> lý do rất đáng biết.
>
> File provider verification mà lát nữa mình chạy sẽ **tự khởi động một server trên cổng 8080**.
> Nếu Provider cũ còn chạy, cổng đã bị chiếm và test sẽ fail ngay với lỗi `EADDRINUSE`.
>
> Đây là loại lỗi rất hay gặp khi mới làm quen Pact, nên mình để nguyên trong video thay vì cắt đi.

### Cảnh 10 — Consumer test sinh contract (14:10–16:00)

**Thao tác**

```powershell
npm run test:pact --prefix src\sample-api\pact-workshop-js\consumer
```

**Kết quả mong đợi:** Jest chạy `api.pact.spec.js`, toàn bộ test pass, pact file được ghi ra.

**Lời thoại**

> Bắt đầu từ phía Consumer. Lệnh này chạy consumer pact test.
>
> Có một chi tiết nhỏ mà hay: script `pretest:pact` tự xóa sạch thư mục `pacts` trước khi chạy.
> Nhờ vậy contract luôn được sinh mới hoàn toàn, không bị lẫn với bản cũ.
>
> *(trong lúc chạy, mở `consumer/src/api.pact.spec.js`)* Mình mở code để các bạn thấy đúng thứ đã
> giải thích ở Video 1.
>
> Đây là khai báo interaction: `states` là **provider state** — điều kiện tiên quyết, ở đây là
> "product with ID 10 exists". `withRequest` mô tả request. `willRespondWith` mô tả response
> kỳ vọng.
>
> Và đây là phần quan trọng nhất — trong `executeTest`, test khởi tạo `new API(mockService.url)`
> rồi gọi `api.getProduct("10")`. Nghĩa là nó gọi **code client thật của Consumer**, chứ không tự
> dựng một HTTP request bằng tay.
>
> Nếu tự dựng request, file pact sinh ra sẽ mô tả một Consumer **tưởng tượng** — và contract trở
> nên vô giá trị vì nó chứng nhận cho thứ không tồn tại. Đây là lỗi phổ biến nhất khi mới dùng Pact.
>
> Các bạn cũng để ý header `Authorization` dùng **regex matcher**, không so khớp giá trị. Token đổi
> mỗi lần chạy nên chỉ định dạng mới quan trọng.
>
> *(kết quả)* Toàn bộ interaction pass, và pact file đã được ghi ra.

### Cảnh 11 — Giải phẫu pact.json (16:00–17:30)

**Thao tác:** mở `src/sample-api/pact-workshop-js/consumer/pacts/FrontendWebsite-ProductService.json`,
cuộn tới một interaction, sau đó cuộn tới `matchingRules`.

**Lời thoại**

> Đây là contract vừa sinh ra. Tên file cho biết ngay đây là hợp đồng giữa Consumer
> `FrontendWebsite` và Provider `ProductService`.
>
> Mỗi phần tử trong mảng `interactions` gồm: `description`, `providerState`, `request`, và
> `response`. Đúng cấu trúc Given–When–Then mà mình đã trình bày.
>
> *(cuộn tới matchingRules)* Và đây là phần tinh tế nhất — **matching rules**.
>
> Các bạn thấy giá trị `"28 Degrees"` trong body chứ? Nó **không** phải điều kiện Provider phải
> đáp ứng. Nhìn xuống matching rules: trường `name` khai báo khớp theo **kiểu** — chỉ cần là chuỗi
> ký tự, nội dung gì cũng được. Giá trị `"28 Degrees"` chỉ là **dữ liệu ví dụ** để mock provider có
> cái trả về khi chạy consumer test.
>
> Còn header `Authorization` thì khớp theo **regex**, mô tả định dạng Bearer ISO-8601. Bộ contract
> này có 10 interaction, và cả 10 đều có regex matcher cho header đó.
>
> Nguyên tắc chọn độ chặt: **chặt với thứ Consumer thực sự phụ thuộc, lỏng với dữ liệu động.**
> Chặt quá thì khóa tay Provider; lỏng quá thì contract không bắt được lỗi thật.

### Cảnh 12 — Provider verification (17:30–19:30)

**Thao tác**

```powershell
npm run test:pact --prefix src\sample-api\pact-workshop-js\provider
```

**Kết quả mong đợi:** Verifier chạy từng interaction, in danh sách có dấu tick, kết thúc pass.

**Lời thoại**

> Giờ sang phía Provider. Lệnh này chạy verifier.
>
> Và mình nhắc lại điều quan trọng nhất: **verification không hề gọi tới Consumer.** Consumer có
> thể đang tắt, đang được viết lại, hoặc do đội khác quản lý. Thứ duy nhất Provider cần là file pact.
>
> *(mở `provider/product/product.pact.test.js` trong lúc chờ)* Đây là cấu hình. Phần `stateHandlers`
> chính là nơi hiện thực hóa provider state: với mỗi câu mô tả trạng thái, có một hàm dựng đúng dữ
> liệu cần thiết. Ví dụ `"product with ID 10 exists"` sẽ nạp sản phẩm số 10 vào repository.
>
> Đây là thứ làm cho contract test **tái lập được** — không phụ thuộc vào việc cơ sở dữ liệu đang
> chứa gì.
>
> Phần `requestFilter` phía dưới giải quyết một vấn đề thực tế: token trong pact là bản đã ghi lại
> từ lúc sinh contract nên giờ đã hết hạn. Filter thay bằng token tươi. Nhưng để ý dòng đầu — nếu
> request **không có** header `Authorization` thì bỏ qua. Nếu thiếu nhánh này, filter sẽ vô tình
> thêm token vào chính interaction cố ý test trường hợp thiếu token.
>
> Và cuối cùng, cấu hình có **fallback**: nếu không khai báo Broker thì đọc pact từ file cục bộ.
> Nhờ vậy CI chạy được cho pull request từ fork mà không cần secret.
>
> *(kết quả)* Toàn bộ interaction được xác minh. Verifier phát lại từng request vào API thật và
> đối chiếu response — và mọi thứ khớp.

## 7. Phần 4 — Breaking Change Simulation

### Cảnh 13 — Tạo breaking change (19:30–20:40)

**Thao tác:** mở `src/sample-api/pact-workshop-js/provider/product/product.js`, sửa một dòng:

```javascript
class Product {
    constructor(id, type, name, version) {
        this.id = id;
        this.type = type;
        this.title = name;      // <-- ĐỔI: this.name  →  this.title
        this.version = version
    }
}
```

**Lời thoại**

> Bây giờ tới phần thú vị nhất. Mình vào vai đội backend, và mình quyết định đổi tên một trường
> vì thấy tên mới rõ nghĩa hơn.
>
> Đây là class `Product`. Mình đổi `this.name` thành `this.title`. **Đúng một dòng.**
>
> Đặt mình vào vị trí đội backend: thay đổi này trông hoàn toàn vô hại. Không có logic nào sai.
> API vẫn trả về JSON hợp lệ. HTTP status vẫn là 200. Nếu đội backend có unit test riêng dựa trên
> schema mới, những test đó cũng xanh hết.
>
> Câu hỏi là: có lớp bảo vệ nào phát hiện được không?

### Cảnh 14 — Contract test bắt được (20:40–22:10)

**Thao tác**

```powershell
npm run test:pact --prefix src\sample-api\pact-workshop-js\provider
```

**Kết quả mong đợi:** verification **FAIL**, output chỉ rõ thiếu trường `name`.

**Lời thoại**

> Chạy lại provider verification.
>
> *(kết quả)* **Fail.** Và hãy đọc kỹ thông báo lỗi, vì đây là điểm mạnh nhất của Pact.
>
> Nó không nói chung chung là "test hỏng". Nó chỉ đúng interaction nào, đúng đường dẫn trường nào,
> mong đợi gì và nhận được gì. Người sửa lỗi không phải đi dò.
>
> Lưu ý mốc thời gian: lỗi này bị bắt **ngay tại provider verification**, tức là trong CI của đội
> backend, **trước khi** thay đổi được merge. Đây là chỗ rẻ nhất để sửa. Nếu không có lớp này,
> lỗi sẽ chỉ lộ ra khi frontend tích hợp — trên staging, hoặc tệ hơn là production.

### Cảnh 15 — Functional test có thể bỏ lọt (22:10–23:40)

**Thao tác**

```powershell
# Khởi động lại Provider (đang mang breaking change)
cd src\sample-api\pact-workshop-js\provider
node server.js
```

Terminal khác:

```powershell
powershell -ExecutionPolicy Bypass -File src\newman\run-newman.ps1 `
  -Collection src\postman\collections\product-service-data-driven.postman_collection.json `
  -Data src\postman\data\get-product-by-id.data.json `
  -Folder "GET — Happy Path"
```

**Lời thoại**

> Bây giờ mình làm một thí nghiệm mà mình cho là đáng giá nhất video này. Provider đang mang
> breaking change. Mình chạy lại **bộ test Postman** ở Phần 1 — lớp functional — xem nó có bắt được không.
>
> *(đọc kết quả)* Các bạn quan sát kỹ. Những test chỉ khẳng định **status là 200** thì **vẫn pass** —
> vì API đúng là vẫn trả 200. Chỉ những assertion kiểm tra **sự tồn tại của trường `name`** mới fail.
>
> Kết luận rút ra rất quan trọng, và nó tinh tế hơn câu "functional test không bắt được":
>
> Functional test **có thể** bắt được lỗi này — nhưng chỉ khi người viết test đã **chủ động nghĩ
> tới** việc assert đúng trường đó. Nếu bộ test chỉ dừng ở status code, nó sẽ báo xanh toàn bộ
> trong khi hệ thống đã gãy.
>
> Còn contract test bắt được **theo thiết kế**, vì đó chính xác là việc nó sinh ra để làm. Không
> phụ thuộc vào việc ai đó có nhớ viết assertion hay không.
>
> Đó là lý do ở Video 1 mình nói: hai lớp này **bổ sung** cho nhau, không thay thế nhau.

### Cảnh 16 — Khôi phục (23:40 — lồng vào chuyển cảnh)

**Thao tác:** hoàn tác `this.title` về `this.name`, restart Provider, chạy lại verification để
xác nhận pass.

**Lời thoại**

> Mình khôi phục lại `name`, chạy lại verification — và pass trở lại. Contract đã hoàn thành đúng
> vai trò của nó: chặn thay đổi phá vỡ tương thích, rồi cho qua khi đã sửa.

## 8. Phần 5 — Agent Skill trên PetStore API

### 8.1. Bối cảnh cần nói trước

Phần này chứng minh **tính tái sử dụng**, nên phải trung thực về cả những gì không tái sử dụng
được. Không dựng kết quả đẹp.

### Cảnh 17 — Giới thiệu Agent Skill (23:40–25:10)

**Thao tác:** mở `.agents/skills/api-testing/SKILL.md`, cuộn qua các mục chính.

**Lời thoại**

> Phần cuối. Toàn bộ những gì các bạn thấy ở Phần 1 — cấu trúc collection, quy ước data file,
> pre-request script, test script — đều tuân theo một bộ quy ước nhất quán.
>
> Nhóm đã **đóng gói bộ quy ước đó thành một Agent Skill**. Có thể hình dung như một hàm: đầu vào
> là đặc tả API, đầu ra là bộ test hoàn chỉnh.
>
> *(cuộn file)* Skill mô tả quy trình 6 bước, quy ước đặt tên, khuôn mẫu script, checklist nghiệm
> thu, và một bảng cạm bẫy thường gặp.
>
> Điểm quan trọng: skill này **không nhắc tên Product Service ở phần quy trình**. Product Service
> chỉ xuất hiện ở cuối như một bản tham chiếu. Nghĩa là về nguyên tắc, nó áp dụng được cho API bất kỳ.
>
> Và bây giờ mình kiểm chứng điều đó bằng một API hoàn toàn không liên quan.

### Cảnh 18 — Chạy skill trên PetStore (25:10–27:10)

**Thao tác**

1. Mở `https://petstore.swagger.io/v2/swagger.json` để thấy đặc tả.
2. Trong Claude Code, gọi skill với đặc tả PetStore.
3. Chờ skill sinh output, mở các file được tạo trong `src/postman/petstore/`.

**Lời thoại**

> **Swagger PetStore** là API demo công khai, không liên quan gì tới Product Service: nghiệp vụ
> khác, endpoint khác, cơ chế xác thực khác.
>
> Mình đưa đặc tả OpenAPI của nó cho skill.
>
> *(khi có output)* Skill đã sinh ra: một collection theo đúng cấu trúc `_Setup` + tách Happy Path
> và Negative theo method; các data file với đúng schema `tc_id`, `description`, `expected_status`;
> và test script đọc kỳ vọng từ data.
>
> Các bạn so sánh với collection ở Phần 1 — **cấu trúc giống hệt**, chỉ khác nội dung. Đó chính là
> ý nghĩa của việc đóng gói quy ước thành skill.

### Cảnh 19 — Chạy Newman và đọc kết quả trung thực (27:10–29:00)

**Thao tác**

```powershell
powershell -ExecutionPolicy Bypass -File src\newman\run-newman.ps1 `
  -Collection src\postman\petstore\collections\petstore-data-driven.postman_collection.json `
  -Data src\postman\petstore\data\get-pet-by-id.data.json `
  -Folder "GET — Happy Path" `
  -SkipProviderCheck
```

> **Lưu ý người quay:** phải dùng `-SkipProviderCheck` vì runner mặc định kiểm tra
> `http://localhost:8080/products` — endpoint đó không tồn tại trên PetStore. Đây cũng là một
> điểm chưa tái sử dụng được 100%, hãy nói thẳng ra.

**Lời thoại**

> Chạy bằng đúng runner script ở Phần 2, không sửa một dòng nào — chỉ truyền tham số khác.
>
> Mình phải thêm cờ `-SkipProviderCheck`, vì bước kiểm tra sức khỏe của runner đang trỏ tới
> endpoint của Product Service. Đây là một chỗ chưa tổng quát hoàn toàn, và mình nói thẳng ra
> thay vì giấu đi.
>
> *(đọc kết quả)* Nhóm Happy Path chạy được và pass.
>
> **Nhưng** — và đây là phần quan trọng nhất của cả video — khi chạy nhóm negative, các bạn sẽ
> thấy một số test **fail**. Mình không cắt đoạn này đi, vì nó dạy được nhiều hơn một kết quả đẹp.

### Cảnh 20 — Giải thích vì sao test fail (29:00–30:10)

**Thao tác:** chạy folder `GET — Negative` hoặc `POST — Negative` trên PetStore, chỉ vào các test fail.

**Lời thoại**

> Lý do các test này fail **không phải vì test sai**, mà vì **API đích không thực thi những ràng
> buộc mà đặc tả của nó khai báo**.
>
> Cụ thể, PetStore là sandbox công cộng dùng chung. Đặc tả có khai báo `api_key`, nhưng thực tế
> nhiều endpoint chấp nhận request không có khóa — nên test kỳ vọng `401` sẽ nhận về `200`. Tương
> tự với validation: body thiếu trường bắt buộc vẫn có thể được chấp nhận thay vì trả `400`.
>
> Ngoài ra, dữ liệu trên đó **ai cũng sửa được**. Con vật mình vừa tạo có thể bị người khác xóa
> giữa chừng, nên test không cô lập — trái ngược hẳn với Product Service dùng dữ liệu in-memory
> reset sạch sau mỗi lần khởi động.
>
> Đây chính là lý do skill của nhóm có hẳn một mục cảnh báo về sandbox công cộng, và có một quy
> tắc rất rõ: **không được sửa kỳ vọng cho test xanh**. Test đang phản ánh đúng sự thật — rằng API
> này không thực thi ràng buộc nó tự khai báo. Sửa kỳ vọng để báo cáo đẹp là che giấu thông tin
> có giá trị.
>
> Về contract testing với PetStore: nhóm **không** chạy provider verification trên đó, và lý do
> mang tính nguyên tắc. Contract testing consumer-driven đòi hỏi mình **kiểm soát được Provider** —
> phải đăng ký được state handler để dựng dữ liệu, phải chạy được verification trong pipeline của
> Provider. Với một API công cộng không sở hữu, không làm được điều nào cả. Chạy verifier vào đó
> sẽ cho kết quả bấp bênh và sai về mặt khái niệm. Điều này cũng đã được ghi thành quy tắc trong
> skill `contract-testing`.

## 9. Bảng chứng minh Reusability

### Cảnh 21 — Tổng kết (30:10–31:20)

**Hình ảnh:** hiện bảng dưới đây dưới dạng đồ họa.

| Thành phần | Tái sử dụng | Ghi chú |
| --- | :---: | --- |
| Agent Skill (`api-testing`, `contract-testing`) | 100% | Không chứa gì đặc thù Product Service ở phần quy trình |
| Cấu trúc Collection (`_Setup` + Happy/Negative theo method) | 100% | Áp dụng nguyên vẹn cho PetStore |
| Schema data file (`tc_id`, `description`, `expected_status`, `expect_*`) | 100% | Không đổi |
| Khuôn mẫu Test Script (đọc kỳ vọng từ data) | 100% | Không đổi |
| GitHub Actions workflow | ~95% | Chỉ đổi đường dẫn collection và data |
| Newman runner script | ~90% | Auto-discovery giữ nguyên; bước health check cần tham số hóa |
| Pre-request Script (auth) | ~60% | Giữ ba nhánh xử lý; phần sinh token phải viết lại theo cơ chế của API đích |
| Dữ liệu test (id, giá trị kỳ vọng) | 0% | Đặc thù nghiệp vụ, buộc phải viết mới |

**Lời thoại**

> Tổng kết phần tái sử dụng bằng con số cụ thể.
>
> Tái sử dụng **100%**: bản thân Agent Skill, cấu trúc collection, schema data file, và khuôn mẫu
> test script. Đây là phần "quy trình và công cụ".
>
> Tái sử dụng **cao nhưng không tuyệt đối**: workflow CI khoảng 95% — chỉ đổi đường dẫn. Runner
> script khoảng 90% — phần auto-discovery giữ nguyên, riêng bước health check cần tham số hóa,
> đúng như mình vừa gặp khi phải thêm cờ `-SkipProviderCheck`.
>
> Tái sử dụng **một phần**: pre-request script khoảng 60%. Ba nhánh xử lý xác thực giữ nguyên,
> nhưng cách sinh token phải viết lại theo cơ chế của API đích.
>
> Và **0%**: dữ liệu test. Điều này là hiển nhiên và không phải nhược điểm — id sản phẩm, giá trị
> kỳ vọng gắn chặt với nghiệp vụ.
>
> Nói cách khác: **thứ tái sử dụng được là quy trình và công cụ, không phải dữ liệu.** Đó cũng là
> định nghĩa hợp lý nhất cho một bộ khung kiểm thử tốt.
>
> Kết lại toàn bộ video: các bạn đã thấy bộ test chạy trên giao diện, rồi chạy bằng dòng lệnh, rồi
> chạy trên CI. Thấy contract được sinh ra từ phía Consumer và được kiểm chứng ở phía Provider.
> Thấy một thay đổi một dòng làm gãy tương thích, và thấy lớp nào bắt được nó. Và cuối cùng, thấy
> toàn bộ quy trình đó áp dụng lại được cho một API khác.
>
> Phần thực hành trên lớp, các bạn sẽ tự làm lại luồng này. Cảm ơn Thầy Cô và các bạn đã theo dõi.

## 10. Bảng kiểm kết thúc video

### 10.1. Nội dung

- [ ] Đã nói rõ Video 3 không giảng lại lý thuyết, chỉ chạy thật.
- [ ] Đã giải thích `/health` là endpoint public dùng làm readiness probe.
- [ ] Đã nhấn mạnh dữ liệu in-memory và hệ quả với test isolation.
- [ ] Đã chỉ ra `tc_id` trong tên test và lý do cần nó.
- [ ] Đã nói "negative test pass nghĩa là hệ thống báo lỗi đúng cách".
- [ ] Đã chiếu mã thoát của Newman và giải thích vai trò với CI.
- [ ] Đã giải thích lý do phải dừng Provider trước khi verify (cổng 8080).
- [ ] Đã nhấn mạnh consumer test gọi **API client thật**.
- [ ] Đã giải thích giá trị trong pact chỉ là dữ liệu ví dụ, matcher mới là điều kiện.
- [ ] Đã đính chính "verification không gọi tới Consumer".
- [ ] Đã giải thích `stateHandlers` và nhánh bảo vệ trong `requestFilter`.
- [ ] Breaking change chỉ sửa **một dòng** và đã nói rõ nó trông vô hại thế nào.
- [ ] Đã chạy lại Newman trên bản lỗi để so sánh hai lớp bảo vệ.
- [ ] Đã nêu kết luận tinh tế: functional test *có thể* bắt được, contract test bắt *theo thiết kế*.
- [ ] Đã khôi phục code và xác nhận verification pass trở lại.
- [ ] Đã trình bày kết quả PetStore **trung thực**, không cắt phần fail.
- [ ] Đã giải thích vì sao không chạy provider verification trên PetStore.
- [ ] Đã chiếu bảng reusability với số liệu phân tách rõ.

### 10.2. Kỹ thuật

- [ ] Đã dry run trọn vẹn một lượt trước khi bật ghi hình.
- [ ] Provider được restart trước mỗi nhóm test mới.
- [ ] Không có test nào fail vì lý do ngoài kịch bản.
- [ ] Token PactFlow (nếu hiện) đã được che.
- [ ] Các đoạn chờ đã được tăng tốc khi dựng.
- [ ] Có chapter marker theo bảng ở mục 3.
- [ ] Terminal đủ lớn để đọc trên máy chiếu.
- [ ] Code đã được khôi phục về trạng thái sạch (`git status` không còn thay đổi ngoài ý muốn).

## 11. Xử lý sự cố khi quay

### `EADDRINUSE` khi chạy provider verification

Provider thủ công còn đang chạy. Dừng bằng `Ctrl+C` ở terminal đó, hoặc:

```powershell
Get-NetTCPConnection -LocalPort 8080 -State Listen | Select-Object OwningProcess
Stop-Process -Id <PID>
```

### Test GET fail với `404` dù trước đó pass

Folder `DELETE — Happy Path` đã xóa `id = 11`. Restart Provider để nạp lại seed data.

### Consumer pact test timeout

Test đã cấu hình `--testTimeout=30000`. Nếu vẫn timeout, kiểm tra cổng mock provider có bị
chặn bởi tường lửa không. Chạy lại là đủ trong đa số trường hợp.

### `newman` không được nhận diện

```powershell
npm install -g newman newman-reporter-htmlextra
```

Mở terminal mới sau khi cài để nạp lại PATH.

### Runner báo không kết nối được Provider

Runner gọi `http://localhost:8080/products` với token tự sinh. Kiểm tra Provider đã chạy chưa.
Khi chạy trên API khác (PetStore), dùng cờ `-SkipProviderCheck`.

### PetStore trả kết quả khác với lúc dry run

Đây là sandbox công cộng, dữ liệu bị người khác thay đổi. Không cố ép kết quả giống lần trước —
nói thẳng trong video rằng đây chính là biểu hiện của việc thiếu test isolation.

### Verification vẫn fail sau khi đã khôi phục `name`

Provider cần restart để nạp lại class đã sửa. Dừng và chạy lại `node server.js`.

## 12. Tài liệu tham khảo

Nguồn nội bộ được đối chiếu khi biên soạn ngày 31/07/2026:

- Agent Skill: `.agents/skills/api-testing/SKILL.md`, `.agents/skills/contract-testing/SKILL.md`
- Postman: `src/postman/README.md`, `src/postman/collections/`, `src/postman/data/`
- Newman runner: `src/newman/run-newman.ps1`, `src/newman/README.md`
- Pact: `src/pact/README.md`, `consumer/src/api.pact.spec.js`,
  `provider/product/product.pact.test.js`, `provider/product/product.js`
- CI: `.github/workflows/newman-api-test.yml`, `.github/workflows/pact-verification.yml`
- Kịch bản liên quan: [Video 1 — Lý thuyết & Thuật ngữ](video-01-theory-terminology-script.md),
  [Video 2 — Cài đặt môi trường](video-02-environment-setup-script.md)

Nguồn ngoài:

- [Swagger PetStore](https://petstore.swagger.io/) — API dùng cho demo tái sử dụng
- [Pact — Docs](https://docs.pact.io)
- [Newman](https://github.com/postmanlabs/newman)
