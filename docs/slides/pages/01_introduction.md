
<div class="text-center mt-8">
  <div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">Software Testing Seminar</div>
  <h1 class="text-6xl font-bold leading-tight">
  <span class="text-cyan-600">API Testing</span> &<br><span class="text-blue-600">Contract Testing</span>
  </h1>
  <div class="mt-4 text-xl text-gray-500">Nhóm 03 — SEBros</div>
</div>

<div class="mt-8 max-w-4xl mx-auto">
  <div class="text-xs font-mono tracking-widest text-gray-400 uppercase text-center mb-3">Thành viên</div>
  <div class="grid grid-cols-5 gap-3 text-center">
  <div class="p-2 bg-gray-50 border border-gray-200 rounded-lg">
  <div class="text-sm font-bold text-gray-700">Mạch Quốc Tấn</div>
  <div class="text-xs text-gray-400 font-mono mt-0.5">23127115</div>
  </div>
  <div class="p-2 bg-gray-50 border border-gray-200 rounded-lg">
  <div class="text-sm font-bold text-gray-700">Ngô Nguyễn Thế Khoa</div>
  <div class="text-xs text-gray-400 font-mono mt-0.5">23127065</div>
  </div>
  <div class="p-2 bg-gray-50 border border-gray-200 rounded-lg">
  <div class="text-sm font-bold text-gray-700">Nguyễn Lê Hồ Anh Khoa</div>
  <div class="text-xs text-gray-400 font-mono mt-0.5">23127211</div>
  </div>
  <div class="p-2 bg-gray-50 border border-gray-200 rounded-lg">
  <div class="text-sm font-bold text-gray-700">Ân Tiến Nguyên An</div>
  <div class="text-xs text-gray-400 font-mono mt-0.5">23127148</div>
  </div>
  <div class="p-2 bg-gray-50 border border-gray-200 rounded-lg">
  <div class="text-sm font-bold text-gray-700">Nguyễn Tuấn Anh</div>
  <div class="text-xs text-gray-400 font-mono mt-0.5">23127152</div>
  </div>
  </div>
</div>

<div class="mt-6 flex justify-center gap-6">
  <div class="px-4 py-2 bg-cyan-50 border border-cyan-200 rounded-lg text-sm text-cyan-700">Postman</div>
  <div class="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">Newman</div>
  <div class="px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-lg text-sm text-indigo-700">Pact</div>
  <div class="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700">GitHub Actions</div>
</div>

<!--
Trang bìa — giới thiệu tên đề tài và nhóm.
-->

---
layout: center
---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">Agenda</div>

# Nội dung trình bày

<div class="grid grid-cols-2 gap-x-12 gap-y-3 mt-8 text-lg">
  <div v-click class="flex items-start gap-3">
  <span class="text-cyan-600 font-bold">01</span>
  <span>Giới thiệu & Mục tiêu</span>
  </div>
  <div v-click class="flex items-start gap-3">
  <span class="text-cyan-600 font-bold">02</span>
  <span>API Testing — Khái niệm & Kỹ thuật</span>
  </div>
  <div v-click class="flex items-start gap-3">
  <span class="text-cyan-600 font-bold">03</span>
  <span>Công cụ: Postman & REST Client</span>
  </div>
  <div v-click class="flex items-start gap-3">
  <span class="text-cyan-600 font-bold">04</span>
  <span>Demo: API Testing thực hành</span>
  </div>
  <div v-click class="flex items-start gap-3">
  <span class="text-cyan-600 font-bold">05</span>
  <span>Automation với Newman & CI/CD</span>
  </div>
  <div v-click class="flex items-start gap-3">
  <span class="text-cyan-600 font-bold">06</span>
  <span>Contract Testing — Vấn đề & Giải pháp</span>
  </div>
  <div v-click class="flex items-start gap-3">
  <span class="text-cyan-600 font-bold">07</span>
  <span>Pact: Consumer → Provider → Broker</span>
  </div>
  <div v-click class="flex items-start gap-3">
  <span class="text-cyan-600 font-bold">08</span>
  <span>Demo: Contract Testing & Breaking Change</span>
  </div>
  <div v-click class="flex items-start gap-3">
  <span class="text-cyan-600 font-bold">09</span>
  <span>AI hỗ trợ kiểm thử</span>
  </div>
  <div v-click class="flex items-start gap-3">
  <span class="text-cyan-600 font-bold">10</span>
  <span>Tổng kết & Q&A</span>
  </div>
</div>

<!--
Agenda 10 mục. Seminar gồm 3 video + 90 phút thực hành tại lớp.
-->

---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">01 · Introduction</div>

# Giới thiệu & Mục tiêu

<div class="grid grid-cols-2 gap-8 mt-6">
  <div>
  <h3 class="text-lg font-bold text-cyan-700 mb-3">Bối cảnh</h3>
  <v-clicks>

  - Hệ thống hiện đại chia thành nhiều **service độc lập** (microservices)<sup>1</sup>
  - Mỗi service có API riêng → cần kiểm thử ở **nhiều lớp**
  - Kiểm thử thủ công không đủ → cần **automation & CI/CD**<sup>2</sup>

  </v-clicks>
  </div>
  <div>
  <h3 class="text-lg font-bold text-blue-700 mb-3">Mục tiêu seminar</h3>
  <v-clicks>

  - Hiểu và thực hành **API Testing** (functional testing tầng API)
  - Hiểu và thực hành **Contract Testing** (tương thích Consumer–Provider)
  - Tự động hóa bằng **Newman + GitHub Actions**
  - Trải nghiệm quy trình **AI-assisted testing**

  </v-clicks>
  </div>
</div>

<div v-click class="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm">
  <strong class="text-cyan-700">Phạm vi:</strong> Product Service API (Node.js/Express) — CRUD 5 endpoints · Postman, Newman, Pact, GitHub Actions
</div>

<div class="footnotes">
<div class="fn-item"><sup>1</sup><strong>microservices</strong> — Kiến trúc chia hệ thống thành các service nhỏ, chạy độc lập, giao tiếp qua API.</div>
<div class="fn-item"><sup>2</sup><strong>CI/CD</strong> — Tự động hóa liên tục: tích hợp mã (CI) và triển khai (CD) mỗi khi có thay đổi.</div>
</div>

<!--
Bối cảnh microservices → cần kiểm thử nhiều lớp.
-->

