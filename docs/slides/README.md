# Contract Testing Slidev Deck

Deck slide thuyết trình lý thuyết và kiến trúc Consumer–Provider dành cho seminar của **Nhóm 03 — SEBros**.

---

## 📂 Cấu trúc thư mục

```text
docs/slides/
├── slides.md               # Entry point chính của Slidev
├── pages/                  # [MỚI] Tách theo từng phần & từng file slide riêng
│   ├── 1.intro/
│   │   ├── 1.1.cover.md
│   │   ├── 1.2.members.md
│   │   ├── 1.3.agenda.md
│   │   ├── 1.4.intro_section.md
│   │   └── main.md
│   ├── 2.api_testing/
│   │   ├── 2.1.section.md ... 2.10.product_service.md
│   │   └── main.md
│   ├── 3.automation_cicd/
│   │   ├── 3.1.section.md ... 3.5.automation_value.md
│   │   └── main.md
│   ├── 4.contract_testing/
│   │   ├── 4.1.section.md ... 4.7.limitations.md
│   │   └── main.md
│   ├── 5.demo_pact/
│   │   ├── 5.1.section.md ... 5.7.breaking_change.md
│   │   └── main.md
│   ├── 6.ai_testing/
│   │   ├── 6.1.section.md ... 6.3.agent_skill.md
│   │   └── main.md
│   └── 7.summary/
│       ├── 7.1.section.md ... 7.7.qna.md
│       └── main.md
├── styles/                 # CSS tùy chỉnh giao diện (index.css)
├── setup/                  # Cấu hình plugin (Mermaid,...)
├── scripts/                # Script kiểm tra cú pháp slide (verify-slides.mjs)
├── drafts/                 # Bản nháp nội dung & outline tham khảo
├── README.md               # Hướng dẫn sử dụng
└── package.json            # Cấu hình dự án & scripts
```

---

## 🚀 Lệnh thực thi (dùng pnpm)

### 0. Cài đặt phụ thuộc
```bash
pnpm install
```

### 1. Khởi động Dev Server (Trình chiếu)
```bash
pnpm dev
```

### 2. Kiểm tra cú pháp Slide (Lint / Verify)
```bash
pnpm verify
```

### 3. Build sản phẩm (Production)
```bash
pnpm build
```

### 4. Xuất file PDF
```bash
pnpm dlx playwright install chromium
pnpm export
```

---

> **Theme**: `default` / `seriph` | **Colors**: Navy & Cyan | **Diagrams**: Mermaid.js
