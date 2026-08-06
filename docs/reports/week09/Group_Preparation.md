# Preparation Checklist — Hướng dẫn Chuẩn bị Mini Exercise (Group 03 - SEBros)

Tài liệu này tổng hợp các hạng mục cần chuẩn bị, phân công và kiểm tra kỹ thuật trước giờ thực hành Mini Exercise (API Testing & CI/CD) để buổi thực hành tại lớp diễn ra suôn sẻ.

---

## 📂 1. Quản lý Tài nguyên & Phân phối (Deliverables Hub)

Trước buổi học, các thành viên cần kiểm tra và chuẩn bị sẵn các liên kết sau để gửi cho lớp và Giảng viên/TA:

- [ ] **Moodle/Discord Post:** Đăng bài kèm link Repository GitHub của nhóm và Hướng dẫn chuẩn bị trước giờ học (Prerequisites).
- [ ] **Tài liệu Mini Exercise:** Gửi link trực tiếp tới file [Mini_Exercise.md](file:///d:/Project/Software_Testing_api_contract_testing/docs/Mini_Exercise.md) (hoặc file PDF đã xuất) để lớp mở trực tiếp trên GitHub.
- [ ] **Postman Assets:** Trích xuất hoặc chia sẻ link Postman Public Workspace (hoặc file JSON tải về) chứa:
  - Collection: `Product Service - Data Driven Tests`
  - Environment: `Product Service - Local`
  - Test data: `get-product-by-id.data.json`

---

## 🛠️ 2. Chuẩn bị Kỹ thuật (Technical Setup Checklist)

Đảm bảo môi trường demo của nhóm hoạt động hoàn hảo trên ít nhất 2 máy tính (1 máy chính chiếu demo, 1 máy dự phòng).

### A. Môi trường SUT (System Under Test)
- [ ] Cài đặt dependencies thành công:
  ```bash
  npm ci --prefix src/sample-api/pact-workshop-js
  ```
- [ ] Chạy thử API Provider cục bộ và truy cập `http://localhost:8080/health` trả kết quả `{"status":"ok"}`.
- [ ] Đảm bảo không bị đụng cổng (`EADDRINUSE`) với các ứng dụng khác (ví dụ: Skype, Docker, Web server khác sử dụng cổng `8080`).

### B. Môi trường Postman & Newman
- [ ] Cài đặt global Newman: `npm install -g newman`.
- [ ] Chạy thử bộ Newman local bằng file script hoặc lệnh thủ công:
  ```bash
  newman run src/postman/collections/product-service-data-driven.postman_collection.json -e src/postman/environments/local.postman_environment.json -d src/postman/data/get-product-by-id.data.json
  ```
- [ ] Kiểm tra báo cáo Newman chạy thành công không có assertion fail.

---

## 👥 3. Phân công trong Buổi học (Classroom Support Roles)

Buổi thực hành tại lớp rất ngắn, cần phân công rõ ràng để hỗ trợ các nhóm khác khi gặp lỗi kỹ thuật:

| Thành viên | Vai trò chính | Nhiệm vụ chi tiết |
| :--- | :--- | :--- |
| **Anh Khoa** | Demo kỹ thuật | Trình chiếu các bước thực hành (Postman, Newman, Git push, test CI/CD Actions) trên máy chiếu. |
| **Thế Khoa** | Support kỹ thuật (F1) | Đi quanh lớp hỗ trợ thực hiện Git Fork, Git Clone, và cài đặt môi trường (NodeJS, Newman) cho các nhóm. |
| **Nguyên An** | Support kỹ thuật (F2) | Đi quanh lớp hỗ trợ viết script Postman, kiểm tra lỗi Newman. |
| **Quốc Tấn** | Support kỹ thuật (F3) | Hỗ trợ gỡ lỗi port 8080 bị chiếm, kiểm tra file dữ liệu JSON. |
| **Tuấn Anh** | Hỗ trợ CI/CD | Hỗ trợ các bạn kiểm tra trạng thái workflow trên GitHub Actions và cách tạo commit fail có chủ đích. |

---

## 🚨 4. Các tình huống lỗi thường gặp & Cách xử lý (Troubleshooting Guide)

Khi hỗ trợ các bạn nhóm khác thực hành, hãy lưu ý các lỗi kinh điển sau:

1. **Lỗi `newman: command not found`:**
   - *Nguyên nhân:* Chưa cài global hoặc chưa cấu hình PATH môi trường Node.js.
   - *Cách xử lý:* Hướng dẫn chạy `npm install -g newman` hoặc sử dụng npx trực tiếp: `npx newman run ...`.

2. **Lỗi `EADDRINUSE: address already in use :::8080`:**
   - *Nguyên nhân:* Port `8080` đang bị chiếm bởi một process khác (thường là Postman Desktop Agent, Docker, hoặc server cũ chưa tắt).
   - *Cách xử lý:*
     - Windows: Chạy lệnh `Get-NetTCPConnection -LocalPort 8080` để tìm PID rồi kill nó, hoặc tắt ứng dụng Postman Agent ở khay hệ thống.
     - Hoặc: Đổi cổng API Provider trong `server.js` và cập nhật `baseUrl` trong file environment của Postman.

3. **Lỗi `X-Student-Id missing or invalid`:**
   - *Nguyên nhân:* Sinh viên chưa cấu hình biến môi trường `studentId` hoặc viết sai Pre-request script.
   - *Cách xử lý:* Hướng dẫn kiểm tra tab Variables của Environment hoạt động và xem log console của Postman.

4. **Lỗi GitHub Actions không chạy (Workflow Disabled):**
   - *Nguyên nhân:* Khi fork/clone repo mới, GitHub Actions có thể bị tắt theo mặc định bảo mật.
   - *Cách xử lý:* Hướng dẫn vào tab **Actions** trên repo cá nhân của họ và nhấn nút **Enable GitHub Actions**.
