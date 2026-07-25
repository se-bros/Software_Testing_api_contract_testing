# FINAL SEMINAR REPORT

## API Testing & Contract Testing

**Nhóm 03 — SEBros**  
**Học phần:** Kiểm thử phần mềm  
**Repository:** [Software_Testing_api_contract_testing](https://github.com/Anhnguyenk835/Software_Testing_api_contract_testing)

> Tài liệu này hoàn thiện các chương được phân công gồm Chapter 3, Chapter 5, Chapter 6, Chapter 7 và phụ lục AI Critique. Chapter 1, 2 và 4 được tích hợp từ phần nội dung của các thành viên phụ trách khi đóng gói bản nộp chung.

## Mục lục

- [Chapter 3. Contract Testing](#chapter-3-contract-testing)
- [Chapter 5. Automation và CI/CD](#chapter-5-automation-và-cicd)
- [Chapter 6. Kết luận và đánh giá tính tái sử dụng](#chapter-6-kết-luận-và-đánh-giá-tính-tái-sử-dụng)
- [Chapter 7. Tài liệu tham khảo](#chapter-7-tài-liệu-tham-khảo)
- [Phụ lục A. AI Critique](#phụ-lục-a-ai-critique)

---

# Chapter 3. Contract Testing

## 3.1. Bối cảnh và khái niệm

Trong hệ thống phân tán, một Consumer và một Provider có thể được phát triển, kiểm thử và triển khai độc lập. Unit test của từng phía vẫn có thể đạt trong khi hệ thống tích hợp thất bại: Consumer đọc thuộc tính `name`, nhưng Provider đổi thuộc tính đó thành `displayName`; hoặc Provider vẫn trả HTTP 200 nhưng cấu trúc dữ liệu không còn đúng với điều Consumer cần. Rủi ro cốt lõi ở đây không chỉ là “dịch vụ có đang chạy hay không”, mà là **hai phía có còn hiểu cùng một giao thức hay không**.

Contract Testing kiểm tra thỏa thuận giao tiếp tại biên giữa các hệ thống. Một contract mô tả các request mà Consumer thực sự gửi và các response mà Consumer cần Provider đáp ứng, bao gồm method, path, query, header, body, status code và quy tắc so khớp. Khác với một tài liệu API tĩnh, contract trong Pact là một đặc tả có thể thực thi: nó được sinh từ consumer test và được phát lại khi xác minh Provider [1], [2].

Contract Testing tập trung vào **tính tương thích**, không chứng minh toàn bộ nghiệp vụ đúng. Một response có thể đúng status và schema nhưng vẫn chứa kết quả tính toán sai; trường hợp đó thuộc trách nhiệm của unit, integration hoặc domain test. Contract Testing cũng không thay thế kiểm thử bảo mật, hiệu năng, hạ tầng hay hành trình người dùng xuyên nhiều dịch vụ.

## 3.2. Mô hình Consumer–Provider

Trong mô hình Consumer-Driven Contract Testing:

- **Consumer** là ứng dụng gọi API, chẳng hạn web, mobile hoặc một service khác. Consumer mô tả chính xác phần giao diện mà nó sử dụng.
- **Provider** là dịch vụ cung cấp API. Provider chứng minh implementation hiện tại đáp ứng mọi interaction được Consumer công bố.
- **Interaction** thường có cấu trúc Given–When–Then: provider state, request và response kỳ vọng.
- **Pact file** là artifact JSON chứa các interaction cùng matching rules.
- **Pact Broker/Pactflow** lưu contract, phiên bản Consumer/Provider và kết quả verification để tạo ma trận tương thích [3].

Consumer-driven không có nghĩa Consumer đơn phương áp đặt toàn bộ API. Mỗi Consumer chỉ công bố nhu cầu thực tế; Consumer và Provider vẫn phải trao đổi về thiết kế, versioning và chiến lược tiến hóa API. Cách tiếp cận này giúp Provider biết trường dữ liệu nào đang được sử dụng, đồng thời tránh contract hóa toàn bộ response một cách không cần thiết.

## 3.3. So sánh với các lớp kiểm thử khác

| Tiêu chí | API Testing | Contract Testing | Integration Testing | End-to-End Testing |
| --- | --- | --- | --- | --- |
| Câu hỏi chính | Endpoint hoạt động đúng theo test case? | Consumer và Provider còn tương thích? | Các module/service phối hợp đúng? | Hành trình người dùng chạy được? |
| Phạm vi | Một hoặc nhiều endpoint | Một cặp Consumer–Provider | Một nhóm thành phần | Toàn hệ thống |
| Môi trường | API thật hoặc mock | Consumer mock Provider; Provider chạy thật khi verify | Môi trường bán tích hợp | Gần production |
| Phản hồi | Nhanh đến trung bình | Nhanh, mismatch rõ | Trung bình | Chậm, khó khoanh vùng |
| Điểm mạnh | Chức năng, validation, auth, dữ liệu | Chống breaking change tại biên | Kiểm tra wiring và phối hợp | Xác nhận critical user journey |
| Điểm mù | Phụ thuộc Consumer cụ thể | Business logic, hạ tầng, journey | Phụ thuộc ngoài phạm vi | Dễ flaky, chi phí cao |

API Testing và Contract Testing bổ sung cho nhau. Postman/Newman phù hợp để gửi request vào API và kiểm tra hành vi chức năng. Pact phù hợp để lưu lại kỳ vọng thực tế của Consumer rồi kiểm chứng ngược trên Provider. Một chiến lược cân bằng dùng unit test cho logic, contract test cho compatibility, integration test cho wiring và một số ít E2E test cho hành trình quan trọng.

## 3.4. Quy trình Pact

### 3.4.1. Consumer tạo contract

Consumer test đăng ký interaction với Pact Mock Provider, sau đó gọi **mã API client thật** của Consumer vào mock server. Pact kiểm tra request nhận được và cung cấp response mẫu theo matching rules. Khi test thành công, Pact sinh file JSON.

Ví dụ interaction của Product Service:

```text
Given  product 10 exists
When   GET /product/10
Then   200 + Product schema
```

Consumer không nên đóng băng dữ liệu động bằng exact match. Matcher theo type hoặc regex giúp contract linh hoạt, nhưng các yếu tố Consumer thực sự phụ thuộc — status, path và giá trị nghiệp vụ quan trọng — vẫn phải được kiểm tra nghiêm ngặt.

### 3.4.2. Provider xác minh contract

Pact Verifier tải pact từ file hoặc Broker, thiết lập provider state, phát lại request vào Provider API thật và so sánh response thực tế với contract. Provider state tạo ra điều kiện trước có thể tái lập, ví dụ “product 10 exists” hoặc “product 99 does not exist”. Khi mismatch xảy ra, verifier chỉ rõ status, header hoặc trường dữ liệu không tương thích.

Provider verification không gọi Consumer và không thay thế Provider bằng mock. Chính Provider implementation được chạy, còn Pact Verifier đóng vai Consumer để replay interaction.

### 3.4.3. Broker và deployment gate

Pact Broker không chỉ lưu JSON. Contract và kết quả verification được gắn với version/branch của từng bên. `can-i-deploy` truy vấn ma trận tương thích trước khi phát hành: phiên bản đã được xác minh có thể tiếp tục; trạng thái failed hoặc unknown phải chặn pipeline [3], [4].

Quy trình lý tưởng:

1. Consumer CI chạy contract tests và sinh pact.
2. Pact được publish cùng version metadata.
3. Provider CI tải các pact phù hợp và chạy verification.
4. Kết quả được publish lại Broker.
5. Pipeline gọi `can-i-deploy` trước khi triển khai.

## 3.5. Case study trong repository

Demo sử dụng Consumer `FrontendWebsite` và Provider `ProductService`. Bộ contract bao phủ:

| Nhóm API | Interaction | Trạng thái chính |
| --- | ---: | --- |
| `GET /products` | 2 | Có dữ liệu và danh sách rỗng |
| `GET /product/:id` | 2 | Tồn tại và không tồn tại |
| `POST /products` | 2 | Tạo thành công và validation error |
| `PUT /product/:id` | 2 | Cập nhật thành công và không tồn tại |
| `DELETE /product/:id` | 2 | Xóa thành công và không tồn tại |

Tổng cộng có 10 interaction. Mỗi request sử dụng header `Authorization` với regex matcher cho Bearer timestamp ISO-8601. Contract được sinh tại:

```text
src/sample-api/pact-workshop-js/consumer/pacts/FrontendWebsite-ProductService.json
```

Lệnh consumer test:

```bash
npm run test:pact --prefix src/sample-api/pact-workshop-js/consumer
```

Lệnh provider verification:

```bash
npm run test:pact --prefix src/sample-api/pact-workshop-js/provider
```

Kết quả xác nhận ngày 25-07-2026: consumer suite đạt **10/10 interaction**; Provider Pact Verification xác minh thành công toàn bộ contract giữa `FrontendWebsite` và `ProductService`.

Provider verifier hỗ trợ hai chế độ: đọc pact file local thông qua `PACT_FILE`, hoặc kết nối Broker bằng `PACT_BROKER_URL` và thông tin xác thực tương ứng. Thiết kế Broker-optional giúp pipeline trong repository vẫn xác minh được contract bằng GitHub Actions artifact, đồng thời giữ đường nâng cấp lên Pactflow.

---

# Chapter 5. Automation và CI/CD

## 5.1. Tự động hóa API Testing với Newman

Newman là command-line runner cho Postman Collection [5]. Collection và Environment được lưu trong repository, vì vậy cùng một tập request, variable và assertion có thể chạy lại ở local hoặc CI mà không cần mở Postman GUI.

Luồng tự động hóa của dự án:

1. Cài dependencies và khởi động Product Service tại `127.0.0.1:8080`.
2. Gọi `/health` cho đến khi Provider trả HTTP 200.
3. Cài Newman và `newman-reporter-htmlextra`.
4. Chạy collection cùng environment.
5. Xuất CLI, HTML và JSON report.
6. Upload toàn bộ report kể cả khi test thất bại.

Lệnh cốt lõi:

```bash
newman run src/postman/collections/product-service.postman_collection.json \
  -e src/postman/environments/local.postman_environment.json \
  --reporters cli,htmlextra,json
```

Readiness probe giúp tránh tình trạng Newman chạy trước khi API sẵn sàng. Báo cáo HTML thuận tiện cho review thủ công, trong khi JSON phù hợp cho xử lý tự động hoặc tổng hợp chỉ số.

## 5.2. GitHub Actions cho Newman

Workflow `.github/workflows/newman-api-test.yml` chạy khi push hoặc tạo Pull Request vào `main`, đồng thời hỗ trợ `workflow_dispatch`. Pipeline dùng Node.js 20, giới hạn quyền ở `contents: read`, đặt timeout 10 phút và dùng concurrency để hủy run cũ khi có commit mới [6].

Artifact `newman-report` được giữ 7 ngày và upload với `if: always()`. Nhờ vậy, khi assertion thất bại, nhóm vẫn có `provider.log`, `report.html` và `report.json` để phân tích nguyên nhân. Workflow hiện kiểm thử API sau khi tự khởi động Provider; nếu dự án bổ sung build/deploy job riêng, bước Newman có thể nối bằng `needs` hoặc `workflow_run`.

## 5.3. Pact Verification trong CI

Workflow `.github/workflows/pact-verification.yml` tách thành hai job:

### Consumer Pact tests

- Checkout repository và thiết lập Node.js 20.
- Cài dependencies bằng `npm ci`.
- Chạy `npm run test:pact`.
- Upload `FrontendWebsite-ProductService.json` dưới tên artifact `consumer-pacts`.

### Provider verification

- Chỉ chạy sau khi consumer job thành công.
- Download đúng artifact vào thư mục `consumer/pacts`.
- Truyền đường dẫn tuyệt đối qua `PACT_FILE`.
- Chạy Provider Pact verifier với Provider API thật.

Việc truyền Pact bằng artifact tránh phụ thuộc Broker trong bài lab và bảo đảm Provider luôn verify chính contract do consumer job vừa sinh. Khi có Pactflow, cùng verifier có thể tải pact qua Broker, publish verification result và dùng version metadata.

Theo tổng kết seminar tuần 9, nhóm dùng Video 4 để minh họa quy trình Consumer sinh pact, Provider verify và deployment gate `can-i-deploy`. Đây là lớp kiểm soát cần thiết khi chuyển từ pipeline artifact cục bộ sang quy trình triển khai độc lập dựa trên compatibility matrix.

## 5.4. Giá trị của tự động hóa

Hai workflow tạo thành hai lớp bảo vệ:

- Newman phát hiện lỗi chức năng của API, validation, authentication và payload.
- Pact phát hiện breaking change tại biên Consumer–Provider.

Chạy cả hai trên push/PR giúp phản hồi sớm, tạo log tái lập và giảm phụ thuộc vào kiểm tra thủ công. Artifact cũng đóng vai trò bằng chứng để reviewer truy ngược phiên bản, test result và contract đã dùng.

---

# Chapter 6. Kết luận và đánh giá tính tái sử dụng

## 6.1. Kết luận

API Testing và Contract Testing giải quyết hai nhóm rủi ro khác nhau. API Testing xác nhận hành vi của endpoint dưới nhiều điều kiện dữ liệu; Contract Testing xác nhận Consumer và Provider vẫn tương thích khi mỗi bên thay đổi độc lập. Newman và GitHub Actions biến test collection thành regression suite tự động. Pact bổ sung contract artifact, provider verification và compatibility gate.

Kết quả quan trọng nhất không phải là loại bỏ hoàn toàn integration/E2E test, mà là phân tầng kiểm thử hợp lý: lỗi schema và giao thức được phát hiện sớm bằng Pact; lỗi chức năng được phát hiện bằng Postman/Newman; wiring và user journey tiếp tục được kiểm tra ở các lớp cao hơn.

## 6.2. Các thành phần có thể tái sử dụng

| Thành phần | Mức tái sử dụng | Phần cần cấu hình theo dự án |
| --- | --- | --- |
| Cấu trúc Consumer Pact test | Cao | Consumer/Provider name, route, payload, provider state |
| Provider verifier | Cao | Base URL, state handlers, auth/request filter |
| Pact artifact workflow | Cao | Working directory, Pact filename, package scripts |
| Newman workflow | Cao | Collection, Environment, readiness endpoint |
| Prompt/Agent Skill | Cao | API specification, biến môi trường, test data |
| Slide/report template | Trung bình–cao | Ví dụ nghiệp vụ, số liệu và artifact links |

Phần lõi nên giữ ổn định gồm trình tự phân tích API, cấu trúc interaction, nguyên tắc matcher, artifact handoff, reporting và quality gate. Phần thay đổi theo dự án là input API specification, endpoint, schema, authentication, dữ liệu mẫu và provider state.

## 6.3. Đánh giá định lượng của nhóm

Theo báo cáo tổng kết tuần 9, nhóm ước tính **trên 80% mã nguồn/prompt có thể tái sử dụng** khi áp dụng cho một dự án API Testing mới. Các thành phần được nhóm đánh giá có khả năng tái sử dụng 100% gồm cấu trúc Agent Skill, prompt templates, GitHub Actions workflow và Newman runner; phần còn lại chủ yếu là cấu hình đầu vào.

Tỷ lệ trên là ước tính theo artifact và trải nghiệm demo của nhóm, không phải benchmark phổ quát. Khi chuyển sang API có giao thức, authentication hoặc domain khác biệt lớn, khối lượng state handler, matcher và test data phải được đánh giá lại.

## 6.4. Điều kiện và giới hạn tái sử dụng

Tái sử dụng chỉ có giá trị nếu template vẫn buộc người dùng xác nhận hành vi thực. Sao chép matcher quá rộng có thể làm contract mất khả năng phát hiện breaking change; sao chép toàn bộ response bằng exact match lại làm test giòn. Workflow cũng phải cập nhật version action, runtime Node.js, secret policy và đường dẫn artifact theo repository mới.

Đề xuất đánh giá lại trên ít nhất một API ngoài Product Service:

1. Đo tỷ lệ file giữ nguyên, file chỉ đổi cấu hình và file phải viết lại.
2. So sánh thời gian thiết lập với cách làm thủ công.
3. Chạy trên môi trường sạch để phát hiện dependency ẩn.
4. Ghi nhận số lỗi hợp lệ và false positive.
5. Kiểm tra khả năng bàn giao cho thành viên không tham gia xây dựng ban đầu.

---

# Chapter 7. Tài liệu tham khảo

[1] Pact Foundation, “Introduction to Contract Testing,” *Pact Documentation*. [Online]. Available: https://docs.pact.io/. [Accessed: 25-Jul-2026].

[2] Pact Foundation, “How Pact Works,” *Pact Documentation*. [Online]. Available: https://docs.pact.io/getting_started/how_pact_works. [Accessed: 25-Jul-2026].

[3] Pact Foundation, “Pact Broker,” *Pact Documentation*. [Online]. Available: https://docs.pact.io/pact_broker. [Accessed: 25-Jul-2026].

[4] Pact Foundation, “Can I Deploy,” *Pact Documentation*. [Online]. Available: https://docs.pact.io/pact_broker/can_i_deploy. [Accessed: 25-Jul-2026].

[5] Postman Labs, “Newman — Command-line Collection Runner for Postman,” *GitHub*. [Online]. Available: https://github.com/postmanlabs/newman. [Accessed: 25-Jul-2026].

[6] GitHub, “GitHub Actions Documentation.” [Online]. Available: https://docs.github.com/en/actions. [Accessed: 25-Jul-2026].

[7] Postman, “Write Scripts to Test API Response Data in Postman.” [Online]. Available: https://learning.postman.com/docs/tests-and-scripts/write-scripts/test-scripts/. [Accessed: 25-Jul-2026].

[8] Slidev, “Slidev Documentation.” [Online]. Available: https://sli.dev/. [Accessed: 25-Jul-2026].

[9] SEBros, “Software Testing — API & Contract Testing,” *GitHub Repository*. [Online]. Available: https://github.com/Anhnguyenk835/Software_Testing_api_contract_testing. [Accessed: 25-Jul-2026].

[10] Pact Foundation, “Pact Workshop JS,” *GitHub*. [Online]. Available: https://github.com/pact-foundation/pact-workshop-js. [Accessed: 25-Jul-2026].

---

# Phụ lục A. AI Critique

AI hỗ trợ đáng kể trong quá trình xây dựng seminar, đặc biệt ở việc tổng hợp thuật ngữ Contract Testing, đề xuất cấu trúc slide, tạo sơ đồ Mermaid và phác thảo GitHub Actions workflow. Công cụ giúp nhóm chuyển nhanh từ yêu cầu tổng quát sang một bản nháp có thể chạy, đồng thời gợi ý các tình huống lỗi như Pact file sai đường dẫn, thiếu provider state hoặc pipeline không truyền đúng artifact. Nhờ đó, thời gian dành cho công việc lặp lại giảm và nhóm có thể tập trung hơn vào nội dung trình bày.

Tuy nhiên, đầu ra AI không nên được xem là bằng chứng hoàn thành. AI có thể khái quát quá mức lợi ích của Contract Testing, dùng endpoint không khớp mã nguồn, hoặc mô tả một quality gate như thể đã được triển khai đầy đủ. Nội dung kỹ thuật cũng dễ lỗi thời khi phiên bản Slidev, Pact, Node.js hoặc GitHub Actions thay đổi. Vì vậy, nhóm phải đối chiếu từng nhận định với tài liệu chính thức, workflow, test log và artifact trong repository.

Human review là bước quyết định chất lượng cuối cùng. Người review cần kiểm tra matcher có phản ánh đúng nhu cầu Consumer, provider state có tái lập được, link artifact có truy cập được và số liệu có nguồn rõ ràng. AI phù hợp với vai trò cộng tác viên tạo bản nháp và hỗ trợ phân tích; trách nhiệm xác nhận tính đúng đắn, bảo mật, khả năng tái sử dụng và quyết định nộp bài vẫn thuộc về con người.
