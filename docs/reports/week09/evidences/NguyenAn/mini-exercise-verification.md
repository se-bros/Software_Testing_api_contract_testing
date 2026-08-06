# Mini Exercise — Verification Evidence

## Thông tin minh chứng

| Field           | Value                                            |
| --------------- | ------------------------------------------------ |
| Thành viên      | Ân Tiến Nguyên An — 23127148                     |
| Tuần            | Seminar W09                                      |
| Feature         | Mini Exercise API/Contract Testing trong 90 phút |
| Ngày kiểm chứng | 2026-08-05                                       |
| Môi trường test | Node.js v20, Pact-JS 13.1.4, Newman 6.1.3         |

## Artifacts

- `test-design.md`: Nhật ký phân tích và thiết kế test case kết hợp AI.
- `mini-get-product.data.json`: File dữ liệu dùng cho Postman Data-Driven Testing.
- `mini-product-service.postman_collection.json`: Collection Postman đã được tuỳ chỉnh.
- `mini-local.postman_environment.json`: Environment Postman cục bộ.
- `mini-newman-report.json`: Báo cáo kết quả chạy Newman CLI (đã được che đi token Authorization nhạy cảm).
- `../../AI Usage/NguyenAn/AI_Audit_Report.md`: Khai báo sử dụng AI.

SHA-256 của các file minh chứng:

```text
test-design.md: 0ee24a08591104a0b2c34180f3973307ac248442ea2161c7df4b83e278b0a27c
mini-get-product.data.json: 7ea0268fb142dc274c6de93dcf0a7bb04ac29aedbb7556126102dfa911e52830
mini-product-service.postman_collection.json: c91641a5a3e62b6ec24d296a837ce64ba9058a92e1b7c8bccf2877bcff336138
mini-local.postman_environment.json: 2c8196f45502fabd35ef242932880c90b34d9caaf38b3d0ce8e953a3056f422f
mini-newman-report.json: 07bb37f637769cf32eb0df1ec5bf388099863cc4944d1887e466d33f20d6fde6
```

## Kết quả kiểm chứng

### 1. Consumer Pact generation

Command:

```bash
npm run test:pact --prefix src/sample-api/pact-workshop-js/consumer -- --testNamePattern="GET /product/:id"
```

Observed result:

```text
PASS src/api.pact.spec.js
  GET /product/:id
    √ valid id (189 ms)
    √ invalid id (15 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 8 skipped, 10 total
```

Mã hợp đồng `FrontendWebsite-ProductService.json` đã được tự động sinh tại thư mục `./pacts` của Consumer.

### 2. Provider baseline verification

Command:

```bash
npm run test:pact --prefix src/sample-api/pact-workshop-js/provider
```

Observed result:

```text
PASS product/product.pact.test.js (10.923 s)
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        12.122 s
```

Toàn bộ 10 hợp đồng được xác minh thành công.

### 3. Intentional breaking change

Tạm thời thay đổi response của `GET /product/:id` trong file [product.controller.js](file:///d:/Project/Software_Testing_api_contract_testing/src/sample-api/pact-workshop-js/provider/product/product.controller.js) từ thuộc tính `name` sang `title`.

Observed result:

```text
FAIL product/product.pact.test.js (10.957 s)
  ● Pact Verification › validates the expectations of ProductService

    Pact verification failed!
    
    1) a request for product 10 returns a response which has a matching body
       Failure/Error: Actual map is missing the following keys: name
    
       Diff:
       --------------------------------------
       {
       -  "name": "28 Degrees"
       }
       --------------------------------------
```

Pact Provider Verification phát hiện ra lỗi và cảnh báo chính xác sự thay đổi thuộc tính phá vỡ hợp đồng.

### 4. Restore verification

Khôi phục code trong [product.controller.js](file:///d:/Project/Software_Testing_api_contract_testing/src/sample-api/pact-workshop-js/provider/product/product.controller.js) về trạng thái cũ và chạy lại.

Observed result:

```text
PASS product/product.pact.test.js (10.923 s)
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
```

Provider Verification trở lại trạng thái thành công (PASS).

## Human Review Corrections

| Issue | Correction | Status |
| ----- | ---------- | ------ |
| Newman export path gặp lỗi Drive-crossing | Chuyển sang đường dẫn tuyệt đối bắt đầu bằng drive letter D: | Resolved |
| Newman CLI bị lỗi encoding dấu gạch ngang dài | Chạy toàn bộ collection thay vì lọc theo folder có chứa kí tự đặc biệt | Resolved |
| File Newman report bị quét thông tin nhạy cảm | Viết script tự động che (mask) các token authorization trong executions trước khi lưu | Resolved |

## Kết luận

Mini Exercise của học viên Ân Tiến Nguyên An đã được kiểm thử và xác minh trọn vẹn. Mọi kết quả kiểm chứng từ sinh contract, chạy baseline, thực hiện breaking change, đến khôi phục đều đáp ứng hoàn hảo yêu cầu thực tế của khoá học.
