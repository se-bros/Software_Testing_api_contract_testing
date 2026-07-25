# Automation Testing với Newman & Postman CLI

Bộ kịch bản chạy kiểm thử tự động tổng quát (**Generic Automated API Test Runner**) cho dự án **API & Contract Testing** (Nhóm 3 - SEBros).

---

## Cấu trúc thư mục

```text
src/newman/
├── run-newman.sh          # Generic Runner cho Bash (macOS / Linux / Git Bash)
├── run-newman.ps1         # Generic Runner cho PowerShell (Windows native)
├── README.md              # Tài liệu hướng dẫn sử dụng kịch bản
└── output/                # Thư mục lưu báo cáo HTML và JSON (được ignore bởi Git)
    └── reports/
        └── <timestamp>/   # Thư mục kết quả cho mỗi lượt chạy
            ├── product-service-data-driven-report.html
            ├── product-service-data-driven-report.json
            └── ...
```

---

## Các tính năng chính (Generic Discovery Runner)

1. **Tự động quét (Auto-Discovery):** Kịch bản tự động tìm tất cả các tệp Collection JSON trong thư mục `src/postman/collections/` để thực thi. Khi bổ sung collection mới trong tương lai, bạn không cần phải sửa bất kỳ dòng mã nào trong script.
2. **Hỗ trợ tham số linh hoạt:** Cho phép truyền tham số bất kỳ để chạy một Collection, một Tệp dữ liệu (Data file), một Environment hoặc một Folder cụ thể.
3. **Hỗ trợ cả Newman CLI & Postman CLI:** Dễ dàng chuyển đổi engine bằng tham số `--cli postman` hoặc `-Cli postman`.

---

## Yêu cầu tiền đề (Prerequisites)

### 1. Cài đặt Runner Engine

```bash
# Cài đặt Newman và htmlextra reporter global bằng npm:
npm install -g newman newman-reporter-htmlextra

# Hoặc dùng pnpm:
pnpm add -g newman newman-reporter-htmlextra
```

### 2. Khởi động Provider API

Provider API phải đang hoạt động tại địa chỉ `http://localhost:8080`:

```bash
cd src/sample-api/pact-workshop-js/provider
node server.js
```

---

## Các cách chạy Kịch bản

### 1. Chạy mặc định tự động (Auto-Discover toàn bộ collections)

```bash
# macOS / Linux / Git Bash:
bash src/newman/run-newman.sh

# Windows (PowerShell):
powershell -ExecutionPolicy Bypass -File src\newman\run-newman.ps1
```

### 2. Chạy với Postman CLI (Official)

```bash
# macOS / Linux / Git Bash:
bash src/newman/run-newman.sh --cli postman

# Windows (PowerShell):
powershell -ExecutionPolicy Bypass -File src\newman\run-newman.ps1 -Cli postman
```

### 3. Tùy chọn nâng cao cho bất kỳ Collection / Data / Folder nào

#### Thử nghiệm với file Data iteration cụ thể:
```bash
bash src/newman/run-newman.sh \
  -c src/postman/collections/product-service-data-driven.postman_collection.json \
  -d src/postman/data/get-products.data.json
```

#### Thử nghiệm với Folder cụ thể:
```bash
bash src/newman/run-newman.sh \
  -c src/postman/collections/product-service-data-driven.postman_collection.json \
  -d src/postman/data/get-products.data.json \
  -f "GET — Happy Path"
```

#### Đổi Provider Server URL khác (Staging / Production):
```bash
bash src/newman/run-newman.sh -u http://staging.example.com:8080
```

---

## Lưu ý Kỹ thuật quan trọng (Test Isolation & In-Memory State)

> [!IMPORTANT]
> **Provider API** (`src/sample-api/pact-workshop-js/provider/server.js`) lưu trữ dữ liệu sản phẩm tạm thời trên **RAM** (In-Memory Array), không sử dụng Database cố định:
>
> 1. Khi chạy toàn bộ Collection `product-service-data-driven` trong 1 lần thực thi duy nhất mà không reset server, bài test `DELETE /product/11` sẽ xóa vĩnh viễn sản phẩm `id = 11` khỏi RAM. Các bài test truy vấn sản phẩm này phía sau có thể bị báo **FAILED** do nhận phản hồi `404 Not Found`.
> 2. **Giải pháp khuyến nghị:** Để đạt tỉ lệ **100% PASSED** cho từng nhóm bài test, hãy thực thi từng **Folder** đi kèm với **Data file** tương ứng (hoặc khởi động lại Node Server trước khi thực thi nhóm test tiếp theo):

```bash
# Ví dụ thực thi riêng nhóm GET (100% PASSED):
bash src/newman/run-newman.sh \
  -c src/postman/collections/product-service-data-driven.postman_collection.json \
  -d src/postman/data/get-products.data.json \
  -f "GET — Happy Path"
```

---

## Báo cáo đầu ra (Reports Output)

Báo cáo được xuất tự động dưới hai định dạng trong `src/newman/output/reports/<timestamp>/`:
- **HTML Report (`.html`)**: Trực quan hóa kết quả kiểm thử (dùng `newman-reporter-htmlextra`).
- **JSON Report (`.json`)**: Dữ liệu kiểm thử phục vụ phân tích tự động hoặc tích hợp CI/CD.

---

## Tham khảo

- Evidence chi tiết Week 07: [`docs/reports/week07/evidences/QuocTan/newman-runner.md`](../../docs/reports/week07/evidences/QuocTan/newman-runner.md)
- Collections & Data Files: [`src/postman/`](../postman/)
