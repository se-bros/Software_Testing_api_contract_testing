# API Testing & Contract Testing — Seminar SEBros (Group 03)

Repository phục vụ seminar môn **Kiểm thử phần mềm** với chủ đề **API Testing & Contract Testing**. Mục tiêu là cung cấp cả phần lý thuyết mẫu, kịch bản demo và mã nguồn thực hành hoàn chỉnh để các bạn trong lớp có thể clone về chạy thử ngay.

---

## 📂 Cấu trúc thư mục dự án

```text
.
├── .agents/
│   └── skills/                                 # Các bộ Agent Skills tùy chỉnh phục vụ AI-native IDE
│       ├── api-testing/                        # Sinh Postman collection & Newman runner từ API spec
│       ├── contract-testing/                   # Sinh Jest consumer/provider Pact contract tests
│       └── ai-audit-report/                    # Tự động hóa tạo báo cáo nhật ký sử dụng AI
├── .github/
│   └── workflows/                              # Cấu hình GitHub Actions CI/CD
│       ├── newman-api-test.yml                 # Workflow chạy Newman API tests tự động
│       └── pact-verification.yml               # Workflow 3-job kiểm chứng Pact & Can-I-Deploy gate
├── docs/
│   ├── demo/
│   │   └── videos/                             # Kịch bản chi tiết và hướng dẫn quay 3 video demo
│   ├── reports/
│   │   ├── week08/                             # Nhật ký báo cáo hàng tuần và AI Usage Audit log
│   │   └── final-report.md                     # Báo cáo chuyên đề chính thức (Markdown)
│   └── slides/                                 # Slide thuyết trình dạng Slidev (Slide as Code)
└── src/
    ├── newman/                                 # Runner script tự động chạy Newman (.ps1 & .sh)
    ├── postman/                                # Cấu hình Postman (Collections, Environments & Data Files)
    └── sample-api/
        └── pact-workshop-js/                   # Dự án mẫu minh họa API & Contract Testing
            ├── consumer/                       # Mock Pact Consumer test sử dụng React Client
            └── provider/                       # Mock Pact Provider API & Verification test (Express)
```

---

## ⚡ Hướng dẫn khởi chạy cục bộ (Quick Start)

### 1. Chuẩn bị môi trường
Yêu cầu hệ thống đã cài đặt **Node.js (v20+)** và **npm**.
Cài đặt thư viện dependencies cho cả project mẫu:
```bash
cd src/sample-api/pact-workshop-js
npm install
```

### 2. Chạy thử Newman API Test
Khởi động API Provider trên cổng `8080`:
```powershell
cd src/sample-api/pact-workshop-js/provider
node server.js
```
Chạy bộ test Newman bằng PowerShell Runner:
```powershell
cd ../../../../
powershell -ExecutionPolicy Bypass -File src/newman/run-newman.ps1 -Collection src/postman/collections/product-service.postman_collection.json -Url "http://localhost:8080"
```

### 3. Chạy thử Pact Contract Test
*Chú ý: Tắt API Provider thật ở bước 2 trước khi chạy.*
1. **Phía Consumer (Sinh contract dạng JSON):**
   ```bash
   cd src/sample-api/pact-workshop-js/consumer
   npm run test:pact
   ```
2. **Phía Provider (Verify contract chéo):**
   ```bash
   cd src/sample-api/pact-workshop-js/provider
   npm run test:pact
   ```

---

## 🤖 Hướng dẫn sử dụng Agent Skill (AI-Native Integration)

Repository tích hợp sẵn các **Agent Skills** nằm trong thư mục `.agents/skills/`. Đây là các tập hướng dẫn hành vi tùy chỉnh giúp các trợ lý AI (Gemini Code Assist, Claude Code, Cursor Agent) có thể tự động đọc và thực thi nhiệm vụ viết mã, thiết kế test suite đúng chuẩn của nhóm 3 mà không cần con người hướng dẫn lại từ đầu.

### Cách kích hoạt và sử dụng Agent Skill:
Khi chat với AI trong IDE của bạn, hãy chỉ thị rõ tên Skill hoặc trỏ trực tiếp đến file `SKILL.md` tương ứng để AI tải chỉ dẫn:

1. **API Testing Suite Generator (`api-testing`):**
   * **Mục đích:** Tự động sinh bộ Postman Collection (data-driven), Data files (JSON/CSV) và script Newman từ OpenAPI/Swagger spec bất kỳ.
   * **Cách gọi AI:**
     > *"Hãy sử dụng skill [api-testing](file:///.agents/skills/api-testing/SKILL.md) để phân tích tài liệu API sau và sinh bộ Postman test suite hoàn chỉnh..."*

2. **Contract Testing Generator (`contract-testing`):**
   * **Mục đích:** Tự động thiết lập Pact Consumer test (sử dụng code client thật), thiết lập Provider verification kèm State Handlers và cấu hình chất lượng cổng `can-i-deploy`.
   * **Cách gọi AI:**
     > *"Hãy dùng skill [contract-testing](file:///.agents/skills/contract-testing/SKILL.md) để viết bộ contract test chéo cho Consumer và Provider sau..."*

3. **AI Usage Audit Reporter (`ai-audit-report`):**
   * **Mục đích:** Tự động sinh hoặc cập nhật file `AI_Audit_Report.md` tuân thủ đúng yêu cầu chứng minh việc tự học bằng AI của Khoa CNTT - Trường ĐH KHTN.
   * **Cách gọi AI:**
     > *"Dùng skill [ai-audit-report](file:///.agents/skills/ai-audit-report/SKILL.md) để ghi nhận nhật ký sử dụng AI cho task gỡ lỗi cổng kết nối vừa rồi..."*

---

## 👥 Thành viên nhóm — Group 03 (SEBros)

* **23127065** – Ngô Nguyễn Thế Khoa
* **23127148** – Ân Tiến Nguyên An
* **23127115** – Mạch Quốc Tấn
* **23127152** – Nguyễn Tuấn Anh
* **23127211** – Nguyễn Lê Hồ Anh Khoa
