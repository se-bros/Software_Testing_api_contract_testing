---
layout: section
---

# PHẦN F — TỔNG KẾT

<div class="text-lg text-gray-400 mt-4">So sánh · Khi nào dùng gì · Takeaway</div>

---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">10 · Comparison</div>

# API Testing vs Contract Testing

<div class="mt-4">
  <table class="w-full text-sm">
  <thead>
      <tr class="border-b-2 border-cyan-200">
        <th class="text-left py-2 text-cyan-700 w-1/4"></th>
        <th class="text-left py-2 text-cyan-700 w-1/3">API Testing</th>
        <th class="text-left py-2 text-cyan-700 w-1/3">Contract Testing</th>
      </tr>
  </thead>
  <tbody>
      <tr v-click class="border-b border-gray-100"><td class="py-2 font-bold">Câu hỏi</td><td>Endpoint hoạt động đúng?</td><td>Consumer & Provider còn tương thích?</td></tr>
      <tr v-click class="border-b border-gray-100"><td class="py-2 font-bold">Công cụ</td><td>Postman + Newman</td><td>Pact</td></tr>
      <tr v-click class="border-b border-gray-100"><td class="py-2 font-bold">Phạm vi</td><td>Nhiều endpoint, nhiều case</td><td>Một cặp Consumer–Provider</td></tr>
      <tr v-click class="border-b border-gray-100"><td class="py-2 font-bold">Data</td><td>Data-driven (CSV/JSON)</td><td>Pact interactions + matchers</td></tr>
      <tr v-click class="border-b border-gray-100"><td class="py-2 font-bold">Automation</td><td>Newman trong GitHub Actions</td><td>Pact verification + can-i-deploy</td></tr>
      <tr v-click class="border-b border-gray-100"><td class="py-2 font-bold">Phát hiện</td><td>Lỗi chức năng, validation, auth</td><td>Breaking change tại biên</td></tr>
      <tr v-click><td class="py-2 font-bold">Bổ sung</td><td colspan="2" class="text-center text-cyan-700 font-bold">✓ Cả hai cùng cần thiết</td></tr>
  </tbody>
  </table>
</div>

<!--
Cả hai giải quyết hai nhóm rủi ro khác nhau.
-->

---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">10 · When to Use</div>

# Khi nào dùng gì?

<div class="grid grid-cols-2 gap-8 mt-6">
  <div>
  <h3 class="text-lg font-bold text-cyan-700 mb-3">Dùng API Testing khi</h3>
  <v-clicks>

  - Kiểm tra **chức năng** endpoint
  - **Validation** input/output
  - **Authentication** & Authorization
  - **Regression suite** cho API

  </v-clicks>
  </div>
  <div>
  <h3 class="text-lg font-bold text-blue-700 mb-3">Dùng Contract Testing khi</h3>
  <v-clicks>

  - Nhiều service phát triển **độc lập**
  - Hay có **breaking change** khi tích hợp
  - Cần **deployment gate** (can-i-deploy)
  - Muốn **feedback sớm** trước staging

  </v-clicks>
  </div>
</div>

<div v-click class="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
  <strong class="text-gray-700">Chiến lược tối ưu:</strong>
  <span class="text-sm text-gray-500 ml-2">Unit → logic · Contract → compatibility · API/Integration → chức năng & wiring · Ít E2E → critical journeys</span>
</div>

<!--
Dùng đúng lớp test cho đúng loại rủi ro.
-->

---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">10 · Adoption</div>

# Adoption Path — Bắt đầu thế nào?

<div class="mt-6 space-y-3">
  <div v-click class="p-4 bg-white border border-gray-200 rounded-lg flex items-start gap-3">
  <span class="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</span>
  <div>
      <strong>Chọn một ranh giới rủi ro</strong>
      <div class="text-sm text-gray-500">Cặp Consumer–Provider hay thay đổi/hay gãy</div>
  </div>
  </div>
  <div v-click class="p-4 bg-white border border-gray-200 rounded-lg flex items-start gap-3">
  <span class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</span>
  <div>
      <strong>Contract 1–2 luồng quan trọng</strong>
      <div class="text-sm text-gray-500">Success + một error behavior</div>
  </div>
  </div>
  <div v-click class="p-4 bg-white border border-gray-200 rounded-lg flex items-start gap-3">
  <span class="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</span>
  <div>
      <strong>Chạy trong CI</strong>
      <div class="text-sm text-gray-500">Consumer test + provider verification</div>
  </div>
  </div>
  <div v-click class="p-4 bg-white border border-gray-200 rounded-lg flex items-start gap-3">
  <span class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">4</span>
  <div>
      <strong>Thêm Broker + can-i-deploy</strong>
      <div class="text-sm text-gray-500">Khi workflow ổn định</div>
  </div>
  </div>
  <div v-click class="p-4 bg-white border border-gray-200 rounded-lg flex items-start gap-3">
  <span class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">5</span>
  <div>
      <strong>Đo hiệu quả</strong>
      <div class="text-sm text-gray-500">Lỗi phát hiện trước staging, thời gian feedback, số deploy bị chặn đúng</div>
  </div>
  </div>
</div>

<!--
Đừng bắt đầu bằng cách contract hóa mọi endpoint.
-->

---
layout: center
class: text-center
---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">Takeaway</div>

# 3 từ khóa

<div class="grid grid-cols-3 gap-6 mt-10 max-w-4xl mx-auto">
  <div class="p-6 bg-cyan-50 border border-cyan-200 rounded-xl">
  <div class="text-3xl font-bold text-cyan-600">Fast</div>
  <div class="text-sm text-gray-500 mt-2">Feedback sớm tại local và CI</div>
  </div>
  <div class="p-6 bg-blue-50 border border-blue-200 rounded-xl">
  <div class="text-3xl font-bold text-blue-600">Focused</div>
  <div class="text-sm text-gray-500 mt-2">Khoanh đúng ranh giới Consumer–Provider</div>
  </div>
  <div class="p-6 bg-indigo-50 border border-indigo-200 rounded-xl">
  <div class="text-3xl font-bold text-indigo-600">Safe</div>
  <div class="text-sm text-gray-500 mt-2">Các service tiến hóa độc lập có kiểm soát</div>
  </div>
</div>

<div class="mt-8 text-sm text-gray-500 max-w-2xl mx-auto">
  API Testing + Contract Testing giải quyết hai nhóm rủi ro khác nhau.
  Newman + GitHub Actions = regression suite tự động.
  Pact = contract artifact + provider verification + compatibility gate.
</div>

<!--
Chốt lại bằng ba từ: Fast, Focused, Safe.
-->

---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">Resources</div>

# Deliverables & Resources

<div class="grid grid-cols-2 gap-8 mt-6">
  <div>
  <h3 class="text-lg font-bold text-cyan-700 mb-3">Videos</h3>
  <v-clicks>

  - **Video 1:** Lý thuyết & Thuật ngữ API / Contract Testing
  - **Video 2:** Hướng dẫn cài đặt môi trường
  - **Video 3:** Demo thực hành (Postman + Newman + Pact & AI)

  </v-clicks>

  <h3 class="text-lg font-bold text-blue-700 mt-6 mb-3">Tài liệu thực hành</h3>
  <v-clicks>

  - **Activity Worksheet** — 90 phút tại lớp
  - **Mini Exercise** — Từ API Test đến Contract Breaking Change

  </v-clicks>
  </div>
  <div>
  <h3 class="text-lg font-bold text-indigo-700 mb-3">Repository</h3>
  <v-clicks>

  - `src/sample-api/pact-workshop-js/` — Pact source code
  - `src/postman/` — Collections + data files
  - `src/newman/` — Runner scripts
  - `.github/workflows/` — CI/CD pipelines

  </v-clicks>

  <h3 class="text-lg font-bold text-emerald-700 mt-6 mb-3">Tài liệu tham khảo</h3>
  <v-clicks>

  - [docs.pact.io](https://docs.pact.io) — Pact Foundation
  - [learning.postman.com](https://learning.postman.com) — Postman
  - [github.com/postmanlabs/newman](https://github.com/postmanlabs/newman) — Newman

  </v-clicks>
  </div>
</div>

<!--
Repository: github.com/Anhnguyenk835/Software_Testing_api_contract_testing
-->

---
layout: center
class: text-center
---

<div class="mt-16">
  <div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-6">Q & A</div>

  <h1 class="text-5xl font-bold leading-tight">
    Cảm ơn thầy/cô<br>và các bạn đã lắng nghe
  </h1>

  <div class="mt-8 text-xl text-gray-400">Mời câu hỏi &amp; thảo luận</div>
</div>

<div class="mt-12 flex justify-center gap-4">
  <div class="px-4 py-2 bg-cyan-50 border border-cyan-200 rounded-lg text-sm text-cyan-700">API Testing</div>
  <div class="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">Contract Testing</div>
  <div class="px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-lg text-sm text-indigo-700">Newman CI/CD</div>
  <div class="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700">AI-Assisted</div>
</div>

<!--
Mở Q&A. Nếu chuyển sang demo, mở consumer pact test trước.
-->
