# Newman Script Runner — Evidence Document

## Thông tin

| Field        | Value                                                                       |
| ------------ | --------------------------------------------------------------------------- |
| Thành viên   | Mạch Quốc Tấn (23127115)                                                    |
| Tuần         | Week 07                                                                     |
| Task         | Thiết lập kịch bản tổng quát chạy Newman tự động + xuất báo cáo HTML & JSON |
| Deliverables | `src/newman/run-newman.sh` · `src/newman/run-newman.ps1`                    |

---

## Mô tả Task & Thiết kế Tổng quát

Kịch bản được thiết kế theo kiến trúc **Generic Auto-Discovery Runner (Tổng quát hóa)**:

- **Tự động quét (Auto-Discovery)** toàn bộ Postman Collections trong thư mục `src/postman/collections/`. Khi dự án thêm mới bất kỳ Collection hoặc API nào về sau, kịch bản sẽ tự động nhận diện và thực thi mà **không cần chỉnh sửa mã nguồn script**.
- **Linh hoạt tham số dòng lệnh**: Cho phép truyền trực tiếp bất kỳ tệp Collection (`-c`), tệp dữ liệu Data (`-d`), file Environment (`-e`), hoặc tên Folder (`-f`) cụ thể.
- **Hỗ trợ đa Engine**: Hỗ trợ cả **Newman CLI** (mặc định) và **Postman CLI** official (`--cli postman`).
- **Xuất báo cáo kép**:
  - **HTML** — `newman-reporter-htmlextra` (báo cáo giao diện trực quan cho trình duyệt)
  - **JSON** — reporter mặc định Newman (dữ liệu phục vụ phân tích tự động, CI/CD)

---

## Deliverables

| File                                                                    | Mô tả                                          |
| ----------------------------------------------------------------------- | ---------------------------------------------- |
| [`src/newman/run-newman.sh`](../../../../../src/newman/run-newman.sh)   | Bash Generic Runner — macOS / Linux / Git Bash |
| [`src/newman/run-newman.ps1`](../../../../../src/newman/run-newman.ps1) | PowerShell Generic Runner — Windows native     |

---

## Cài đặt Dependencies

```bash
# Dùng npm
npm install -g newman newman-reporter-htmlextra

# Hoặc dùng pnpm
pnpm add -g newman newman-reporter-htmlextra
```

---

## Hướng dẫn Sử dụng Kịch bản

### 1. Thực thi Tự động toàn bộ Collections (Auto-Discovery)

```bash
# macOS / Linux / Git Bash
bash src/newman/run-newman.sh

# Windows (PowerShell)
powershell -ExecutionPolicy Bypass -File src\newman\run-newman.ps1
```

### 2. Thực thi bộ kiểm thử Data-Driven kèm tệp Data

```bash
# macOS / Linux / Git Bash
bash src/newman/run-newman.sh \
  -c src/postman/collections/product-service-data-driven.postman_collection.json \
  -d src/postman/data/get-products.data.json \
  -f "GET — Happy Path"

# Windows (PowerShell)
powershell -ExecutionPolicy Bypass -File src\newman\run-newman.ps1 `
  -Collection "src\postman\collections\product-service-data-driven.postman_collection.json" `
  -Data "src\postman\data\get-products.data.json" `
  -Folder "GET — Happy Path"
```

### 3. Thực thi với Postman CLI (Official Engine)

```bash
# macOS / Linux / Git Bash
bash src/newman/run-newman.sh --cli postman

# Windows (PowerShell)
powershell -ExecutionPolicy Bypass -File src\newman\run-newman.ps1 -Cli postman
```

---

## Tham số dòng lệnh đầy đủ (Options)

### `run-newman.sh` (Bash)

| Option                     | Mặc định                                                  | Mô tả                                         |
| -------------------------- | --------------------------------------------------------- | --------------------------------------------- |
| `--cli <newman\|postman>`  | `newman`                                                  | Lựa chọn CLI Engine thực thi                  |
| `-c, --collection <path>`  | `src/postman/collections/`                                | File collection hoặc thư mục chứa collections |
| `-e, --environment <path>` | `src/postman/environments/local.postman_environment.json` | Tệp environment                               |
| `-d, --data <path>`        | —                                                         | Tệp dữ liệu iteration (JSON/CSV)              |
| `-f, --folder <name>`      | —                                                         | Tên folder cụ thể cần thực thi                |
| `-u, --url <url>`          | `http://localhost:8080`                                   | URL Provider API                              |
| `-o, --output <dir>`       | `src/newman/output/reports`                               | Thư mục xuất báo cáo                          |
| `--no-html`                | —                                                         | Bỏ qua báo cáo HTML                           |
| `--no-json`                | —                                                         | Bỏ qua báo cáo JSON                           |
| `--skip-provider-check`    | —                                                         | Bỏ qua kiểm tra kết nối Provider API          |
| `-h, --help`               | —                                                         | Hiển thị hướng dẫn                            |

### `run-newman.ps1` (PowerShell)

| Parameter                | Mặc định                       | Mô tả                                         |
| ------------------------ | ------------------------------ | --------------------------------------------- |
| `-Cli <newman\|postman>` | `newman`                       | Lựa chọn CLI Engine thực thi                  |
| `-Collection <path>`     | `src\postman\collections`      | File collection hoặc thư mục chứa collections |
| `-Environment <path>`    | `src\postman\environments\...` | Tệp environment                               |
| `-Data <path>`           | —                              | Tệp dữ liệu iteration (JSON/CSV)              |
| `-Folder <name>`         | —                              | Tên folder cụ thể cần thực thi                |
| `-Url <url>`             | `http://localhost:8080`        | URL Provider API                              |
| `-OutputBase <dir>`      | `src\newman\output\reports`    | Thư mục xuất báo cáo                          |
| `-NoHtml`                | —                              | Bỏ qua báo cáo HTML                           |
| `-NoJson`                | —                              | Bỏ qua báo cáo JSON                           |
| `-SkipProviderCheck`     | —                              | Bỏ qua kiểm tra kết nối Provider API          |
| `-Help`                  | —                              | Hiển thị trợ giúp                             |

---

## Lưu ý Kỹ thuật về In-Memory State & Test Isolation

> [!IMPORTANT]
>
> - **Provider API** (`src/sample-api/pact-workshop-js/provider/server.js`) lưu trữ dữ liệu sản phẩm tạm thời trên **RAM** (In-Memory Array), không sử dụng Database cố định.
> - **Xử lý Test Isolation:** Đối với bộ kiểm thử Data-Driven, kịch bản khuyến nghị thực thi kèm tệp dữ liệu tương ứng (`-Data`) cho từng nhóm bài test để đảm bảo tỉ lệ **100% PASSED**.

---

## Kết quả Thực thi Minh chứng (Evidence)

| Bộ kiểm thử (Folder / Collection)     | Tệp Data áp dụng | Trạng thái thực thi |
| ------------------------------------- | ---------------- | ------------------- |
| `product-service` (Static Collection) | —                | PASSED              |

### Các tệp minh chứng đính kèm

- **Terminal Execution Log (`product-service` — 100% PASSED):** [`newman-run-output.txt`](./newman-run-output.txt)
- **Báo cáo HTML (`product-service`):** [`reports/product-service-report.html`](./reports/product-service-report.html)
- **Báo cáo JSON (`product-service`):** [`reports/product-service-report.json`](./reports/product-service-report.json)

---

## Cấu trúc xuất báo cáo (Output)

```text
src/newman/
├── run-newman.sh                        # Bash Generic Runner (macOS/Linux/Git Bash)
├── run-newman.ps1                       # PowerShell Generic Runner (Windows)
└── output/                             # Bị ignore bởi Git (.gitignore)
    └── reports/
        └── <timestamp>/                # Thư mục xuất báo cáo tự động cho mỗi lượt chạy
            ├── product-service-report.html
            ├── product-service-report.json
```

---

## Tham khảo

- Script bash: [`src/newman/run-newman.sh`](../../../../../src/newman/run-newman.sh)
- Script PowerShell: [`src/newman/run-newman.ps1`](../../../../../src/newman/run-newman.ps1)
- Collections & Data files: [`src/postman/`](../../../../../src/postman/)
- Newman docs: <https://www.npmjs.com/package/newman>
- htmlextra docs: <https://www.npmjs.com/package/newman-reporter-htmlextra>
