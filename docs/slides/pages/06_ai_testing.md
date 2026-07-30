---
layout: section
---

# PHẦN E — AI HỖ TRỢ KIỂM THỬ

<div class="text-lg text-gray-400 mt-4">AI-assisted Testing · Agent Skill</div>

---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">09 · AI in Testing</div>

# AI trong quy trình Testing

<div class="grid grid-cols-2 gap-8 mt-6">
  <div>
  <h3 class="text-lg font-bold text-cyan-700 mb-3">Vai trò AI</h3>
  <v-clicks>

  - Sinh test case từ **API specification**
  - Gợi ý cấu trúc **Postman Collection**
  - Review contract, phát hiện **thiếu sót**
  - Tạo sơ đồ, tài liệu, **workflow mẫu**

  </v-clicks>

  <h3 class="text-lg font-bold text-blue-700 mt-6 mb-3">Công cụ đã dùng</h3>
  <v-clicks>

  - **Claude, ChatGPT, Gemini** — research & drafting
  - **Postman Postbot** — sinh test script
  - **Agent Skill** — tự động sinh test từ API spec

  </v-clicks>
  </div>
  <div>
  <h3 class="text-lg font-bold text-indigo-700 mb-3">Nguyên tắc AI-First</h3>
  <div class="space-y-3">
      <div v-click class="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm">
        <span class="font-bold text-indigo-600">1.</span> Hướng dẫn AI từng bước — không prompt chung chung
      </div>
      <div v-click class="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm">
        <span class="font-bold text-indigo-600">2.</span> Human review mọi output — VALID / INVALID / INCOMPLETE
      </div>
      <div v-click class="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm">
        <span class="font-bold text-indigo-600">3.</span> AI Audit Report — ghi log toàn bộ quá trình
      </div>
      <div v-click class="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm">
        <span class="font-bold text-indigo-600">4.</span> Quality over completion
      </div>
  </div>
  </div>
</div>

<!--
AI-First: hướng dẫn từng bước, human review, audit report.
-->

---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">09 · Agent Skill</div>

# Agent Skill — AI-driven Test Generator

<div class="grid grid-cols-3 gap-4 mt-6">
  <div v-click class="p-4 bg-cyan-50 border border-cyan-200 rounded-xl text-center">
  <div class="text-sm font-bold text-cyan-700 mb-2">INPUT</div>
  <div class="text-sm text-gray-600">API Specification<br>(OpenAPI / Markdown)</div>
  </div>
  <div v-click class="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
  <div class="text-sm font-bold text-blue-700 mb-2">PROCESS</div>
  <div class="text-sm text-gray-600">Phân tích endpoint →<br>Sinh test cases →<br>Tạo Postman Collection</div>
  </div>
  <div v-click class="p-4 bg-indigo-50 border border-indigo-200 rounded-xl text-center">
  <div class="text-sm font-bold text-indigo-700 mb-2">OUTPUT</div>
  <div class="text-sm text-gray-600">Collection JSON +<br>Data files +<br>Test scripts</div>
  </div>
</div>

<div class="mt-8">
  <h3 class="text-lg font-bold text-cyan-700 mb-3">Tính tái sử dụng</h3>
  <div class="grid grid-cols-2 gap-4">
  <div v-click class="p-4 bg-green-50 border border-green-200 rounded-xl text-center">
      <div class="text-3xl font-bold text-green-600">>80%</div>
      <div class="text-sm text-gray-500">Mã nguồn/prompt tái sử dụng</div>
  </div>
  <div v-click class="p-4 bg-green-50 border border-green-200 rounded-xl text-center">
      <div class="text-3xl font-bold text-green-600">100%</div>
      <div class="text-sm text-gray-500">Agent Skill, workflows, Newman runner</div>
  </div>
  </div>
</div>

<div v-click class="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm">
  <strong>Demo:</strong> Chạy Agent Skill trên Swagger PetStore API → chứng minh reusability
</div>

<!--
>80% reusable. Demo trên PetStore API.
-->

