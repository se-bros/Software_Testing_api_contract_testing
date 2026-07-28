# Mini Exercise — Verification Evidence

## Thông tin minh chứng

| Field           | Value                                            |
| --------------- | ------------------------------------------------ |
| Thành viên      | Ngô Nguyễn Thế Khoa — 23127065                   |
| Tuần            | Seminar W09                                      |
| Feature         | Mini Exercise API/Contract Testing trong 90 phút |
| Ngày kiểm chứng | 2026-07-28                                       |
| Môi trường test | Node.js 20, Pact-JS 13.1.4, Pact Core 15.2.1     |

## Artifacts

- `Mini_Exercise.md`: đề bài, timeline, rubric, hướng dẫn giảng viên và đáp án kỳ vọng.
- `Mini_Exercise.pdf`: bản PDF A4 dùng để phát cho lớp.
- `../../AI Usage/KhoaNgo/prompt.png`: screenshot prompt và lịch sử AI.
- `../../AI Usage/KhoaNgo/AI_Audit_Report.md`: khai báo và nhật ký sử dụng AI.

SHA-256 của bản evidence khớp với artifact gốc:

```text
Mini_Exercise.md  1a66b7027ef31765d794e512d845a6fbd7978416802fcb90c6f59ff1c3cc7c0f
Mini_Exercise.pdf 03b75e1b5c6bb79731b9a1c4d66474ee3bca09792adc3d28c4a8ac290056f6be
```

## Kết quả kiểm chứng

### 1. Consumer Pact generation

Command:

```bash
volta run --node 20 npm run test:pact \
  --prefix src/sample-api/pact-workshop-js/consumer -- \
  --testNamePattern="GET /product/:id"
```

Observed result:

```text
PASS src/api.pact.spec.js
Test Suites: 1 passed, 1 total
Tests: 2 passed, 8 skipped, 10 total
```

### 2. Provider baseline verification

Command:

```bash
volta run --node 20 npm run test:pact \
  --prefix src/sample-api/pact-workshop-js/provider
```

Observed result:

```text
Verification successful
PASS product/product.pact.test.js
Test Suites: 1 passed, 1 total
```

### 3. Intentional breaking change

Thay đổi tạm thời response của `GET /product/:id` từ field `name` sang `title`, sau đó chạy lại provider verification.

Observed result:

```text
has a matching body (FAILED)
Actual map is missing the following keys: name
There were 1 pact failures
Test Suites: 1 failed, 1 total
```

Đây là failure mong đợi, chứng minh provider đã phá vỡ contract mà consumer công bố.

### 4. Restore verification

Khôi phục `res.send(product)` và chạy provider verification lần cuối.

Observed result:

```text
Verification successful
PASS product/product.pact.test.js
Test Suites: 1 passed, 1 total
```

Provider source không còn diff sau khi khôi phục.

### 5. Document validation

```text
Markdown: có mục lục, 12 phần chính và timeline đủ 90 phút
Rubric: tổng 10.0 điểm
PDF: A4, 17 trang, trích xuất văn bản thành công
Visual check: trang đầu hiển thị đúng tiêu đề, metadata và mục lục
git diff --check: passed
```

## Human Review Corrections

| Issue                                                            | Correction                                         | Status   |
| ---------------------------------------------------------------- | -------------------------------------------------- | -------- |
| Weekly Report dự kiến Login API nhưng repo không có Login assets | Chuyển sang `GET /product/:id` của Product Service | Resolved |
| PDF fallback đầu tiên không render đúng bảng và code block       | Xuất lại bằng Markdown renderer và Chrome A4       | Resolved |
| Rubric ban đầu cộng thành 9 thay vì 10 điểm                      | Tăng Breaking Change Experiment từ 2 lên 3 điểm    | Resolved |

## Kết luận

Mini Exercise đã được kiểm chứng trọn luồng baseline pass, breaking change fail và restored pass. Tất cả lỗi phát hiện trong human review đã được xử lý trước khi lưu artifact evidence.
