# Video 1 — Lý thuyết & Thuật ngữ API / Contract Testing

**Phiên bản:** 1.0
**Ngày cập nhật:** 31/07/2026
**Người soạn:** 23127211 — Nguyễn Lê Hồ Anh Khoa
**Thời lượng mục tiêu:** 48–52 phút, chia thành **hai phần quay độc lập**
**Đối tượng:** Sinh viên chưa từng làm API Testing / Contract Testing, xem trước khi vào buổi thực hành 90 phút

## Vì sao chia làm hai phần

Bộ slide có 35 slide nội dung. Nếu giảng đủ độ chi tiết mà một video lý thuyết cần có, tổng thời lượng khoảng 48–52 phút — quá dài cho một file tải lên và quá dài để sinh viên xem liền mạch.

Kịch bản này vì vậy chia thành hai video quay độc lập, **bám đúng thứ tự slide trong deck** để người quay chỉ cần bấm phím mũi tên, không phải nhảy slide:

| Video  | Slide trong deck | Nội dung                                             | Thời lượng |
| ------ | ---------------- | ---------------------------------------------------- | ---------- |
| **1A** | 1 → 19           | Nền tảng API Testing, bộ công cụ, Automation & CI/CD | ~21 phút   |
| **1B** | 20 → 44          | Contract Testing, cơ chế Pact, AI hỗ trợ, Tổng kết   | ~27 phút   |

## Mục lục

- [1. Mục tiêu và kết quả đầu ra](#1-mục-tiêu-và-kết-quả-đầu-ra)
- [2. Phân vai giữa ba video](#2-phân-vai-giữa-ba-video)
- [3. Chuẩn bị trước khi quay](#3-chuẩn-bị-trước-khi-quay)
- [4. Timeline tổng quan](#4-timeline-tổng-quan)
- [5. Kịch bản chi tiết — Video 1A](#5-kịch-bản-chi-tiết--video-1a)
- [6. Kịch bản chi tiết — Video 1B](#6-kịch-bản-chi-tiết--video-1b)
- [7. Bảng thuật ngữ Việt–Anh](#7-bảng-thuật-ngữ-việtanh)
- [8. Bảng kiểm kết thúc video](#8-bảng-kiểm-kết-thúc-video)
- [9. Lỗi thường gặp khi quay video lý thuyết](#9-lỗi-thường-gặp-khi-quay-video-lý-thuyết)
- [10. Ghi chú cho người biên tập slide](#10-ghi-chú-cho-người-biên-tập-slide)
- [11. Tài liệu tham khảo](#11-tài-liệu-tham-khảo)

## 1. Mục tiêu và kết quả đầu ra

Sau khi xem hết Video 1A và 1B, người học có thể:

1. Giải thích được API, REST, và bóc tách được một cặp request–response thành từng thành phần.
2. Đọc và suy luận đúng ý nghĩa của các HTTP method và status code thường gặp.
3. Phân biệt **authentication** và **authorization**, hiểu vì sao token hết hạn trả `401`.
4. Kể tên và cho ví dụ **sáu loại test case** cho API, gắn với ba kỹ thuật thiết kế test.
5. Giải thích vai trò của Collection, Environment, Variable, Pre-request Script, Test Script trong Postman.
6. Hiểu **data-driven testing** và vì sao nó tách test logic khỏi test data.
7. Giải thích Newman là gì và vì sao nó là mắt xích để đưa test vào CI/CD.
8. Diễn đạt được **vấn đề mà Contract Testing sinh ra để giải quyết** bằng ngôn ngữ của mình.
9. Định nghĩa chính xác: contract, interaction, provider state, matcher, pact file, verification, Pact Broker, compatibility matrix, `can-i-deploy`.
10. Mô tả trọn vẹn vòng đời: Consumer sinh pact → publish → Provider verify → Broker ghi kết quả → gate deploy.
11. Phân biệt **consumer-driven** và **provider-driven**, nêu được lợi ích của hướng consumer-driven.
12. Nêu được **giới hạn** của Contract Testing và biết dùng đúng lớp test cho đúng loại rủi ro.

> Video 1 **không** hướng dẫn cài đặt và **không** chạy demo. Toàn bộ nội dung là giảng trên slide.

## 2. Phân vai giữa ba video

Nêu rõ bảng này ở đầu Video 1A để người học biết mình đang ở đâu:

| Video | Tên                          | Trả lời câu hỏi                      | Hình thức                      |
| ----- | ---------------------------- | ------------------------------------ | ------------------------------ |
| **1** | Lý thuyết & Thuật ngữ        | _Cái gì? Vì sao? Khác nhau chỗ nào?_ | Giảng trên slide               |
| **2** | Hướng dẫn cài đặt môi trường | _Máy tôi cần có gì để làm được?_     | Quay màn hình thao tác cài đặt |
| **3** | Demo thực hành tổng hợp      | _Chạy thật thì trông như thế nào?_   | Quay màn hình chạy test thật   |

**Nguyên tắc chống trùng lặp khi quay:**

- Video 1 **được phép** hiện code/JSON trên slide để giải thích khái niệm, nhưng **không mở IDE, không chạy lệnh**.
- Mọi câu kiểu "bây giờ mình chạy thử" đều thuộc Video 3. Trong Video 1 dùng công thức: _"phần chạy thật các bạn sẽ thấy ở Video 3"_.
- Không lặp lại hướng dẫn cài đặt. Nếu nhắc tới công cụ, chỉ nói vai trò, rồi trỏ sang Video 2.

## 3. Chuẩn bị trước khi quay

### 3.1. Kỹ thuật

- Slide chạy bằng Slidev ở chế độ **Presenter** để đọc được speaker notes: `pnpm dev` trong `docs/slides/`, mở `http://localhost:3030/presenter`.
- Quay ở độ phân giải **1920×1080**, tỉ lệ 16:9 (khớp `aspectRatio: 16/9` trong `slides.md`).
- Ẩn con trỏ chuột khi không dùng để trỏ. Tắt thanh tác vụ và mọi thông báo.
- Micro: thu ở nơi ít vọng âm. Nói chậm hơn tốc độ hội thoại thường khoảng 15%.
- Bật sẵn chế độ vẽ (`drawings.enabled: true`) để khoanh vùng khi giải thích sơ đồ.

### 3.2. Nội dung

- Đọc trước toàn bộ speaker notes trong từng file slide — kịch bản này mở rộng từ chúng, không mâu thuẫn.
- Thuộc bảng thuật ngữ ở [mục 7](#7-bảng-thuật-ngữ-việtanh). Video này bán giá trị chính bằng **độ chính xác của thuật ngữ**.
- Chuẩn bị sẵn một tab trình duyệt mở `docs.pact.io` để hiện lên khi nhắc nguồn (không bắt buộc).

### 3.3. Quy ước trình bày

- Mỗi thuật ngữ tiếng Anh, **lần đầu xuất hiện** phải đọc kèm nghĩa tiếng Việt, sau đó dùng nhất quán một dạng.
- Slide có `v-click` phải bấm đúng nhịp: nói xong ý trước rồi mới hiện ý sau. Không bấm hết một lượt rồi mới nói.
- Khi slide có footnote (`<sup>1</sup>`), đọc phần chú thích đó thành lời — đừng để người xem tự đọc chữ nhỏ.

## 4. Timeline tổng quan

### Video 1A — Nền tảng API Testing & Automation (~21 phút)

|   Thời gian | Cảnh                                   | Slide                                                             |
| ----------: | -------------------------------------- | ----------------------------------------------------------------- |
| 00:00–00:50 | A1 · Mở đầu, giới thiệu nhóm           | `1.1.cover` (Slide 1)                                             |
| 00:50–01:55 | A2 · Agenda & phân vai ba video        | `1.2.agenda` (Slide 2)                                            |
| 01:55–03:15 | A3 · Bối cảnh microservices & mục tiêu | `1.3.intro_section` (Slide 3)                                     |
| 03:15–03:30 | A4 · Chuyển phần A                     | `2.1.section` (Slide 4)                                           |
| 03:30–06:50 | A5 · API, REST, method, status code    | `2.2.api_basics & 2.3.http_status_codes` (Slide 5–6)              |
| 06:50–08:45 | A6 · Authentication & Authorization    | `2.4.authentication & 2.5.auth_mechanisms` (Slide 7–8)            |
| 08:45–11:45 | A7 · Sáu loại test case                | `2.6.test_design & 2.7.advanced_test_design` (Slide 9–10)         |
| 11:45–13:25 | A8 · Postman — khái niệm cốt lõi       | `2.8.postman_overview & 2.9.postman_advanced` (Slide 11–12)       |
| 13:25–14:35 | A9 · Tổ chức Collection                | `2.10.postman_collections` (Slide 13)                             |
| 14:35–15:50 | A10 · Script & Assertion               | `2.11.postman_scripts` (Slide 14)                                 |
| 15:50–17:05 | A11 · Data-driven testing              | `2.12.postman_datadriven` (Slide 15)                              |
| 17:05–17:55 | A12 · VS Code REST Client              | `2.13.vscode_restclient` (Slide 16)                               |
| 17:55–19:05 | A13 · API mẫu Product Service          | `2.14.product_service & 2.15.product_endpoints` (Slide 17–18)     |
| 19:05–19:20 | A14 · Chuyển phần B                    | `3.1.section` (Slide 19)                                          |
| 19:20–20:35 | A15 · Newman                           | `3.2.newman` (Slide 20)                                           |
| 20:35–21:25 | A16 · Newman pipeline                  | `3.3.cicd_pipeline` (Slide 21)                                    |
| 21:25–22:05 | A17 · Pact pipeline (bản đồ trước)     | `3.4.pact_pipeline & 3.5.pact_verification` (Slide 22–23)         |
| 22:05–22:55 | A18 · Hai lớp bảo vệ & chốt 1A         | `3.6.automation_value` (Slide 24)                                 |

### Video 1B — Contract Testing, Pact & Tổng kết (~27 phút)

|   Thời gian | Cảnh                                       | Slide                                                                |
| ----------: | ------------------------------------------ | -------------------------------------------------------------------- |
| 00:00–00:35 | B1 · Nối tiếp & chuyển phần C              | `4.1.section` (Slide 25)                                             |
| 00:35–02:55 | B2 · Vấn đề: mỗi service xanh, hệ thống đỏ | `4.2.the_problem` (Slide 26)                                         |
| 02:55–05:25 | B3 · Contract Testing là gì                | `4.3.definition` (Slide 27)                                          |
| 05:25–07:25 | B4 · So sánh bốn lớp kiểm thử              | `4.4.comparison` (Slide 28)                                          |
| 07:25–08:55 | B5 · Kiến trúc Consumer–Provider–Broker    | `4.5.architecture` (Slide 29)                                        |
| 08:55–10:25 | B6 · Vì sao consumer-driven                | `4.6.why_consumer_driven` (Slide 30)                                 |
| 10:25–11:55 | B7 · Giới hạn của Contract Testing         | `4.7.limitations` (Slide 31)                                         |
| 11:55–12:10 | B8 · Chuyển phần D                         | `5.1.section` (Slide 32)                                             |
| 12:10–14:00 | B9 · Consumer tạo contract                 | `5.2.consumer_side` (Slide 33)                                       |
| 14:00–16:00 | B10 · Giải phẫu pact.json & matcher        | `5.3.contract_anatomy` (Slide 34)                                    |
| 16:00–17:50 | B11 · Provider xác minh contract           | `5.4.provider_side` (Slide 35)                                       |
| 17:50–19:20 | B12 · Broker & deployment gate             | `5.5.broker_cicd` (Slide 36)                                         |
| 19:20–20:10 | B13 · Case study Product Service           | `5.6.case_study & 5.7.case_study_results` (Slide 37–38)              |
| 20:10–21:30 | B14 · Breaking change — bài học            | `5.8.breaking_change` (Slide 39)                                     |
| 21:30–21:45 | B15 · Chuyển phần E                        | `6.1.section` (Slide 40)                                             |
| 21:45–23:15 | B16 · AI trong quy trình testing           | `6.2.ai_in_testing & 6.3.ai_principles` (Slide 41–42)                |
| 23:15–24:30 | B17 · Agent Skill                          | `6.4.agent_skill` (Slide 43)                                         |
| 24:30–24:45 | B18 · Chuyển phần F                        | `7.1.section` (Slide 44)                                             |
| 24:45–25:55 | B19 · API Testing vs Contract Testing      | `7.2.comparison_summary` (Slide 45)                                  |
| 25:55–26:55 | B20 · Khi nào dùng gì                      | `7.3.when_to_use` (Slide 46)                                         |
| 26:55–27:50 | B21 · Adoption path                        | `7.4.adoption_path` (Slide 47)                                       |
| 27:50–28:50 | B22 · Ba từ khóa & kết                     | `7.5.takeaways`, `7.6.resources & 7.7.official_docs` (Slide 48–50)   |

## 5. Kịch bản chi tiết — Video 1A

### Cảnh A1 — Mở đầu (00:00–00:50)

**Slide:** `pages/1.intro/1.1.cover.md` (Slide 1)

**Hình ảnh trên màn hình**

- Slide bìa: tiêu đề "API Testing & Contract Testing", tên năm thành viên, bốn chip công cụ Postman / Newman / Pact / GitHub Actions.

**Lời thoại**

> Xin chào Thầy Cô và các bạn. Đây là video thứ nhất trong bộ ba video seminar của Nhóm 03 — SEBros, chủ đề **API Testing và Contract Testing**.
>
> Video này là phần lý thuyết và thuật ngữ. Mục tiêu của mình không phải là dạy bấm nút trên một công cụ cụ thể, mà là để sau khi xem xong, các bạn hiểu **hai loại kiểm thử này giải quyết hai vấn đề khác nhau như thế nào**, và nắm chắc bộ từ vựng để đọc tài liệu, đọc log lỗi, và làm bài thực hành trên lớp mà không bị vướng ở khái niệm.
>
> Bốn công cụ các bạn thấy ở dưới slide — Postman, Newman, Pact, GitHub Actions — là bộ công cụ nhóm dùng xuyên suốt. Trong video này mình chỉ giải thích **vai trò** của chúng; phần cài đặt ở Video 2 và phần chạy thật ở Video 3.

**Chú thích dựng phim**

- Giữ slide bìa khoảng 3 giây trước khi bắt đầu nói.
- Chèn lower-third: "Video 1A — Lý thuyết & Thuật ngữ · Nhóm 03 SEBros".

---

### Cảnh A2 — Agenda và phân vai ba video (00:50–01:55)

**Slide:** `pages/1.intro/1.2.agenda.md` (Slide 2) (bấm qua slide `1.2` không dừng lại)

**Hình ảnh trên màn hình**

- 10 mục agenda hiện dần theo `v-click`. Bấm theo nhịp đọc, mỗi lần 2 mục.

**Lời thoại**

> Đây là toàn bộ lộ trình seminar, gồm mười mục. Mình sẽ không đọc lại từng dòng, mà chỉ ra cách chúng gom thành ba khối.
>
> Khối thứ nhất, từ mục 2 đến mục 5, là **API Testing**: kiểm thử ở tầng giao diện lập trình — một endpoint có trả về đúng thứ nó hứa hay không. Khối thứ hai, mục 6 đến mục 8, là **Contract Testing**: một câu hỏi hoàn toàn khác — hai service có còn hiểu nhau hay không. Khối thứ ba, mục 9 và 10, là AI hỗ trợ kiểm thử và tổng kết.
>
> Về cách phân chia video: **Video 1**, tức video này, trả lời câu hỏi _cái gì và vì sao_. **Video 2** hướng dẫn cài đặt môi trường — _máy tôi cần có gì_. **Video 3** là demo thực hành — _chạy thật thì trông như thế nào_.
>
> Cho nên trong video này, khi mình chiếu một đoạn JSON hay một đoạn script lên slide, đó là để **giải thích cấu trúc**, không phải để chạy. Các bạn chưa cần mở máy theo. Cứ xem hết rồi hãy làm theo Video 2.

**Chú thích dựng phim**

- Chèn bảng ba video dạng đồ họa đè lên slide ở giây thứ 40 của cảnh này, giữ 8 giây.

---

### Cảnh A3 — Bối cảnh và mục tiêu seminar (01:55–03:15)

**Slide:** `pages/1.intro/1.3.intro_section.md` (Slide 3)

**Hình ảnh trên màn hình**

- Cột trái "Bối cảnh" 3 gạch đầu dòng, cột phải "Mục tiêu seminar" 4 gạch đầu dòng, cuối cùng là hộp "Phạm vi".

**Lời thoại**

> Trước khi vào kỹ thuật, cần hiểu vì sao hai loại kiểm thử này trở nên quan trọng đúng lúc này.
>
> _(bấm click 1)_ Phần mềm ngày nay hiếm khi còn là một khối duy nhất. Hệ thống được chia thành nhiều **microservices** — tức là nhiều service nhỏ, chạy độc lập, mỗi service do một đội khác nhau phát triển và triển khai theo nhịp riêng, và chúng nói chuyện với nhau qua API.
>
> _(bấm click 2)_ Kiến trúc này đem lại tốc độ, nhưng đổi lại nó tạo ra rất nhiều **ranh giới**. Mỗi ranh giới là một chỗ có thể gãy. Và điều quan trọng là: lỗi ở ranh giới thường **không** nằm bên trong service nào cả — nên không có unit test nào bắt được nó.
>
> _(bấm click 3)_ Khi số service và số lần deploy tăng lên, kiểm thử thủ công không còn theo kịp. Ta cần **automation** — test tự chạy — và **CI/CD**, tức là tự động tích hợp mã và tự động triển khai mỗi khi có thay đổi.
>
> _(bấm sang cột phải)_ Từ bối cảnh đó, seminar đặt bốn mục tiêu. Một, hiểu và thực hành **API Testing**, tức kiểm thử chức năng ở tầng API. Hai, hiểu và thực hành **Contract Testing**, kiểm tra tính tương thích giữa bên gọi và bên cung cấp. Ba, tự động hóa cả hai bằng Newman và GitHub Actions. Và bốn, trải nghiệm quy trình **AI-assisted testing** — dùng AI như một trợ lý có kiểm soát trong quy trình kiểm thử.
>
> _(bấm hộp phạm vi)_ Toàn bộ seminar xoay quanh một API mẫu duy nhất: **Product Service**, viết bằng Node.js và Express, có năm endpoint CRUD. Dùng một hệ thống nhỏ và xuyên suốt giúp các bạn tập trung vào **kỹ thuật kiểm thử**, thay vì mất thời gian làm quen nghiệp vụ mới ở mỗi phần.

---

### Cảnh A4 — Chuyển phần A (03:15–03:30)

**Slide:** `pages/2.api_testing/2.1.section.md` (Slide 4)

**Lời thoại**

> Chúng ta bắt đầu với Phần A — API Testing. Phần này đi từ khái niệm nền, sang cách thiết kế test case, rồi tới bộ công cụ.

---

### Cảnh A5 — API, REST, method và status code (03:30–06:50)

**Slide:** `pages/2.api_testing/2.2.api_basics.md` & `pages/2.api_testing/2.3.http_status_codes.md` (Slide 5 & 6)

**Hình ảnh trên màn hình**

- Định nghĩa API/REST, hộp mono "Request/Response", hai bảng: HTTP Methods và HTTP Status Codes.

**Lời thoại**

> **API** viết tắt của Application Programming Interface — giao diện lập trình ứng dụng. Cách hiểu dễ nhất: đó là **hợp đồng giao tiếp giữa hai chương trình**. Con người dùng giao diện đồ họa để ra lệnh cho phần mềm; còn phần mềm ra lệnh cho phần mềm khác thông qua API.
>
> **REST API** là kiểu API phổ biến nhất hiện nay. REST không phải một thư viện hay một công nghệ, mà là một **phong cách thiết kế**: mọi thứ trong hệ thống được mô hình hóa thành **tài nguyên** — resource — mỗi tài nguyên có một địa chỉ URL, và ta tác động lên tài nguyên đó bằng các HTTP method.
>
> Hãy nhìn hộp giữa slide, vì đây là thứ các bạn sẽ làm việc cùng suốt seminar. Một lần trao đổi luôn gồm hai nửa.
>
> Nửa đi ra là **Request**, có bốn thành phần. **Method** — động từ, cho biết ta muốn làm gì. **URL** — địa chỉ tài nguyên, trong đó thường có _path parameter_, ví dụ số 10 trong `/product/10`, và có thể có _query string_ đứng sau dấu hỏi để lọc hoặc phân trang. **Headers** — phần siêu dữ liệu, ví dụ `Content-Type` mô tả định dạng dữ liệu, hay `Authorization` mang thông tin xác thực. Và **Body** — phần dữ liệu gửi kèm, thường ở định dạng JSON, chỉ có ở những method tạo hoặc sửa dữ liệu.
>
> Nửa đi về là **Response**, có ba thành phần: **Status Code** — mã số ba chữ số cho biết kết quả, **Headers**, và **Body** — dữ liệu trả về.
>
> Và đây là điểm mấu chốt: **kiểm thử API chính là kiểm tra ánh xạ giữa hai nửa này.** Với một request cụ thể, response có đúng như đặc tả hay không — đúng status code, đúng cấu trúc, đúng giá trị.
>
> _(chuyển sang bảng trái)_ Bốn method chính. **GET** để đọc dữ liệu — GET không được phép làm thay đổi dữ liệu trên server; nếu một endpoint GET mà lại xóa mất thứ gì đó thì đó là lỗi thiết kế. **POST** để tạo mới. **PUT** để cập nhật toàn bộ tài nguyên — tức là thay thế cả bản ghi, chứ không phải sửa vài trường. **DELETE** để xóa.
>
> Có một tính chất đáng nhớ ở đây là **idempotent** — tính bất biến khi lặp lại. GET, PUT và DELETE là idempotent: gọi một lần hay gọi mười lần thì trạng thái cuối của hệ thống như nhau. POST thì không: gọi POST ba lần sẽ tạo ra ba bản ghi. Điều này quan trọng khi ta viết test có chạy lặp, hoặc khi CI chạy lại một job bị lỗi.
>
> _(chuyển sang bảng phải)_ Status code chia theo nhóm trăm. Nhóm **2xx** là thành công: `200 OK` cho một request thành công thông thường; `201 Created` khi vừa tạo mới một tài nguyên; `204 No Content` khi thành công nhưng không có gì để trả về — điển hình là sau khi xóa.
>
> Nhóm **4xx** là **lỗi từ phía người gọi**. `400 Bad Request` — dữ liệu gửi lên không hợp lệ, ví dụ thiếu trường bắt buộc. `401 Unauthorized` — thiếu hoặc sai thông tin xác thực. `404 Not Found` — tài nguyên không tồn tại.
>
> Và nhóm **5xx**, tuy không có trên slide nhưng các bạn sẽ gặp, là **lỗi từ phía server**. Nguyên tắc phân biệt rất đáng nhớ: 4xx nghĩa là _"bạn gửi sai"_, 5xx nghĩa là _"tôi hỏng"_.
>
> Vì sao phải thuộc mấy con số này? Vì phần lớn assertion trong bộ test của chúng ta bắt đầu bằng việc kiểm tra status code. Và vì một lỗi rất hay gặp trong thực tế là API trả về `200` cho cả trường hợp thất bại — khi đó test dựa vào status code sẽ báo xanh trong khi hệ thống thực sự đang sai.

**Chú thích dựng phim**

- Khi nói về Request/Response, dùng công cụ vẽ khoanh lần lượt bốn thành phần request rồi ba thành phần response.
- Chèn text overlay "4xx = bạn gửi sai · 5xx = server hỏng" khi nói tới đoạn phân biệt.

---

### Cảnh A6 — Authentication và Authorization (06:50–08:45)

**Slide:** `pages/2.api_testing/2.4.authentication.md` & `pages/2.api_testing/2.5.auth_mechanisms.md` (Slide 7 & 8)

**Hình ảnh trên màn hình**

- Hai cột: "Không authenticate" và "Có authenticate (Token-based)", sau đó hộp ví dụ Bearer ISO-8601.

**Lời thoại**

> Hầu hết API thực tế đều yêu cầu xác thực, nên đây là nhóm test case không bao giờ được bỏ qua.
>
> Trước hết, phân biệt hai từ rất dễ nhầm. **Authentication** — xác thực — trả lời câu hỏi _"bạn là ai?"_. **Authorization** — phân quyền — trả lời câu hỏi _"bạn được phép làm gì?"_. Tương ứng với hai mã lỗi khác nhau: thất bại ở xác thực trả về `401 Unauthorized`; xác thực thành công nhưng không đủ quyền thì trả về `403 Forbidden`. Tên của mã `401` gây hiểu nhầm vì nó có chữ "Unauthorized", nhưng thực chất nó nói về authentication.
>
> _(cột trái)_ Có những API **không yêu cầu xác thực** — ai gọi cũng được. Ví dụ API thời tiết công khai, hoặc endpoint `/health` dùng để kiểm tra service còn sống hay không.
>
> _(cột phải)_ Còn API có xác thực thì phổ biến nhất là kiểu **token-based**. Người gọi đính kèm một header có dạng `Authorization: Bearer` rồi tới chuỗi token. Từ "Bearer" nghĩa là _"người cầm"_ — ai cầm token này thì được coi là chủ sở hữu, giống như vé xem phim. Đó cũng là lý do token phải được bảo vệ như mật khẩu.
>
> Token có nhiều dạng. **JWT** — JSON Web Token — là chuỗi ba phần ngăn cách bằng dấu chấm, tự mang thông tin và có chữ ký. **OAuth2** là một khung ủy quyền hoàn chỉnh. Ngoài ra hệ thống có thể tự định nghĩa dạng token riêng.
>
> Và khi kiểm thử, có ba tình huống hỏng cần test riêng, chứ không gộp làm một: **thiếu token** — không gửi header; **sai token** — sai định dạng; và **token hết hạn** — đúng định dạng nhưng quá thời hạn. Cả ba đều phải trả `401`.
>
> _(hộp ví dụ)_ Trong Product Service của nhóm, token được cố ý thiết kế đơn giản để dễ dạy: nó là một **mốc thời gian theo chuẩn ISO-8601**, ví dụ `Bearer 2026-07-15T10:00:00.000Z`. Quy tắc là mốc thời gian này phải nằm trong vòng **một giờ** so với giờ server. Sai định dạng, hoặc lệch quá một giờ, đều trả về `401`.
>
> Thiết kế này có một hệ quả rất tiện: token **có thể sinh ra bằng vài dòng code ngay lúc chạy test**, không cần đăng nhập, không cần lưu mật khẩu trong repo. Đó là lý do pipeline CI của nhóm chạy được mà không cần khai báo secret nào. Đồng thời nó cho ta một test case biên rất đẹp: một token đúng **tròn một giờ** trước — vừa chạm mốc hết hạn.

---

### Cảnh A7 — Sáu loại test case cho API (08:45–11:45)

**Slide:** `pages/2.api_testing/2.6.test_design.md` & `pages/2.api_testing/2.7.advanced_test_design.md` (Slide 9 & 10)

**Hình ảnh trên màn hình**

- Bảng 6 dòng hiện dần theo `v-click`. Bấm từng dòng, nói xong dòng nào mới hiện dòng kế.

**Lời thoại**

> Đây là slide bản lề của Phần A. Câu hỏi thực tế mà mọi người mới đều gặp là: _đứng trước một endpoint, tôi phải viết những test nào?_ Slide này đưa ra một danh sách sáu nhóm để không bỏ sót.
>
> _(dòng 1)_ **Happy Path** — luồng thuận. Request hợp lệ hoàn toàn, và response phải đúng như đặc tả. Ví dụ: `GET /product/10` kèm token hợp lệ, kỳ vọng `200`. Đây là nhóm ai cũng viết, nhưng nếu **chỉ** có nhóm này thì bộ test gần như vô dụng, vì phần lớn lỗi thật nằm ở các luồng còn lại.
>
> _(dòng 2)_ **Negative** — luồng nghịch. Input sai, và ta kiểm tra hệ thống **xử lý lỗi đúng cách**. Ví dụ `GET /product/99999` với một id không tồn tại, kỳ vọng `404`. Xin nhấn mạnh: negative test **không phải** là test bị fail. Nó là test kỳ vọng một lỗi cụ thể, và nó pass khi hệ thống trả về đúng lỗi đó.
>
> _(dòng 3)_ **Authentication** — như vừa nói ở slide trước: thiếu, sai, hết hạn token, đều kỳ vọng `401`.
>
> _(dòng 4)_ **Validation** — kiểm tra ràng buộc dữ liệu đầu vào. Ví dụ `POST /products` mà thiếu trường `name`, kỳ vọng `400`. Nhóm này còn bao gồm sai kiểu dữ liệu, vượt độ dài cho phép, hoặc giá trị không nằm trong tập hợp lệ.
>
> _(dòng 5)_ **Schema** — kiểm tra **cấu trúc** của response, chứ không chỉ giá trị. Body trả về có đủ các trường `id`, `type`, `name`, `version` hay không, và các trường đó có đúng kiểu hay không. Nhóm này cực kỳ quan trọng, vì nó bắt được loại lỗi mà kiểm tra status code bỏ sót — API vẫn trả `200`, nhưng thiếu mất một trường mà bên gọi đang cần. Hãy nhớ ý này, vì nó chính là cây cầu dẫn sang Contract Testing ở Video 1B.
>
> _(dòng 6)_ **Boundary** — giá trị biên. Ví dụ token đúng tròn một giờ trước, tức vừa chạm ngưỡng hết hạn. Kinh nghiệm ngành cho thấy lỗi tập trung dày đặc ở các mốc biên, vì đó là nơi lập trình viên dễ viết nhầm dấu "nhỏ hơn" thành "nhỏ hơn hoặc bằng".
>
> _(dòng cuối)_ Ba kỹ thuật thiết kế đứng đằng sau sáu nhóm trên.
>
> **Domain Partitioning** — phân hoạch miền, còn gọi là phân lớp tương đương. Ý tưởng: chia miền giá trị đầu vào thành các lớp mà **mọi giá trị trong cùng một lớp cho cùng một hành vi**, rồi chỉ cần chọn một đại diện mỗi lớp. Với id sản phẩm chẳng hạn, ta có lớp "id tồn tại", lớp "id không tồn tại", lớp "id sai định dạng". Test ba giá trị đại diện là đủ; test một nghìn id tồn tại không tăng thêm khả năng phát hiện lỗi.
>
> **Boundary Value Analysis** — phân tích giá trị biên. Bổ sung cho kỹ thuật trên: sau khi có các lớp, ta lấy thêm giá trị ngay tại rìa và sát rìa của mỗi lớp.
>
> **State Transition** — chuyển trạng thái. Dùng khi kết quả phụ thuộc vào thứ tự thao tác. Ví dụ: tạo một sản phẩm, xóa nó, rồi gọi GET lại — lần này phải ra `404`. Chuỗi thao tác mới là thứ được kiểm thử, không phải từng lời gọi riêng lẻ.

**Chú thích dựng phim**

- Khi nói "negative test không phải test bị fail", chèn overlay nhấn mạnh — đây là hiểu nhầm phổ biến nhất của người mới.
- Khi nói dòng Schema, chèn mũi tên gợi ý "→ dẫn tới Contract Testing (Video 1B)".

---

### Cảnh A8 — Postman, các khái niệm cốt lõi (11:45–13:25)

**Slide:** `pages/2.api_testing/2.8.postman_overview.md` & `pages/2.api_testing/2.9.postman_advanced.md` (Slide 11 & 12)

**Lời thoại**

> Có lý thuyết thiết kế test rồi, giờ tới công cụ để hiện thực hóa. Nhóm chọn **Postman** vì đây là nền tảng kiểm thử API phổ biến nhất, có giao diện trực quan cho người mới, nhưng vẫn đi được tới automation đầy đủ — nên ta không phải đổi công cụ giữa chừng.
>
> Có năm khái niệm cần nắm, và chúng sẽ lặp lại suốt seminar.
>
> **Collection** — bộ sưu tập. Là nơi gom nhóm các request theo chức năng, có thể lồng thư mục nhiều tầng. Hãy hình dung nó như một thư mục dự án chứa toàn bộ test của bạn.
>
> **Environment** — môi trường. Là một bộ biến gắn với nơi bạn đang test: `baseUrl` trỏ về `localhost` khi chạy máy mình, trỏ về server staging khi chạy trên CI. Nhờ đó, cùng một collection chạy được ở nhiều môi trường mà **không phải sửa một dòng nào** bên trong request.
>
> **Variable** — biến. Giá trị động, viết trong dấu ngoặc nhọn kép. Biến có nhiều cấp — global, collection, environment, và biến cục bộ theo từng lần chạy — với thứ tự ưu tiên rõ ràng: cấp càng hẹp thì càng thắng.
>
> **Pre-request Script** — đoạn JavaScript chạy **trước** khi request được gửi đi. Dùng để chuẩn bị dữ liệu: sinh token, tính chữ ký, tạo giá trị ngẫu nhiên.
>
> **Test Script** — đoạn JavaScript chạy **sau** khi có response, chứa các **assertion**. Assertion là câu lệnh khẳng định một điều kiện phải đúng; nếu sai thì test được đánh dấu là fail. Đây là nơi biến "một request gửi đi được" thành "một test case thực sự".
>
> _(cột phải)_ Bên cạnh đó Postman còn có **Collection Runner** để chạy hàng loạt request liên tiếp, **Data-driven** để chạy một request với nhiều bộ dữ liệu, **Newman** là bản dòng lệnh dùng cho CI/CD, **Monitor** để chạy test định kỳ, và **Mock Server** để giả lập API khi backend chưa sẵn sàng. Nhóm dùng ba cái đầu; hai cái cuối chỉ giới thiệu để các bạn biết là có.

---

### Cảnh A9 — Tổ chức Collection (13:25–14:35)

**Slide:** `pages/2.api_testing/2.10.postman_collections.md` (Slide 13)

**Lời thoại**

> Đây là cấu trúc collection thật của nhóm. Mình dừng ở đây một chút vì **cách tổ chức collection ảnh hưởng trực tiếp tới việc bộ test có bảo trì nổi hay không**.
>
> Nguyên tắc thứ nhất: có một thư mục **`_Setup`** chạy đầu tiên, làm nhiệm vụ chuẩn bị — ở đây là sinh token. Dấu gạch dưới ở đầu tên để nó luôn nằm trên cùng khi sắp xếp.
>
> Nguyên tắc thứ hai: **nhóm theo HTTP method**, mỗi method một cụm.
>
> Nguyên tắc thứ ba, và là điều quan trọng nhất: trong mỗi method, **tách Happy Path và Negative thành hai thư mục riêng**. Lý do rất thực dụng: hai nhóm này có kỳ vọng khác nhau về bản chất, dùng bộ dữ liệu khác nhau, và khi đọc báo cáo lỗi bạn sẽ biết ngay lỗi thuộc loại nào. Nếu trộn chung, mỗi lần thêm test case bạn sẽ phải dò lại toàn bộ.
>
> Con số bên phải mỗi dòng là số **iteration** — số lần lặp — tức số bộ dữ liệu chạy qua request đó. Cộng lại được **29 test case**, phủ **5 endpoint**, tổ chức trong **9 thư mục**. Các bạn để ý tỉ lệ: nhóm negative có nhiều case hơn hẳn nhóm happy path. Đó là tỉ lệ lành mạnh — trong thực tế, số cách để một API sai luôn nhiều hơn số cách để nó đúng.

---

### Cảnh A10 — Script và Assertion (14:35–15:50)

**Slide:** `pages/2.api_testing/2.11.postman_scripts.md` (Slide 14)

**Lời thoại**

> Nhìn cụ thể vào hai loại script.
>
> _(cột trái)_ **Pre-request Script đặt ở cấp Collection** nghĩa là nó chạy trước **mọi** request trong collection. Nhóm đặt ở đây đoạn code sinh Bearer token hợp lệ, tính theo giờ hiện tại. Nhờ vậy token luôn tươi mới ở mỗi lần chạy, không bao giờ hết hạn giữa chừng, và không có token nào bị viết cứng trong repo.
>
> Kỹ thuật đáng chú ý là cách xử lý ba tình huống xác thực bằng cùng một cơ chế. Trong file dữ liệu, trường `auth_header` nhận ba dạng giá trị: nếu là biến `validToken` thì script thay bằng token hợp lệ; nếu là một chuỗi thời gian từ năm 2020 thì đó là token hết hạn, dùng cho negative test; và nếu là chuỗi rỗng thì script **gỡ hẳn header đi**, tạo ra tình huống không gửi token. Một cơ chế phục vụ cả ba nhóm test case.
>
> _(cột phải)_ Và đây là hình dạng của một **Test Script**. Cú pháp gồm `pm.test`, nhận vào một chuỗi mô tả và một hàm chứa phần kiểm tra.
>
> Test đầu tiên khẳng định status là 200. Test thứ hai đọc body dưới dạng JSON rồi khẳng định object đó **có** các thuộc tính `id`, `name`, `type` — đây chính là schema test mà mình nói ở slide thiết kế test case.
>
> Hai điểm về cách viết. Thứ nhất, **chuỗi mô tả sẽ hiện nguyên văn trong báo cáo**, nên hãy viết nó như một câu khẳng định rõ nghĩa — người đọc báo cáo phải hiểu được lỗi mà không cần mở code. Thứ hai, nên **tách thành nhiều `pm.test` nhỏ** thay vì gộp mọi assertion vào một khối lớn: khi có lỗi, bạn biết chính xác điều kiện nào hỏng, thay vì chỉ biết "có gì đó sai".

---

### Cảnh A11 — Data-driven testing (15:50–17:05)

**Slide:** `pages/2.api_testing/2.12.postman_datadriven.md` (Slide 15)

**Lời thoại**

> **Data-driven testing** — kiểm thử hướng dữ liệu — là kỹ thuật để bộ test của nhóm mở rộng được tới 29 case mà không sinh ra 29 request trùng lặp.
>
> Ý tưởng: giữ **một** request duy nhất, một đoạn test script duy nhất, rồi cấp cho nó **nhiều bộ dữ liệu** từ một file bên ngoài, định dạng JSON hoặc CSV. Mỗi phần tử trong file là một **iteration** — một lần lặp, tức một test case.
>
> Nhìn vào đoạn JSON trên slide, mỗi bộ dữ liệu mang theo cả ba thứ: **danh tính** của test case — `tc_id` và `description`; **đầu vào** — `product_id` và `auth_header`; và quan trọng nhất, **kỳ vọng** — `expected_status`, `expect_field_id`, `expect_field_name`.
>
> Chi tiết đáng học ở đây là kỳ vọng nằm **trong dữ liệu**, không nằm trong script. Nhờ vậy script chỉ có một câu lệnh dạng "status phải bằng `expected_status`", và câu lệnh đó dùng chung cho cả test kỳ vọng 200 lẫn test kỳ vọng 404.
>
> Ba lợi ích, tương ứng ba hộp dưới slide. **Tách logic khỏi dữ liệu**: sửa dữ liệu không đụng vào code. **Dễ thêm case mới**: thêm một phần tử vào file, không cần biết JavaScript — nghĩa là một người kiểm thử không lập trình vẫn mở rộng được bộ test. Và **phù hợp automation**: file dữ liệu truyền thẳng cho Newman trong pipeline.
>
> Nhưng có một cái giá phải trả, và đây là điều Video 3 sẽ cho các bạn thấy: khi một iteration fail, báo cáo chỉ ra "iteration số 7". Nếu bạn không đặt `tc_id` và `description` tử tế, việc dò ngược xem case nào hỏng sẽ rất khổ. Vì vậy hãy coi hai trường đó là bắt buộc.

---

### Cảnh A12 — VS Code REST Client (17:05–17:55)

**Slide:** `pages/2.api_testing/2.13.vscode_restclient.md` (Slide 16)

**Lời thoại**

> Postman không phải lựa chọn duy nhất. Nhóm giới thiệu thêm **REST Client**, một extension của VS Code, để các bạn thấy phổ công cụ.
>
> Cách dùng: tạo một file đuôi `.http`, viết request bằng văn bản thuần, rồi bấm nút **Send Request** hiện ngay phía trên. Không cần rời khỏi trình soạn thảo, không cần mở thêm ứng dụng.
>
> Ưu điểm lớn nhất là request **nằm cùng repo với source code**, nên nó được review trong pull request và được version hóa bằng Git như mọi file khác.
>
> Bảng so sánh bên phải cho thấy sự đánh đổi khá rõ: REST Client không có data-driven, khả năng viết script hạn chế, và không đưa thẳng vào CI/CD được. Postman thì đầy đủ cả ba.
>
> Kết luận thực dụng: **REST Client hợp cho lập trình viên thử nhanh một endpoint trong lúc code; Postman hợp cho việc xây một bộ test hoàn chỉnh và tự động hóa.** Hai công cụ không loại trừ nhau. Bài thực hành trên lớp sẽ dùng cả hai.

---

### Cảnh A13 — API mẫu Product Service (17:55–19:05)

**Slide:** `pages/2.api_testing/2.14.product_service.md` & `pages/2.api_testing/2.15.product_endpoints.md` (Slide 17 & 18)

**Lời thoại**

> Đây là hệ thống mà mọi thứ trong seminar xoay quanh, nên các bạn cần nhớ nó.
>
> **Product Service** viết bằng Node.js và Express, chạy ở cổng `8080`. Xác thực bằng Bearer ISO-8601 trong vòng một giờ như đã nói. Dữ liệu lưu **in-memory** — nằm trong bộ nhớ tiến trình, nghĩa là **mỗi lần khởi động lại, dữ liệu trở về trạng thái ban đầu**.
>
> Đặc điểm in-memory này là cố ý và rất có lợi cho việc dạy: mỗi lần chạy test đều bắt đầu từ một trạng thái sạch và giống hệt nhau. Đây là một khái niệm quan trọng — **test isolation**, tức sự cô lập giữa các lần chạy test. Nếu test của bạn phụ thuộc vào dữ liệu do lần chạy trước để lại, bộ test sẽ trở nên bấp bênh, lúc xanh lúc đỏ.
>
> _(schema)_ Một `Product` có bốn trường: `id`, `type`, `name`, `version`. Hãy nhớ trường **`name`** — ở Video 1B, chính trường này sẽ bị đổi tên để minh họa một breaking change.
>
> _(bảng endpoint)_ Năm endpoint CRUD. Điều mình muốn các bạn để ý là **cột bên phải** — mã lỗi. `GET /products` chỉ có thể lỗi `401`. `GET /product/:id` có thể `401` hoặc `404`. `POST /products` có thể `400` hoặc `401`.
>
> Bảng này chính là **bản đồ để sinh test case**: mỗi ô trong cột "Success" và "Error" tương ứng ít nhất một test case cần viết. Cứ đi hết bảng là bạn có bộ khung 29 case của nhóm.

---

### Cảnh A14 — Chuyển phần B (19:05–19:20)

**Slide:** `pages/3.automation_cicd/3.1.section.md` (Slide 19)

**Lời thoại**

> Đến đây ta đã có bộ test. Nhưng một bộ test chỉ chạy khi có người nhớ bấm nút thì giá trị rất hạn chế. Phần B trả lời câu hỏi: làm sao để nó tự chạy.

---

### Cảnh A15 — Newman (19:20–20:35)

**Slide:** `pages/3.automation_cicd/3.2.newman.md` (Slide 20)

**Lời thoại**

> **Newman** là bản chạy bằng dòng lệnh của Postman — một **CLI runner**. Nó nhận đúng file collection mà bạn xuất ra từ Postman và chạy toàn bộ test **không cần mở giao diện**.
>
> Đây là mắt xích quyết định, vì máy chủ CI không có màn hình. Nhờ Newman, bộ test bạn xây bằng giao diện trực quan chạy được trên hạ tầng tự động mà **không phải viết lại bằng ngôn ngữ khác**.
>
> Newman xuất báo cáo ở nhiều định dạng: ra thẳng màn hình dòng lệnh, ra file HTML để người đọc, và ra file JSON để máy xử lý tiếp.
>
> _(luồng 5 bước)_ Luồng tự động hóa gồm năm bước. Một, khởi động Provider ở `localhost:8080`. Hai — bước hay bị quên — **readiness probe**: gọi liên tục vào endpoint `/health` cho tới khi service trả lời, rồi mới chạy test. Không có bước này, pipeline sẽ hỏng ngẫu nhiên vì test bắn đi trước khi server kịp lắng nghe; đây là loại lỗi **flaky** khó chịu nhất trong CI. Ba, chạy Newman với collection và environment. Bốn, xuất báo cáo. Năm, **upload artifact** — lưu file báo cáo lại — và điểm mấu chốt là phải lưu **kể cả khi test fail**, vì đó chính là lúc ta cần đọc báo cáo nhất.
>
> _(lệnh)_ Lệnh cốt lõi: `newman run` kèm file collection, cờ `-e` cho environment, và các cờ reporter để xuất báo cáo.
>
> Còn một chi tiết không có trên slide nhưng rất quan trọng: **Newman trả về mã thoát khác 0 khi có test fail.** Đó là cách nó báo cho CI biết phải đánh dấu build là hỏng. Toàn bộ khả năng "chặn" của pipeline dựa trên quy ước đơn giản này.

---

### Cảnh A16 — Newman pipeline trên GitHub Actions (20:35–21:25)

**Slide:** `pages/3.automation_cicd/3.3.cicd_pipeline.md` (Slide 21)

**Lời thoại**

> Đưa Newman lên **GitHub Actions**. Workflow tên `newman-api-test.yml`, được kích hoạt khi có push hoặc pull request vào nhánh `main`, và cũng có thể chạy tay.
>
> Các bước nối tiếp nhau: checkout mã nguồn, cài Node 20, cài dependencies, khởi động Provider, chờ `/health` với hạn 30 giây, cài Newman, chạy test, rồi upload báo cáo.
>
> Bốn cấu hình nhỏ ở dưới nhưng đều là thực hành tốt nên học. **`permissions: contents: read`** — cấp quyền tối thiểu cho workflow, để nếu có mã độc lọt vào một dependency thì nó cũng không ghi được gì. **`timeout-minutes: 10`** — chặn pipeline treo vô hạn và đốt tài nguyên. **`concurrency: cancel-in-progress`** — khi push liên tiếp, hủy lần chạy cũ, chỉ giữ lần mới nhất. Và **`if: always()`** — luôn upload báo cáo, kể cả khi bước trước đã fail.
>
> Một điểm đáng nói: pipeline này **không cần khai báo secret nào**, vì token do pre-request script tự sinh tại thời điểm chạy. Đây là lợi ích trực tiếp của thiết kế xác thực kiểu ISO-8601 mà mình nhắc ở đầu video.

---

### Cảnh A17 — Pact pipeline, xem trước bản đồ (21:25–22:05)

**Slide:** `pages/3.automation_cicd/3.4.pact_pipeline.md` & `pages/3.automation_cicd/3.5.pact_verification.md` (Slide 22 & 23)

> **Lưu ý cho người quay:** slide này nằm trong deck **trước** khi Contract Testing được giải thích. Đừng cố giảng sâu ở đây. Nhiệm vụ duy nhất của cảnh này là cho người xem thấy **hình dạng** của pipeline và gieo ba thuật ngữ, để tới Video 1B họ có chỗ móc vào.

**Lời thoại**

> Nhóm còn một pipeline thứ hai, tên `pact-verification.yml`. Mình để slide này ở đây để các bạn thấy trước **hình dạng** của nó; toàn bộ thuật ngữ trong đó sẽ được giải thích đầy đủ ở video sau, nên bây giờ chỉ cần nhìn cấu trúc.
>
> Pipeline có ba job nối tiếp. Job một, phía **Consumer** — bên gọi API — chạy test và sinh ra một file gọi là pact. Job hai, phía **Provider** — bên cung cấp API — lấy file đó về và kiểm chứng xem mình có đáp ứng đúng không. Job ba, tên **`can-i-deploy`**, đóng vai một **quality gate** — cổng chất lượng — trả lời câu hỏi _"phiên bản này có an toàn để triển khai không?"_ và chặn pipeline nếu câu trả lời là không.
>
> Ba từ cần nhớ tạm thời: **Consumer**, **Provider**, và **`can-i-deploy`**. Nếu lúc này các bạn thấy chưa rõ vì sao cần cả một pipeline riêng cho việc này, thì đó chính là câu hỏi mà Video 1B sẽ trả lời.

---

### Cảnh A18 — Hai lớp bảo vệ và chốt Video 1A (22:05–22:55)

**Slide:** `pages/3.automation_cicd/3.6.automation_value.md` (Slide 24)

**Lời thoại**

> Slide này tổng kết Phần B bằng một ý duy nhất: hệ thống của nhóm có **hai lớp bảo vệ tự động**, và chúng bắt hai loại lỗi khác nhau.
>
> Lớp thứ nhất, **Functional**, do Newman và Postman đảm nhiệm, bắt lỗi chức năng: validation sai, xác thực hỏng, payload không đúng.
>
> Lớp thứ hai, **Compatibility**, do Pact đảm nhiệm, bắt **breaking change tại ranh giới giữa Consumer và Provider** — loại lỗi mà lớp thứ nhất, về bản chất, không được thiết kế để nhìn thấy.
>
> Bốn giá trị chung của việc tự động hóa: **phản hồi sớm** vì test chạy ở mỗi lần push; **tái lập được** vì log và artifact được lưu lại; **giảm công thủ công**; và **có bằng chứng** — người review truy ngược được phiên bản nào đã chạy test nào, ra kết quả gì.
>
> Đến đây kết thúc Video 1A. Ta đã đi qua: API và REST, xác thực, sáu loại test case, bộ công cụ Postman và REST Client, và cách đưa test vào CI/CD bằng Newman.
>
> Video 1B sẽ giải quyết câu hỏi còn treo lại: **lớp bảo vệ thứ hai kia là gì, và vì sao chỉ có lớp thứ nhất thì không đủ.** Hẹn gặp lại các bạn ở phần sau.

**Chú thích dựng phim**

- Chèn end card 5 giây: "Hết Video 1A → Tiếp: Video 1B — Contract Testing & Pact".

## 6. Kịch bản chi tiết — Video 1B

### Cảnh B1 — Nối tiếp và chuyển phần C (00:00–00:35)

**Slide:** `pages/4.contract_testing/4.1.section.md` (Slide 25)

**Lời thoại**

> Chào các bạn, đây là phần thứ hai của video lý thuyết. Ở phần trước chúng ta đã xây được một bộ test API khá đầy đủ và cho nó chạy tự động trong CI.
>
> Bây giờ mình đặt một câu hỏi có vẻ nghịch lý: **giả sử mọi test của mọi service đều xanh — liệu hệ thống có chắc chắn chạy đúng không?** Câu trả lời là không. Và toàn bộ Phần C tồn tại để giải thích vì sao.

---

### Cảnh B2 — Vấn đề: mỗi service xanh, hệ thống vẫn đỏ (00:35–02:55)

**Slide:** `pages/4.contract_testing/4.2.the_problem.md` (Slide 26)

**Hình ảnh trên màn hình**

- Ba thẻ hiện dần: Consumer (đỏ), Provider (vàng), Runtime (đỏ). Sau đó hộp câu hỏi màu xanh.

**Lời thoại**

> Trước tiên, thống nhất hai từ sẽ dùng liên tục từ giờ tới cuối video.
>
> **Consumer** — bên tiêu thụ, là bên **gọi** API. Trong hệ thống của nhóm, đó là `FrontendWebsite`. **Provider** — bên cung cấp, là bên **phục vụ** API. Ở đây là `ProductService`.
>
> Lưu ý: đây là **vai trò trong một lần trao đổi cụ thể**, không phải nhãn dán cố định cho một service. Một service có thể là Provider với service này và đồng thời là Consumer của service khác. Trong một hệ thống lớn, mỗi mũi tên gọi API là một cặp Consumer–Provider riêng.
>
> Giờ ta dựng lại một kịch bản có thật, xảy ra thường xuyên trong các đội làm microservices.
>
> _(thẻ 1)_ Consumer — tức đội frontend — viết code đọc trường `product.name` để hiển thị tên sản phẩm lên giao diện. Trong lúc đó, đội backend quyết định đổi tên trường ấy thành `displayName`, vì họ thấy tên mới rõ nghĩa hơn.
>
> _(thẻ 2)_ Đây là phần đáng chú ý nhất. **Unit test của Provider vẫn pass toàn bộ.** Và điều đó hoàn toàn hợp lý — dưới góc nhìn của backend, logic không sai, schema mới cũng nhất quán, mọi test họ viết đều dựa trên schema mới nên đều xanh. Không ai làm gì sai theo tiêu chuẩn của chính mình.
>
> Nếu đội frontend cũng có unit test, những test đó cũng xanh nốt — vì frontend test với dữ liệu giả do chính họ tự dựng lên, mà dữ liệu giả đó vẫn còn trường `name`. Đây là điểm mù kinh điển: **mock của bạn không tự biết là thực tế đã đổi.**
>
> _(thẻ 3)_ Kết quả: lỗi chỉ lộ ra khi hai bên thực sự gặp nhau — trên môi trường staging, tệ hơn là trên production. Và đây là chỗ đắt tiền nhất. Lỗi tìm thấy khi đang code thì sửa mất vài phút. Lỗi tìm thấy trên production thì phải điều tra, phải rollback, phải họp, có khi có cả người dùng bị ảnh hưởng.
>
> _(hộp câu hỏi)_ Vậy câu hỏi mà không lớp test nào ở phần trước trả lời được là: **"Hai phía có còn hiểu cùng một giao thức hay không?"**
>
> Unit test kiểm tra logic bên trong một service. Nó **không** kiểm chứng những giả định vượt qua ranh giới giữa hai service. Mà chính những giả định vượt ranh giới đó — kiểu như "tôi tin rằng response sẽ có trường tên là `name`" — mới là thứ âm thầm gãy.
>
> Contract Testing sinh ra đúng để lấp khoảng trống này.

**Chú thích dựng phim**

- Khi nói "mock của bạn không tự biết là thực tế đã đổi", dừng 1 nhịp và chèn overlay câu này — đây là ý cốt lõi của cả Phần C.

---

### Cảnh B3 — Contract Testing là gì (02:55–05:25)

**Slide:** `pages/4.contract_testing/4.3.definition.md` (Slide 27)

**Hình ảnh trên màn hình**

- Hộp định nghĩa bên trái, ba gạch đầu dòng hiện dần, hộp INTERACTION bên phải với cấu trúc Given/When/Then.

**Lời thoại**

> Định nghĩa: **Contract — hợp đồng — là một đặc tả có thể thực thi được, mô tả những request mà Consumer sẽ gửi và những response mà Provider cam kết đáp ứng.**
>
> Hãy dừng ở cụm **"có thể thực thi được"**, vì đó là toàn bộ điểm khác biệt. Chúng ta đã luôn có "hợp đồng" giữa các đội — dưới dạng tài liệu API, file Swagger, tin nhắn chốt với nhau, hoặc thỏa thuận miệng. Vấn đề của mọi dạng đó là chúng **không tự kiểm tra được**. Tài liệu có thể lỗi thời mà không ai hay, vì không có gì báo động khi code đi lệch khỏi tài liệu.
>
> Contract trong Pact thì khác: nó là một **file máy đọc được**, và có một công cụ **chạy** nó để đối chiếu với API thật. Tài liệu lệch thì im lặng; contract lệch thì làm đỏ pipeline.
>
> Một contract mô tả ba nhóm thông tin.
>
> _(click 1)_ **Request**: method, đường dẫn, query, headers, và body. Đây là mô tả chính xác những gì Consumer sẽ gửi.
>
> _(click 2)_ **Response**: status code, headers, cấu trúc dữ liệu, và **matching rules** — luật so khớp. Mình sẽ quay lại matching rules ở phần sau vì nó là chi tiết tinh tế nhất của Pact.
>
> _(click 3)_ **Context**, hay chính xác hơn là **provider state** — trạng thái của Provider. Đây là **điều kiện tiên quyết** phải đúng thì interaction mới có nghĩa.
>
> Giải thích cho rõ, vì đây là khái niệm người mới hay bỏ qua. Nếu contract nói "gọi `GET /product/10` thì phải nhận về `200` kèm dữ liệu sản phẩm", thì câu đó chỉ đúng **với điều kiện sản phẩm số 10 tồn tại**. Nếu lúc kiểm chứng, cơ sở dữ liệu của Provider trống, API sẽ trả `404` và contract bị coi là vi phạm — trong khi thực ra code hoàn toàn đúng, chỉ là dữ liệu chưa được chuẩn bị.
>
> Vì vậy mỗi interaction mang theo một provider state dạng câu mô tả, ví dụ `"product 10 exists"`. Khi kiểm chứng, phía Provider có một đoạn code gọi là **state handler** đọc câu mô tả đó và dựng đúng dữ liệu cần thiết trước khi chạy. Provider state chính là thứ làm cho contract test **tái lập được** thay vì phụ thuộc may rủi vào dữ liệu có sẵn.
>
> _(hộp phải)_ Và đây là hình dạng một **interaction** — một tương tác, tức một cặp request–response cụ thể trong contract. Nó đọc theo cấu trúc Given–When–Then, rất giống ngôn ngữ đặc tả hành vi mà có thể các bạn đã gặp: **Given** — cho trước sản phẩm 10 tồn tại; **When** — khi gọi `GET /product/10`; **Then** — thì nhận về `200` cùng cấu trúc Product.
>
> Một contract là **tập hợp nhiều interaction** như vậy.
>
> _(dòng cuối)_ Và một giới hạn phải nói ngay từ đầu để tránh kỳ vọng sai: Contract Testing xác minh **tính tương thích**. Nó **không** chứng minh nghiệp vụ đúng. Nếu Provider trả về đúng cấu trúc nhưng tính sai giá trị, contract test vẫn xanh. Mình sẽ nói kỹ hơn ở slide về giới hạn.

---

### Cảnh B4 — So sánh bốn lớp kiểm thử (05:25–07:25)

**Slide:** `pages/4.contract_testing/4.4.comparison.md` (Slide 28)

**Hình ảnh trên màn hình**

- Bảng 4 cột × 6 dòng, hiện dần theo dòng.

**Lời thoại**

> Bảng này định vị Contract Testing giữa các lớp kiểm thử khác. Mình đi theo hàng, và các bạn hãy chú ý cột thứ ba.
>
> _(hàng 1 — Câu hỏi)_ Mỗi lớp trả lời một câu hỏi khác nhau. API Testing hỏi _"endpoint này có đúng không?"_. Contract Testing hỏi _"hai bên còn tương thích không?"_. Integration hỏi _"các thành phần phối hợp có đúng không?"_. E2E hỏi _"hành trình người dùng có chạy trọn không?"_. Bốn câu hỏi khác nhau, nên **không lớp nào thay được lớp nào**.
>
> _(hàng 2 — Phạm vi)_ Contract Testing có phạm vi hẹp nhất và cũng rõ nhất: **đúng một cặp Consumer–Provider**. Sự hẹp này là ưu điểm, không phải nhược điểm — nó là lý do contract test chạy nhanh và chỉ ra lỗi chính xác.
>
> _(hàng 3 — Môi trường)_ Và đây là đặc điểm khiến Contract Testing đặc biệt hữu dụng: nó chạy **cô lập**. Khi Consumer chạy test, nó **không cần Provider thật** — Pact dựng một server giả. Khi Provider kiểm chứng, nó **không cần Consumer thật** — Pact phát lại các request đã ghi. Hai đội có thể kiểm tra tính tương thích mà **không bao giờ phải khởi động hệ thống của nhau**, thậm chí không cần ở cùng múi giờ. So sánh với E2E vốn đòi hỏi dựng gần như toàn bộ hệ thống, khác biệt về chi phí là rất lớn.
>
> _(hàng 4 — Feedback)_ Phản hồi nhanh và rõ. "Rõ" ở đây có nghĩa cụ thể: khi fail, thông báo lỗi chỉ đúng tên trường bị lệch, chứ không phải một stack trace dài mà bạn phải tự đoán.
>
> _(hàng 5 — Điểm mạnh)_ Điểm mạnh của Contract Testing là chống breaking change — thay đổi làm gãy bên đang dùng.
>
> _(hàng 6 — Điểm mù)_ Và điểm mù, nói thẳng: **business logic**. Contract test không biết gì về việc phép tính của bạn có đúng hay không.
>
> _(hộp cuối)_ Nên thông điệp của slide này là: Contract Test **bổ sung** cho Unit, Integration và E2E, chứ không thay thế chúng. Ai bảo bạn "có contract test rồi thì bỏ E2E đi" là đang tư vấn sai.

---

### Cảnh B5 — Kiến trúc Consumer–Provider–Broker (07:25–08:55)

**Slide:** `pages/4.contract_testing/4.5.architecture.md` (Slide 29)

**Hình ảnh trên màn hình**

- Sơ đồ mermaid: Consumer → Provider API → Provider data. Sau đó hai hộp vai trò và hộp Pact Broker.

**Lời thoại**

> Sơ đồ trên cùng là quan hệ ta đang nói tới: `FrontendWebsite` gửi HTTP request tới `ProductService`, nhận response về; `ProductService` đọc dữ liệu của nó.
>
> Trong quan hệ đó, mỗi bên có một trách nhiệm riêng trong quy trình contract testing.
>
> _(hộp trái)_ **Consumer** có trách nhiệm **mô tả chính xác phần API mà nó thực sự sử dụng** — và chỉ phần đó thôi. Kết quả của việc mô tả này là một file **pact**, định dạng JSON. Mình nhấn mạnh chữ "thực sự sử dụng": nếu API trả về hai mươi trường mà Consumer chỉ dùng ba, thì contract chỉ nên nói về ba trường ấy. Lý do sẽ rõ ở slide sau.
>
> _(hộp phải)_ **Provider** có trách nhiệm **chứng minh rằng implementation của mình đáp ứng mọi interaction** trong file pact đó. Việc chứng minh này gọi là **verification** — kiểm chứng.
>
> _(hộp dưới)_ Và thành phần thứ ba: **Pact Broker** — kho trung tâm. Nếu chỉ có hai service thì bạn có thể chép tay file pact qua lại. Nhưng khi có mười, hai mươi service, mỗi service lại có nhiều phiên bản đang chạy song song, bạn cần một nơi lưu trữ có tổ chức.
>
> Broker lưu ba thứ và liên kết chúng: **contract**, **phiên bản** của mỗi bên, và **kết quả verification**. Từ ba thứ đó nó dựng nên **compatibility matrix** — ma trận tương thích, một bảng tra cứu cho biết phiên bản Consumer nào đã được xác nhận là chạy được với phiên bản Provider nào.
>
> Và trên nền ma trận đó, ta có lệnh **`can-i-deploy`** — "tôi có được phép triển khai không". Đây chính là ba thuật ngữ mình đã gieo ở cuối Video 1A. Cơ chế cụ thể của nó sẽ được nói ở Phần D.

---

### Cảnh B6 — Vì sao consumer-driven (08:55–10:25)

**Slide:** `pages/4.contract_testing/4.6.why_consumer_driven.md` (Slide 30)

**Lời thoại**

> Tên đầy đủ của kỹ thuật này là **Consumer-Driven Contract Testing** — kiểm thử hợp đồng do bên tiêu thụ dẫn dắt. Slide này giải thích vì sao lại là "consumer-driven", vì đây là lựa chọn thiết kế có chủ đích chứ không phải ngẫu nhiên.
>
> _(hộp đỏ)_ Cách làm trực giác hơn là **provider-driven**: Provider công bố toàn bộ schema của mình, và các Consumer phải tự thích nghi. Nghe hợp lý, và thực tế nhiều nơi làm vậy.
>
> Nhưng nó có một điểm yếu nghiêm trọng: **Provider không biết phần nào trong API của mình đang thực sự được dùng.** Đứng ở vị trí đội backend, bạn có một trường trong response mà bạn tin là không ai dùng nữa. Bạn có dám xóa không? Thường là không — vì bạn không có cách nào chứng minh. Kết quả là API phình ra theo thời gian, đầy những trường không ai dám đụng vào. Hoặc tệ hơn: có người dám xóa, và một Consumer nào đó gãy trong im lặng.
>
> _(hộp xanh)_ Cách làm **consumer-driven** đảo ngược hướng thông tin. **Mỗi Consumer tự phát hành các interaction mà nó phụ thuộc vào.** Provider thu về tập hợp các contract đó, và tập hợp ấy chính là **bản kê khai nhu cầu thực tế** của tất cả các bên đang dùng mình.
>
> Lợi ích rất cụ thể: Provider giờ đây **biết chính xác trường nào đang được ai dùng**. Muốn xóa một trường? Kiểm tra xem có contract nào nhắc tới nó không. Không có thì xóa an toàn. Có thì biết ngay phải nói chuyện với đội nào.
>
> Điều này cũng lý giải nguyên tắc mình nói ở slide trước — contract chỉ nên mô tả phần Consumer thực sự dùng. Nếu Consumer mô tả thừa những trường nó không đụng tới, nó vô tình khóa tay Provider, không cho Provider tiến hóa những phần lẽ ra được tự do thay đổi.
>
> _(ba bước dưới)_ Ba bước tóm tắt: Consumer nêu nhu cầu, Provider xác minh, và hai đội cùng tiến hóa.
>
> Mình muốn nói rõ một điều để tránh hiểu sai: **consumer-driven không có nghĩa là Consumer được quyền áp đặt.** Nếu Consumer yêu cầu điều gì đó vô lý, Provider hoàn toàn có quyền từ chối và hai bên ngồi lại. Contract ở đây là **công cụ hỗ trợ cuộc hội thoại giữa hai đội**, làm cho các giả định ngầm trở nên hiện hình và kiểm tra được. Nó không thay thế việc thiết kế API cho tử tế.

---

### Cảnh B7 — Giới hạn của Contract Testing (10:25–11:55)

**Slide:** `pages/4.contract_testing/4.7.limitations.md` (Slide 31)

**Lời thoại**

> Trước khi đi vào cơ chế, mình dành một slide cho **giới hạn**. Đây là phần quan trọng về mặt nghề nghiệp: hiểu công cụ **không** làm được gì thì mới dùng nó đúng chỗ.
>
> _(hộp 1)_ **Business logic nội bộ.** Đây là giới hạn lớn nhất. Nếu API trả về đúng cấu trúc — có trường `total`, kiểu số — nhưng giá trị trong đó tính sai tổng tiền, thì contract test **vẫn xanh**. Contract kiểm tra **hình dạng** của dữ liệu, không kiểm tra **tính đúng đắn** của nó. Việc đó là của unit test và integration test.
>
> _(hộp 2)_ **Hạ tầng production.** DNS, chứng chỉ TLS, cấu hình API gateway, timeout, giới hạn tốc độ — contract test chạy trong môi trường cô lập nên hoàn toàn không chạm tới những thứ này. Cần lớp giám sát và smoke test riêng trên môi trường thật.
>
> _(hộp 3)_ **Hành trình qua nhiều service.** Một pact chỉ chứng minh **một** ranh giới. Nếu một thao tác của người dùng đi qua bốn service liên tiếp, việc từng cặp tương thích **không** bảo đảm cả chuỗi cho ra kết quả đúng. Đó vẫn là địa hạt của E2E.
>
> _(hộp 4)_ **Chất lượng thiết kế API.** Tương thích không có nghĩa là dễ dùng, nhất quán hay an toàn. Một API đặt tên lộn xộn, trả mã lỗi tùy tiện, vẫn có thể có contract test xanh toàn bộ.
>
> _(dòng cuối)_ Nên câu tổng kết đáng nhớ nhất của cả Phần C là dòng này: **Unit lo logic · Contract lo tính tương thích · Integration lo việc đấu nối · E2E lo các hành trình trọng yếu.** Bốn lớp, bốn loại rủi ro. Đừng dùng lớp này để bắt lỗi của lớp kia.

---

### Cảnh B8 — Chuyển phần D (11:55–12:10)

**Slide:** `pages/5.demo_pact/5.1.section.md` (Slide 32)

**Lời thoại**

> Ta đã hiểu Contract Testing giải quyết vấn đề gì. Phần D đi vào **cơ chế**: Pact thực sự làm điều đó như thế nào, qua bốn bước — Consumer, contract, Provider, và Broker.

---

### Cảnh B9 — Bước 1: Consumer tạo contract (12:10–14:00)

**Slide:** `pages/5.demo_pact/5.2.consumer_side.md` (Slide 33)

**Hình ảnh trên màn hình**

- Sơ đồ tuần tự mermaid với ba đối tượng: Consumer test, Pact mock provider, Real API client code.

**Lời thoại**

> Bước đầu tiên diễn ra hoàn toàn ở phía Consumer. Mình đi theo sơ đồ tuần tự này từ trên xuống, vì thứ tự ở đây quyết định việc bạn có hiểu đúng Pact hay không.
>
> Trước hết, để ý sơ đồ có **ba** đối tượng chứ không phải hai. Có **đoạn test**, có **mock provider** — server giả do Pact dựng lên — và có **code client thật của Consumer**, tức đoạn code sẽ thực sự chạy trên production.
>
> _(mũi tên 1)_ Đoạn test bắt đầu bằng việc **đăng ký một interaction kỳ vọng** với mock provider. Nói cách khác: "tôi sắp gửi một request như thế này, và tôi cần bạn trả về một response như thế kia".
>
> _(mũi tên 2)_ Sau đó — và đây là điểm mấu chốt — test **gọi vào code client thật**. Không phải test tự tay tạo một HTTP request. Nó gọi đúng hàm mà ứng dụng thật sẽ gọi, ví dụ một hàm `getProduct(10)`.
>
> _(mũi tên 3)_ Code client thật đó phát sinh request thật, gửi tới mock provider đang chạy trên một cổng cục bộ.
>
> _(mũi tên 4)_ Mock provider trả về response đã đăng ký.
>
> _(mũi tên 5)_ Mock provider đồng thời **kiểm tra ngược lại**: request nó nhận được có khớp với thứ đã đăng ký không. Nếu code client gửi sai đường dẫn, thiếu header xác thực, hay sai method — test fail ngay tại đây.
>
> _(mũi tên 6)_ Khi mọi thứ khớp, Pact ghi ra file **pact.json**.
>
> Vậy nên bước này làm **hai việc cùng lúc**, và cần nhìn ra cả hai. Việc thứ nhất: nó **kiểm thử code client của Consumer** — bảo đảm client gọi đúng cách. Việc thứ hai: nó **ghi lại thành hợp đồng** những gì Consumer cần.
>
> _(hộp dưới)_ Từ đó suy ra nguyên tắc trên slide: **mock provider không thay thế code Consumer.** Nếu bạn viết test theo kiểu tự dựng một request bằng tay rồi bắn vào mock, bạn sẽ có một file pact trông rất đẹp — nhưng nó mô tả một Consumer **tưởng tượng**, không phải Consumer thật của bạn. Contract khi đó vô giá trị, vì nó chứng nhận cho một thứ không tồn tại. Đây là lỗi phổ biến nhất khi mới dùng Pact.

**Chú thích dựng phim**

- Dùng công cụ vẽ khoanh riêng đối tượng "Real API client code" khi nói tới mũi tên 2.

---

### Cảnh B10 — Giải phẫu pact.json và matcher (14:00–16:00)

**Slide:** `pages/5.demo_pact/5.3.contract_anatomy.md` (Slide 34)

**Hình ảnh trên màn hình**

- Khối JSON có ba bước highlight: dòng 2–4 và 7–12, rồi 14–18, rồi toàn bộ.

**Lời thoại**

> Đây là hình dạng thật của một interaction bên trong file pact. File thật dài hơn và có thêm phần metadata, nhưng phần cốt lõi đúng như trên slide.
>
> _(highlight 1)_ Trên cùng là **`description`** — mô tả interaction, ở đây là `"get product 10"`. Chuỗi này sẽ hiện trong báo cáo verification, nên hãy đặt cho rõ nghĩa.
>
> Ngay dưới là **`providerState`**: `"product 10 exists"` — chính là khái niệm provider state mình đã giải thích. Chuỗi này sẽ được phía Provider đọc để dựng dữ liệu trước khi kiểm chứng.
>
> Rồi tới **`request`** — method `GET`, path `/product/10`. Đây là thứ Pact sẽ phát lại nguyên văn ở bước sau.
>
> _(highlight 2)_ Tiếp theo là **`response`**: status `200`, và body có ba trường `id`, `name`, `type`.
>
> Ở đây có một câu hỏi rất tự nhiên mà mình muốn các bạn tự đặt ra: **giá trị `"28 Degrees"` trong body có ý nghĩa gì?** Chẳng lẽ khi kiểm chứng, Provider bắt buộc phải trả về đúng chuỗi ký tự đó?
>
> _(highlight 3)_ Câu trả lời nằm ở **`matchingRules`** — luật so khớp, và đây là chi tiết tinh tế nhất của Pact.
>
> Mặc định, Pact so khớp **chính xác từng giá trị**. Nhưng như thế thì contract sẽ vỡ ngay khi dữ liệu thay đổi, dù API không hề đổi. Nên Pact cho phép khai báo: với trường này, tôi **không** quan tâm giá trị cụ thể, tôi chỉ cần **đúng kiểu dữ liệu**.
>
> Ở đây, `$.body.id` và `$.body.name` được khai báo là `type:string`. Nghĩa là: _"tôi cần trường `name` tồn tại và là chuỗi ký tự; nội dung là gì thì tùy Provider."_ Còn giá trị `"28 Degrees"` chỉ đóng vai **dữ liệu ví dụ** — nó cho mock provider có cái gì đó để trả về trong lúc chạy test phía Consumer.
>
> Ngoài matcher theo kiểu, Pact còn có matcher theo **biểu thức chính quy** — regex. Repo của nhóm có **10 interaction**, và cả **10** đều dùng một regex matcher cho header `Authorization` để mô tả định dạng Bearer ISO-8601. Điều này rất hợp lý: token thay đổi mỗi lần chạy, nên không thể so khớp chính xác; nhưng **định dạng** thì phải đúng, và regex diễn đạt được đúng ý đó.
>
> _(hộp dưới)_ Nguyên tắc dùng matcher gói trong ba vế. **Chặt** với những gì Consumer thực sự phụ thuộc. **Lỏng** với dữ liệu động như id sinh tự động, timestamp, token. Và **không over-specify cũng không under-specify**.
>
> Giải thích hai lỗi này vì chúng đối xứng nhau. **Over-specify** — mô tả quá chặt: bạn khóa cả những thứ mình không dùng, khiến Provider không tiến hóa được và pipeline đỏ vì những thay đổi vô hại. **Under-specify** — mô tả quá lỏng: contract không còn bắt được lỗi thật, và bạn có một lưới an toàn giả. Chọn đúng độ chặt cho từng trường chính là kỹ năng cốt lõi khi viết contract.

---

### Cảnh B11 — Bước 2: Provider xác minh contract (16:00–17:50)

**Slide:** `pages/5.demo_pact/5.4.provider_side.md` (Slide 35)

**Hình ảnh trên màn hình**

- Sơ đồ tuần tự bốn đối tượng: Pact verifier, Provider state handler, Real Provider API, Pact Broker.

**Lời thoại**

> Bước hai diễn ra ở phía Provider, thường là trong pipeline CI của đội backend.
>
> Trước khi đọc sơ đồ, mình muốn xóa một hiểu nhầm rất phổ biến: **verification không hề gọi tới Consumer.** Consumer có thể đang offline, đang được viết lại, hoặc do một đội ở nước khác quản lý. Cái duy nhất Provider cần là **file pact**. Công cụ **verifier** sẽ đóng vai Consumer và phát lại các request đã được ghi trong đó.
>
> _(mũi tên 1–2)_ Verifier lấy file pact về từ **Broker**. Nó cũng có thể đọc từ file cục bộ, nhưng lấy từ Broker mới là cách dùng đúng trong CI, vì khi đó nó luôn kiểm chứng phiên bản contract mới nhất mà Consumer đã công bố.
>
> _(mũi tên 3–4)_ Với mỗi interaction, verifier đọc `providerState` và gọi tới **state handler** tương ứng ở phía Provider — đoạn code có nhiệm vụ dựng dữ liệu. Ở đây, state handler cho `"product 10 exists"` sẽ chèn sản phẩm số 10 vào kho dữ liệu. Xong, nó báo "trạng thái đã sẵn sàng".
>
> _(mũi tên 5–6)_ Verifier **phát lại request thật** — `GET /product/10` — vào **API thật đang chạy**. Không mock, không giả lập. Request đi qua toàn bộ routing, middleware, tầng xử lý y như một request bình thường. Provider trả về response thật.
>
> _(mũi tên 7)_ Verifier **đối chiếu** response nhận được với những gì contract yêu cầu — status, headers, cấu trúc body, theo đúng các matching rules đã khai báo.
>
> _(mũi tên 8)_ Cuối cùng nó **công bố kết quả verification lên Broker**. Bước này thường bị quên nhưng lại rất quan trọng: không có kết quả trên Broker thì `can-i-deploy` không có gì để tra cứu.
>
> _(ba hộp dưới)_ Ba đặc tính đáng ghi nhớ. **Real routing** — request đi vào API thật, nên nếu bạn cấu hình sai route hay middleware, verification bắt được. **Controlled state** — dữ liệu được dựng lại y hệt ở mỗi lần chạy, nên kết quả tái lập được chứ không phụ thuộc vào việc cơ sở dữ liệu đang chứa gì. Và **precise diff** — khi lệch, báo lỗi chỉ đúng trường bị gãy: mong đợi trường này, nhận được trường kia. Bạn không phải đi dò.

---

### Cảnh B12 — Broker và deployment gate (17:50–19:20)

**Slide:** `pages/5.demo_pact/5.5.broker_cicd.md` (Slide 36)

**Hình ảnh trên màn hình**

- Sơ đồ mermaid hai khối: "Contract lifecycle" và "Deployment gate".

**Lời thoại**

> Slide này ghép mọi thứ lại thành một vòng đời hoàn chỉnh.
>
> _(khối trên)_ **Vòng đời contract.** Consumer chạy test, sinh ra pact file. Pact file được **publish** — công bố — lên Broker. Provider **fetch** — lấy về — và chạy verification. Kết quả verification quay ngược lên Broker và trở thành một ô trong **compatibility matrix**.
>
> Điểm cần thấy ở đây là **Consumer và Provider không bao giờ gọi trực tiếp tới nhau trong quy trình này**. Broker đứng giữa, làm điểm hẹn. Nhờ vậy hai đội hoàn toàn không cần đồng bộ lịch làm việc.
>
> _(khối dưới)_ **Cổng triển khai.** Từ ma trận tương thích, lệnh **`can-i-deploy`** đặt một câu hỏi rất cụ thể: _"phiên bản X của service này, nếu đưa lên môi trường Y — nơi đang chạy những phiên bản cụ thể nào đó của các service khác — thì đã được xác nhận là tương thích chưa?"_
>
> Nếu câu trả lời là **compatible**, pipeline chạy tiếp và service được deploy độc lập.
>
> Nếu là **failed** — tức có verification hỏng — pipeline dừng. Điều này dễ hiểu.
>
> Nhưng hãy chú ý nhánh thứ ba trên sơ đồ: **unknown** — chưa biết. Trường hợp này cũng **chặn deploy**. Và đây là một quyết định thiết kế rất đáng học: "chưa có kết quả kiểm chứng" được xử lý **giống như** "kiểm chứng thất bại". Lý do là nếu hệ thống mặc định cho qua khi thiếu dữ liệu, thì chỉ cần một job publish bị lỗi là cổng an toàn tự động mở toang mà không ai biết. Nguyên tắc chung ở đây gọi là **fail-safe**: khi không chắc chắn, chọn phương án an toàn.
>
> _(hộp dưới)_ Tóm lại, giá trị của Broker nằm ở chỗ nó **liên kết ba thứ**: phiên bản Consumer, phiên bản Provider, và kết quả verification giữa chúng. Ba thứ đó tạo nên ma trận tương thích — thứ cho phép các service **triển khai độc lập mà vẫn có kiểm soát**. Đó chính là lời hứa lớn nhất của Contract Testing.

---

### Cảnh B13 — Case study Product Service (19:20–20:10)

**Slide:** `pages/5.demo_pact/5.6.case_study.md` & `pages/5.demo_pact/5.7.case_study_results.md` (Slide 37 & 38)

**Lời thoại**

> Áp dụng vào hệ thống của nhóm. Consumer là `FrontendWebsite`, Provider là `ProductService`.
>
> Bộ contract có **10 interaction**, và cách chia rất đáng học: **mỗi nhóm API có đúng hai interaction — một luồng thành công và một luồng lỗi.** `GET /products` có trường hợp có dữ liệu và trường hợp danh sách rỗng. `GET /product/:id` có tồn tại và không tồn tại. `POST` có tạo thành công và lỗi validation. `PUT` và `DELETE` tương tự.
>
> Điểm đáng chú ý là **danh sách rỗng cũng là một interaction riêng**. Vì với Consumer, "trả về mảng rỗng" và "trả về mảng có phần tử" là hai hành vi khác nhau mà giao diện phải xử lý khác nhau. Nếu Provider đổi từ trả mảng rỗng sang trả `404`, frontend sẽ gãy — và chỉ contract cho trường hợp rỗng mới bắt được thay đổi đó.
>
> _(kết quả)_ Kết quả hiện tại: **10 trên 10** interaction pass ở phía Consumer, và verification phía Provider **pass**.
>
> Hai lệnh chạy ở dưới slide, mình chỉ đọc lướt: một lệnh cho consumer test, một lệnh cho provider verification. **Việc chạy thật, xem output ra sao, các bạn sẽ thấy đầy đủ ở Video 3.**

---

### Cảnh B14 — Breaking change và bài học (20:10–21:30)

**Slide:** `pages/5.demo_pact/5.8.breaking_change.md` (Slide 39)

**Lời thoại**

> Slide này là phần chốt của Phần D, và cũng là nội dung chính của bài Mini Exercise trên lớp. Ở đây mình giải thích **cơ chế và bài học**; phần chạy thật nằm ở Video 3.
>
> _(kịch bản)_ Kịch bản: Provider đổi tên trường `name` thành `title` trong response. Đúng loại thay đổi mà mình mô tả ở đầu Video 1B.
>
> Điểm cần chú ý: **HTTP status vẫn là `200`.** API vẫn phản hồi, vẫn trả về JSON hợp lệ, không có exception nào được ném ra. Nhìn từ bên ngoài, mọi thứ **có vẻ** vẫn hoạt động.
>
> Nhưng contract của Consumer yêu cầu có trường `name`. Và trường đó giờ không còn.
>
> _(kết quả)_ Khi chạy verification, Provider **fail**. Pact chỉ rõ điểm lệch: mong đợi trường `name`, nhận được `title`. Khôi phục lại tên cũ, verification **pass** trở lại.
>
> _(hộp bài học)_ Ba bài học, và mình muốn dừng ở bài học thứ hai.
>
> Thứ nhất: **đổi tên một trường là breaking change**, kể cả khi status code không đổi. "Breaking change" nghĩa là thay đổi làm gãy bên đang sử dụng. Đây là loại thay đổi trông vô hại nhất mà gây hậu quả thật.
>
> Thứ hai — và đây là điều đáng suy nghĩ: **functional test có thể không phát hiện được.** Hãy nhớ lại bộ 29 test case Postman ở Video 1A. Nếu một test chỉ khẳng định "status là 200", nó **vẫn xanh** sau thay đổi này. Nó chỉ đỏ nếu có assertion kiểm tra sự tồn tại của trường `name`. Nói cách khác, functional test **có thể** bắt được lỗi này, nhưng chỉ khi người viết test đã chủ động nghĩ tới. Còn contract test bắt được **theo thiết kế**, vì đó chính là việc nó sinh ra để làm.
>
> Thứ ba: contract test phát hiện ngay **tại bước provider verification**, tức là trong CI của đội backend, **trước khi** thay đổi được merge và deploy. Lỗi bị chặn ở chỗ rẻ nhất để sửa.
>
> Nếu các bạn chỉ nhớ một slide của cả Phần C và D, hãy nhớ slide này.

---

### Cảnh B15 — Chuyển phần E (21:30–21:45)

**Slide:** `pages/6.ai_testing/6.1.section.md` (Slide 40)

**Lời thoại**

> Phần E nói về một khía cạnh mà nhóm áp dụng xuyên suốt dự án: dùng AI như một công cụ hỗ trợ trong quy trình kiểm thử.

---

### Cảnh B16 — AI trong quy trình testing (21:45–23:15)

**Slide:** `pages/6.ai_testing/6.2.ai_in_testing.md` & `pages/6.ai_testing/6.3.ai_principles.md` (Slide 41 & 42)

**Lời thoại**

> _(cột trái)_ AI hỗ trợ được ở bốn chỗ trong công việc kiểm thử. **Sinh test case từ đặc tả API** — đưa vào một mô tả endpoint, nhận về danh sách các trường hợp cần kiểm tra. **Gợi ý cấu trúc Collection** — tổ chức thư mục, đặt tên. **Review contract và phát hiện thiếu sót** — ví dụ chỉ ra rằng bạn có interaction cho trường hợp thành công mà chưa có cho trường hợp lỗi. Và **tạo sơ đồ, tài liệu, workflow mẫu**.
>
> Điểm chung của bốn việc này: chúng đều là những việc **tốn thời gian nhưng có khuôn mẫu rõ ràng**. Đó là chỗ AI hữu dụng nhất.
>
> _(công cụ)_ Nhóm dùng Claude, ChatGPT và Gemini cho phần nghiên cứu và soạn thảo; **Postman Postbot** để sinh test script ngay trong Postman; và một **Agent Skill** tự viết để sinh test từ đặc tả API — mình sẽ nói ở slide sau.
>
> _(cột phải)_ Bốn nguyên tắc mà nhóm tự đặt ra khi làm việc với AI. Phần này quan trọng hơn danh sách công cụ, vì nó là thứ quyết định chất lượng đầu ra.
>
> **Một — hướng dẫn AI từng bước, không prompt chung chung.** Yêu cầu kiểu "viết test cho API của tôi" cho ra kết quả chung chung và thường sai ngữ cảnh. Chia nhỏ: mô tả endpoint, nêu ràng buộc, chỉ định loại test case cần sinh, rồi mới yêu cầu viết.
>
> **Hai — con người review mọi đầu ra, phân loại thành VALID, INVALID hoặc INCOMPLETE.** Đây là nguyên tắc nghiêm ngặt nhất. AI có thể sinh ra test case trông rất hợp lý nhưng kỳ vọng sai status code, hoặc bịa ra một endpoint không tồn tại. Mọi thứ AI tạo ra đều là **bản nháp cần kiểm chứng**, không phải kết quả cuối.
>
> **Ba — AI Audit Report.** Nhóm ghi log toàn bộ quá trình: prompt đã dùng, đầu ra nhận được, và người review đã sửa gì. Việc này cho phép truy vết được vì sao một test case tồn tại, và là yêu cầu bắt buộc theo hướng dẫn sử dụng AI của khoa.
>
> **Bốn — quality over completion.** Thà có một bộ test nhỏ mà đúng và hiểu được, còn hơn một bộ test đồ sộ do AI sinh hàng loạt mà không ai kiểm tra. Test sai còn nguy hiểm hơn không có test, vì nó tạo cảm giác an toàn giả.

---

### Cảnh B17 — Agent Skill (23:15–24:30)

**Slide:** `pages/6.ai_testing/6.4.agent_skill.md` (Slide 43)

**Lời thoại**

> **Agent Skill** là một tập hướng dẫn được đóng gói, để AI thực hiện lặp lại một quy trình cụ thể thay vì phải viết lại prompt mỗi lần. Có thể hình dung như một hàm: có đầu vào, có các bước xử lý, có đầu ra xác định.
>
> _(ba hộp)_ **Đầu vào** là đặc tả API — file OpenAPI, tức chuẩn mô tả API phổ biến nhất hiện nay dưới dạng YAML hoặc JSON, hoặc đơn giản là một file Markdown mô tả endpoint.
>
> **Xử lý**: phân tích từng endpoint, sinh test case theo các nhóm mà mình đã trình bày ở Video 1A — happy path, negative, authentication, validation, schema, boundary — rồi lắp thành Postman Collection.
>
> **Đầu ra**: file Collection JSON, các file dữ liệu, và test script.
>
> _(hai con số)_ Về tính tái sử dụng — đây là một tiêu chí đánh giá của đồ án. Trên **80%** phần mã nguồn và prompt có thể tái sử dụng cho một API khác. Riêng bản thân Agent Skill, các workflow CI/CD và Newman runner thì tái sử dụng **100%** — vì chúng không gắn với nghiệp vụ của Product Service.
>
> _(hộp demo)_ Và cách nhóm chứng minh con số đó: chạy Agent Skill trên một API hoàn toàn khác — **Swagger PetStore**, một API công khai không liên quan gì tới Product Service — trên môi trường máy sạch. Nếu skill sinh ra được bộ test dùng được cho PetStore mà không phải sửa, thì tính tái sử dụng là có thật chứ không phải tự nhận. **Phần demo này nằm ở Video 3.**

---

### Cảnh B18 — Chuyển phần F (24:30–24:45)

**Slide:** `pages/7.summary/7.1.section.md` (Slide 44)

**Lời thoại**

> Phần cuối, tổng kết lại toàn bộ và trả lời câu hỏi thực dụng nhất: khi nào thì dùng cái gì.

---

### Cảnh B19 — API Testing và Contract Testing (24:45–25:55)

**Slide:** `pages/7.summary/7.2.comparison_summary.md` (Slide 45)

**Lời thoại**

> Bảng này đặt hai chủ đề chính cạnh nhau. Mình đi nhanh vì các bạn đã có nền.
>
> **Câu hỏi**: một bên hỏi _"endpoint hoạt động đúng không?"_, bên kia hỏi _"hai bên còn tương thích không?"_. **Công cụ**: Postman với Newman, so với Pact. **Phạm vi**: nhiều endpoint nhiều case, so với đúng một cặp Consumer–Provider. **Dữ liệu**: file CSV hoặc JSON theo kiểu data-driven, so với các interaction kèm matcher. **Tự động hóa**: Newman trong GitHub Actions, so với verification cộng `can-i-deploy`. **Phát hiện**: lỗi chức năng, validation, xác thực — so với breaking change tại ranh giới.
>
> _(dòng cuối)_ Và dòng quan trọng nhất là dòng cuối cùng: **cả hai đều cần thiết.** Đây không phải hai lựa chọn thay thế nhau để bạn chọn một. Chúng che hai vùng rủi ro khác nhau, và vùng nào không được che thì vẫn hở.

---

### Cảnh B20 — Khi nào dùng gì (25:55–26:55)

**Slide:** `pages/7.summary/7.3.when_to_use.md` (Slide 46)

**Lời thoại**

> Cụ thể hơn, đây là các dấu hiệu để nhận biết.
>
> _(cột trái)_ Dùng **API Testing** khi bạn cần kiểm tra chức năng của endpoint, kiểm tra validation đầu vào đầu ra, kiểm tra xác thực và phân quyền, hoặc xây một **regression suite** — bộ test chạy lại sau mỗi thay đổi để phát hiện lỗi cũ tái phát. Nói ngắn gọn: **hầu như dự án nào có API cũng cần lớp này.**
>
> _(cột phải)_ Dùng **Contract Testing** khi có các dấu hiệu sau: nhiều service phát triển **độc lập** bởi các đội khác nhau; đội bạn **hay gặp breaking change** lúc tích hợp; bạn cần một **cổng chặn deploy**; hoặc bạn muốn phát hiện lệch **trước khi** lên staging.
>
> Nói ngược lại cho rõ: nếu bạn đang làm một ứng dụng một khối, một đội, deploy cùng lúc toàn bộ — thì Contract Testing mang lại ít giá trị, vì không có ranh giới nào tiến hóa độc lập cả. **Contract Testing giải quyết vấn đề của sự độc lập; không có sự độc lập thì không có vấn đề đó.**
>
> _(hộp dưới)_ Và chiến lược tổng thể, đây là câu đáng chép lại: **Unit lo logic · Contract lo tính tương thích · API và Integration lo chức năng và đấu nối · Ít E2E, chỉ dành cho các hành trình trọng yếu.** Chữ "ít" ở E2E là có chủ đích: E2E đắt, chậm và hay bị flaky, nên chỉ dùng cho những luồng quan trọng nhất.

---

### Cảnh B21 — Adoption path (26:55–27:50)

**Slide:** `pages/7.summary/7.4.adoption_path.md` (Slide 47)

**Lời thoại**

> Nếu sau video này các bạn muốn áp dụng vào một dự án thật, đây là lộ trình năm bước — và bước đầu tiên là bước quan trọng nhất.
>
> **Một — chọn một ranh giới rủi ro.** Đúng một cặp Consumer–Provider, chọn cặp hay thay đổi nhất hoặc hay gãy nhất. **Đừng bắt đầu bằng cách contract hóa mọi endpoint** — đó là cách chắc chắn nhất để cả đội bỏ cuộc sau hai tuần.
>
> **Hai — viết contract cho một đến hai luồng quan trọng**, gồm một luồng thành công và một hành vi lỗi. Nhỏ thôi, nhưng phải chạy được từ đầu đến cuối.
>
> **Ba — đưa vào CI**: consumer test và provider verification chạy tự động. Contract chỉ có giá trị khi nó chạy tự động; contract chạy tay thì cũng lỗi thời như tài liệu.
>
> **Bốn — thêm Broker và `can-i-deploy`**, nhưng chỉ khi quy trình đã ổn định. Thêm quá sớm sẽ tạo thêm thứ phải bảo trì trong khi lợi ích chưa rõ.
>
> **Năm — đo hiệu quả**: có bao nhiêu lỗi được phát hiện trước staging, thời gian phản hồi bao lâu, có bao nhiêu lần deploy bị chặn **đúng**. Bước này hay bị bỏ qua, nhưng nó là thứ giúp bạn thuyết phục được đội và quản lý rằng công sức bỏ ra là xứng đáng.

---

### Cảnh B22 — Ba từ khóa và kết (27:50–28:50)

**Slide:** `pages/7.summary/7.5.takeaways.md` & `pages/7.summary/7.6.resources.md` & `pages/7.summary/7.7.official_docs.md` (Slide 48 & 49 & 50)

**Lời thoại**

> Nếu phải gói cả hai video vào ba từ, đó là **Fast — Focused — Safe**.
>
> **Fast**: phản hồi sớm, ngay tại máy cá nhân và trong CI, thay vì đợi tới lúc tích hợp.
>
> **Focused**: khoanh đúng ranh giới giữa Consumer và Provider, nên khi hỏng thì biết chính xác hỏng ở đâu.
>
> **Safe**: các service tiến hóa độc lập **có kiểm soát** — vẫn đi nhanh, nhưng có cổng chặn khi sắp gãy.
>
> _(chuyển slide Resources)_ Tóm tắt lại toàn bộ: **API Testing và Contract Testing giải quyết hai nhóm rủi ro khác nhau.** Newman cộng GitHub Actions cho ta một regression suite tự động. Pact cho ta contract artifact, provider verification, và cổng kiểm soát tương thích.
>
> Về tài liệu: repository của nhóm có sẵn source code API mẫu, collection Postman kèm file dữ liệu, phần Pact và các workflow CI/CD. Tài liệu gốc nên đọc thêm là `docs.pact.io` cho Pact và `learning.postman.com` cho Postman.
>
> Và bước tiếp theo của các bạn: xem **Video 2** để cài đặt môi trường, rồi **Video 3** để xem toàn bộ những gì mình vừa trình bày chạy thật — từ test Postman, tới Newman trong CI, tới Pact phát hiện breaking change, và Agent Skill chạy trên PetStore API.
>
> Cảm ơn Thầy Cô và các bạn đã theo dõi. Hẹn gặp lại ở buổi thực hành.

**Chú thích dựng phim**

- Không quay slide `7.7.qna` và `7.8.thank_you` trong video — hai slide đó dành cho buổi trình bày trực tiếp.
- End card 6 giây: logo nhóm + "Tiếp theo: Video 2 — Cài đặt môi trường".

## 7. Bảng thuật ngữ Việt–Anh

Dùng nhất quán bảng này trong cả ba video. Cột "Cách đọc lần đầu" là công thức giới thiệu thuật ngữ khi nó xuất hiện lần đầu.

| Thuật ngữ               | Tiếng Việt                     | Cách đọc lần đầu trong video                                      |
| ----------------------- | ------------------------------ | ----------------------------------------------------------------- |
| API                     | Giao diện lập trình ứng dụng   | "API — Application Programming Interface — giao diện lập trình"   |
| Endpoint                | Điểm cuối / đầu mối API        | Giữ nguyên "endpoint"                                             |
| Resource                | Tài nguyên                     | "tài nguyên — resource"                                           |
| Idempotent              | Bất biến khi lặp lại           | "idempotent — gọi nhiều lần cho cùng một kết quả"                 |
| Authentication          | Xác thực                       | "authentication — xác thực — bạn là ai"                           |
| Authorization           | Phân quyền                     | "authorization — phân quyền — bạn được làm gì"                    |
| Bearer token            | Token dạng "người cầm"         | "Bearer — người cầm token thì được coi là chủ sở hữu"             |
| Happy path              | Luồng thuận                    | "happy path — luồng thuận, dữ liệu hợp lệ"                        |
| Negative test           | Test luồng nghịch              | "negative test — kỳ vọng một lỗi cụ thể, không phải test bị fail" |
| Assertion               | Câu lệnh khẳng định            | "assertion — câu khẳng định một điều kiện phải đúng"              |
| Collection              | Bộ sưu tập request             | Giữ nguyên "collection"                                           |
| Environment             | Bộ biến môi trường             | Giữ nguyên "environment"                                          |
| Iteration               | Lần lặp                        | "iteration — mỗi lần lặp là một test case"                        |
| Data-driven testing     | Kiểm thử hướng dữ liệu         | "data-driven — một request, nhiều bộ dữ liệu"                     |
| CLI runner              | Trình chạy dòng lệnh           | "CLI runner — chạy test từ dòng lệnh, không cần giao diện"        |
| Readiness probe         | Phép thử sẵn sàng              | "readiness probe — gọi thử tới khi service trả lời"               |
| Artifact                | Tệp đầu ra được lưu lại        | "artifact — file báo cáo được CI giữ lại để xem sau"              |
| Quality gate            | Cổng chất lượng                | "quality gate — cổng chặn pipeline nếu không đạt"                 |
| Flaky test              | Test bấp bênh                  | "flaky — lúc xanh lúc đỏ dù code không đổi"                       |
| Consumer                | Bên tiêu thụ / bên gọi API     | "Consumer — bên gọi API"                                          |
| Provider                | Bên cung cấp API               | "Provider — bên cung cấp API"                                     |
| Contract                | Hợp đồng (có thể thực thi)     | "contract — hợp đồng máy đọc được và chạy được"                   |
| Interaction             | Tương tác                      | "interaction — một cặp request–response trong contract"           |
| Provider state          | Trạng thái tiên quyết          | "provider state — điều kiện dữ liệu phải có trước"                |
| State handler           | Bộ dựng trạng thái             | "state handler — đoạn code dựng dữ liệu cho provider state"       |
| Matcher / matching rule | Luật so khớp                   | "matcher — luật so khớp, khớp theo kiểu thay vì theo giá trị"     |
| Over-specify            | Mô tả quá chặt                 | "over-specify — khóa cả những thứ mình không dùng"                |
| Under-specify           | Mô tả quá lỏng                 | "under-specify — lưới an toàn giả"                                |
| Pact file               | Tệp hợp đồng                   | "pact file — file JSON chứa các interaction"                      |
| Mock provider           | Provider giả lập               | "mock provider — server giả do Pact dựng lên"                     |
| Verification            | Kiểm chứng                     | "verification — Provider chứng minh mình đáp ứng contract"        |
| Pact Broker             | Kho contract trung tâm         | "Broker — nơi lưu contract, phiên bản và kết quả kiểm chứng"      |
| Compatibility matrix    | Ma trận tương thích            | "compatibility matrix — bảng tra phiên bản nào hợp phiên bản nào" |
| `can-i-deploy`          | Cổng kiểm tra trước triển khai | "can-i-deploy — phiên bản này có an toàn để deploy không"         |
| Consumer-driven         | Do bên tiêu thụ dẫn dắt        | "consumer-driven — Consumer nêu nhu cầu, Provider xác minh"       |
| Breaking change         | Thay đổi gây gãy               | "breaking change — thay đổi làm bên đang dùng bị gãy"             |
| Regression suite        | Bộ test hồi quy                | "regression suite — chạy lại sau mỗi thay đổi"                    |
| Test isolation          | Cô lập giữa các lần chạy test  | "test isolation — mỗi lần chạy bắt đầu từ trạng thái sạch"        |
| Agent Skill             | Kỹ năng đóng gói cho AI        | "Agent Skill — tập hướng dẫn đóng gói để AI làm lặp lại"          |
| OpenAPI                 | Chuẩn mô tả API                | "OpenAPI — chuẩn mô tả API dạng YAML hoặc JSON"                   |

## 8. Bảng kiểm kết thúc video

### 8.1. Nội dung — Video 1A

- [ ] Đã nêu rõ phân vai ba video và nói người xem chưa cần mở máy.
- [ ] Đã bóc tách đủ 4 thành phần Request và 3 thành phần Response.
- [ ] Đã giải thích nhóm 2xx / 4xx / 5xx và quy tắc "4xx bạn gửi sai, 5xx server hỏng".
- [ ] Đã phân biệt authentication và authorization, gắn với `401` và `403`.
- [ ] Đã nêu đủ 6 loại test case kèm ví dụ cụ thể.
- [ ] Đã đính chính "negative test không phải test bị fail".
- [ ] Đã giải thích 3 kỹ thuật: Domain Partitioning, BVA, State Transition.
- [ ] Đã giải thích đủ 5 khái niệm Postman.
- [ ] Đã nêu lý do tách Happy Path và Negative thành thư mục riêng.
- [ ] Đã nói kỳ vọng nằm trong file dữ liệu, không nằm trong script.
- [ ] Đã nêu vai trò readiness probe và lý do phải upload artifact kể cả khi fail.
- [ ] Đã nói Newman trả mã thoát khác 0 để CI biết build hỏng.
- [ ] Slide `3.4` được trình bày như **bản đồ xem trước**, không giảng sâu.
- [ ] Đã chốt "hai lớp bảo vệ" và đặt câu hỏi treo dẫn sang Video 1B.

### 8.2. Nội dung — Video 1B

- [ ] Đã định nghĩa Consumer / Provider là **vai trò**, không phải nhãn cố định.
- [ ] Đã nêu ý "mock của bạn không tự biết là thực tế đã đổi".
- [ ] Đã nhấn mạnh cụm "contract là đặc tả **có thể thực thi**".
- [ ] Đã giải thích provider state kèm ví dụ vì sao thiếu nó thì contract sai oan.
- [ ] Đã nói Contract Testing chạy **cô lập**, không cần bên kia khởi động.
- [ ] Đã nói rõ Contract Testing **không** kiểm tra business logic.
- [ ] Đã cảnh báo lỗi phổ biến: test phải gọi **API client thật**, không tự dựng request.
- [ ] Đã giải thích matcher, giá trị ví dụ, và cặp lỗi over-/under-specify.
- [ ] Đã đính chính "verification không gọi tới Consumer".
- [ ] Đã giải thích nhánh `unknown` của `can-i-deploy` và nguyên tắc fail-safe.
- [ ] Đã nêu bài học breaking change: `200` vẫn có thể là gãy.
- [ ] Đã nói 4 nguyên tắc AI, đặc biệt là human review VALID/INVALID/INCOMPLETE.
- [ ] Đã chốt chiến lược 4 lớp test và lộ trình áp dụng 5 bước.

### 8.3. Kỹ thuật

- [ ] Độ phân giải 1920×1080, không có thanh tác vụ hay thông báo lọt vào khung.
- [ ] Mọi `v-click` được bấm đúng nhịp lời thoại.
- [ ] Mọi footnote trên slide đều được đọc thành lời.
- [ ] Âm lượng đều giữa hai video; không có tiếng vọng hay tiếng gõ phím.
- [ ] Có chapter marker theo bảng timeline ở [mục 4](#4-timeline-tổng-quan).
- [ ] Có phụ đề cho toàn bộ thuật ngữ tiếng Anh.
- [ ] End card của 1A trỏ sang 1B; end card của 1B trỏ sang Video 2.

## 9. Lỗi thường gặp khi quay video lý thuyết

### Đọc nguyên văn chữ trên slide

Slide được thiết kế **cố tình thưa** để dành thời gian thực hành. Nếu người quay chỉ đọc lại chữ trên slide, video không thêm giá trị nào. Nguyên tắc: **slide nêu _cái gì_, lời thoại giải thích _vì sao_ và _hỏng thì ra sao_.**

### Giảng sâu ở slide `3.4.pact_pipeline`

Slide này đứng trước phần Contract Testing trong deck. Nếu giảng sâu tại đây, người xem sẽ nghe một loạt thuật ngữ chưa được định nghĩa và mất mạch. Giữ đúng vai trò "xem trước bản đồ" như kịch bản Cảnh A17.

### Sa vào thao tác công cụ

Mỗi khi thấy mình sắp nói "bây giờ mình mở Postman lên và..." thì dừng lại. Đó là Video 3. Công thức thay thế: _"phần chạy thật các bạn sẽ thấy ở Video 3."_

### Dùng lẫn lộn Consumer và Provider

Đây là lỗi gây hiểu nhầm nặng nhất trong Video 1B. Khi thu, nếu lỡ nói nhầm thì **quay lại cả câu**, đừng sửa giữa chừng. Mẹo: luôn gắn kèm tên cụ thể — "Consumer, tức `FrontendWebsite`" và "Provider, tức `ProductService`".

### Nói "contract test thay thế được E2E"

Không đúng, và slide `4.7` nói ngược lại. Luôn dùng từ **"bổ sung"**, không dùng "thay thế".

### Bấm hết `v-click` rồi mới nói

Làm mất tác dụng của hiệu ứng và khiến người xem đọc trước lời giảng. Luôn: nói xong ý → bấm hiện ý tiếp theo.

### Video quá dài do sa đà

Nếu bản thu thử vượt quá mốc thời lượng trên 20%, cắt theo thứ tự ưu tiên sau — **không** cắt vào Phần C và D:

1. Cảnh A11 (data-driven) — rút còn phần khái niệm và ba lợi ích.
2. Cảnh A12 (REST Client) — rút còn bảng so sánh và câu kết luận.
3. Cảnh B21 (adoption path) — rút còn bước 1 và bước 3.
4. Cảnh B17 (Agent Skill) — rút còn ba hộp INPUT/PROCESS/OUTPUT và hai con số.

## 10. Ghi chú cho người biên tập slide

Ba điểm phát hiện khi soạn kịch bản, gửi lại cho hai bạn phụ trách slide xử lý:

1. **`pages/1.intro/1.2.members.md` chỉ chứa đúng một dòng `layout: center`, không có dấu `---` bao quanh.** Vì không phải frontmatter hợp lệ, dòng này bị coi là nội dung và sẽ hiển thị thành chữ "layout: center" trên một slide trống. Danh sách thành viên hiện đã nằm sẵn trong slide bìa `1.1.cover.md`, nên nhiều khả năng đây là file thừa. Đề xuất: xóa dòng khai báo trong `slides.md` hoặc bổ sung nội dung cho slide này. Kịch bản hiện tại xử lý tạm bằng cách **bấm qua không dừng lại**.

2. **Speaker note của `pages/7.summary/7.6.resources.md` ghi repository là `github.com/Anhnguyenk835/Software_Testing_api_contract_testing`**, trong khi kịch bản Video 2 và remote thực tế của repo là `github.com/se-bros/Software_Testing_api_contract_testing`. Cần thống nhất một địa chỉ. Kịch bản này dùng bản `se-bros`.

3. **Agenda ở `1.3.agenda.md` có 10 mục nhưng deck lại chia thành 6 phần A–F.** Hai cách đánh số này không ánh xạ một-một, nên nếu người xem đối chiếu sẽ hơi rối. Không phải lỗi, nhưng nếu còn thời gian thì nên gộp agenda về đúng 6 phần cho khớp với các slide phân đoạn.

## 11. Tài liệu tham khảo

Nguồn đối chiếu khi biên soạn ngày 31/07/2026:

- [Pact — Docs](https://docs.pact.io) — định nghĩa contract, interaction, provider state, matcher, verification
- [Pact — Consumer-Driven Contract Testing](https://docs.pact.io/getting_started/how_pact_works) — mô hình consumer-driven và vòng đời pact
- [Pact Broker — `can-i-deploy`](https://docs.pact.io/pact_broker/can_i_deploy) — compatibility matrix và deployment gate
- [Postman Learning Center](https://learning.postman.com) — Collection, Environment, Variable, script, data-driven
- [Newman](https://github.com/postmanlabs/newman) — CLI runner, reporter, mã thoát
- [MDN — HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) — phân nhóm status code
- [RFC 6750 — The OAuth 2.0 Authorization Framework: Bearer Token Usage](https://datatracker.ietf.org/doc/html/rfc6750) — cơ chế Bearer token
- Repo-local: `docs/slides/pages/**`, `src/postman/`, `src/pact/`, `.github/workflows/newman-api-test.yml`, `.github/workflows/pact-verification.yml`
- Kịch bản liên quan: [Video 2 — Hướng dẫn cài đặt môi trường](video-02-environment-setup-script.md)
