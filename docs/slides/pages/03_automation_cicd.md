---
layout: section
---

# PHẦN B — AUTOMATION & CI/CD

<div class="text-lg text-gray-400 mt-4">Newman · GitHub Actions · Pipeline</div>

---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">05 · Newman</div>

# Newman — CLI Runner

<div class="grid grid-cols-2 gap-8 mt-4">
  <div>
  <h3 class="text-lg font-bold text-cyan-700 mb-3">Newman là gì</h3>
  <v-clicks>

  - Command-line runner cho **Postman Collection**
  - Chạy test **không cần mở Postman GUI**
  - Xuất báo cáo: **CLI, HTML, JSON**

  </v-clicks>

  <h3 class="text-lg font-bold text-blue-700 mt-6 mb-3">Luồng tự động hóa</h3>
  <v-clicks>

  1. Khởi động Provider tại `localhost:8080`
  2. Readiness probe: gọi `/health`
  3. Chạy Newman với collection + environment
  4. Xuất báo cáo HTML + JSON
  5. Upload artifact (kể cả khi test fail)

  </v-clicks>
  </div>
  <div>
  <h3 class="text-lg font-bold text-indigo-700 mb-3">Lệnh cốt lõi</h3>

```bash
newman run collection.json \
  -e environment.json \
  --reporters cli,htmlextra,json \
  --reporter-htmlextra-export report.html \
  --reporter-json-export report.json
```

  </div>
</div>

<!--
Newman = CLI runner cho Postman Collection.
-->

---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">05 · CI/CD</div>

# GitHub Actions — Newman Pipeline

<div class="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm">
  <span class="text-gray-500">Workflow:</span> <span class="text-cyan-700 font-bold">newman-api-test.yml</span>
  <span class="text-gray-400 mx-2">|</span>
  <span class="text-gray-500">Trigger:</span> <span class="text-blue-700">push/PR vào main + manual dispatch</span>
</div>

<div class="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm leading-7">
  <div class="text-gray-600">Checkout → Setup Node 20 → Install deps → Start Provider</div>
  <div class="text-gray-600">→ Wait <span class="text-cyan-600">/health</span> (30s timeout) → Install Newman</div>
  <div class="text-gray-600">→ <span class="text-blue-600">Run Newman</span> → Upload report artifact</div>
</div>

<div class="grid grid-cols-2 gap-4 mt-4">
  <div v-click class="p-3 bg-cyan-50 border border-cyan-200 rounded-lg text-sm">
  <strong class="text-cyan-700">permissions: contents: read</strong>
  <div class="text-gray-500 text-xs mt-1">Giới hạn quyền tối thiểu</div>
  </div>
  <div v-click class="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
  <strong class="text-blue-700">timeout-minutes: 10</strong>
  <div class="text-gray-500 text-xs mt-1">Tránh pipeline treo</div>
  </div>
  <div v-click class="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-sm">
  <strong class="text-indigo-700">concurrency: cancel-in-progress</strong>
  <div class="text-gray-500 text-xs mt-1">Hủy run cũ khi push mới</div>
  </div>
  <div v-click class="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm">
  <strong class="text-emerald-700">if: always()</strong>
  <div class="text-gray-500 text-xs mt-1">Luôn upload report để debug</div>
  </div>
</div>

<!--
Không cần secret vì token do Pre-request script tự sinh.
-->

---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">05 · CI/CD</div>

# GitHub Actions — Pact Pipeline

<div class="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm">
  <span class="text-gray-500">Workflow:</span> <span class="text-cyan-700 font-bold">pact-verification.yml</span>
</div>

<div class="mt-6 flex items-center justify-center gap-4">
  <div class="p-4 bg-cyan-50 border-2 border-cyan-300 rounded-xl text-center w-56">
  <div class="text-sm font-bold text-cyan-700">Consumer Pact</div>
  <div class="text-xs text-gray-500 mt-1">Sinh pact.json</div>
  <div class="text-xs text-gray-400 mt-1">npm run test:pact</div>
  </div>
  <div class="text-2xl text-gray-300">→</div>
  <div class="p-4 bg-blue-50 border-2 border-blue-300 rounded-xl text-center w-56">
  <div class="text-sm font-bold text-blue-700">Provider Verification</div>
  <div class="text-xs text-gray-500 mt-1">Verify pact thật</div>
  <div class="text-xs text-gray-400 mt-1">Chạy với API thật</div>
  </div>
  <div class="text-2xl text-gray-300">→</div>
  <div class="p-4 bg-indigo-50 border-2 border-indigo-300 rounded-xl text-center w-56">
  <div class="text-sm font-bold text-indigo-700">can-i-deploy</div>
  <div class="text-xs text-gray-500 mt-1">Quality gate</div>
  <div class="text-xs text-gray-400 mt-1">Chặn nếu incompatible</div>
  </div>
</div>

<div class="grid grid-cols-3 gap-4 mt-6 text-sm">
  <div v-click class="p-3 bg-gray-50 border border-gray-200 rounded-lg">
  <strong class="text-cyan-700">Job 1 — Consumer</strong>
  <div class="text-gray-500 text-xs mt-1">Chạy consumer test → sinh pact JSON → upload artifact → publish lên Broker</div>
  </div>
  <div v-click class="p-3 bg-gray-50 border border-gray-200 rounded-lg">
  <strong class="text-blue-700">Job 2 — Provider</strong>
  <div class="text-gray-500 text-xs mt-1">Download pact → chạy verifier với API thật → publish kết quả</div>
  </div>
  <div v-click class="p-3 bg-gray-50 border border-gray-200 rounded-lg">
  <strong class="text-indigo-700">Job 3 — can-i-deploy</strong>
  <div class="text-gray-500 text-xs mt-1">Kiểm tra compatibility matrix → chặn deploy nếu chưa tương thích</div>
  </div>
</div>

<!--
3 jobs nối tiếp: Consumer → Provider → can-i-deploy.
-->

---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">05 · Value</div>

# Giá trị của Automation

<div class="mt-6">
  <h3 class="text-lg font-bold text-cyan-700 mb-3">Hai lớp bảo vệ</h3>

| Lớp | Công cụ | Phát hiện |
|-----|---------|-----------|
| **Functional** | Newman/Postman | Lỗi chức năng, validation, auth, payload |
| **Compatibility** | Pact | Breaking change tại biên Consumer–Provider |

</div>

<div class="grid grid-cols-2 gap-4 mt-6">
  <div v-click class="p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
  <strong class="text-cyan-700">Phản hồi sớm</strong>
  <div class="text-sm text-gray-500 mt-1">Chạy trên mỗi push/PR</div>
  </div>
  <div v-click class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
  <strong class="text-blue-700">Tái lập</strong>
  <div class="text-sm text-gray-500 mt-1">Log + artifact lưu lại để debug</div>
  </div>
  <div v-click class="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
  <strong class="text-indigo-700">Giảm thủ công</strong>
  <div class="text-sm text-gray-500 mt-1">Không cần kiểm tra manual</div>
  </div>
  <div v-click class="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
  <strong class="text-emerald-700">Bằng chứng</strong>
  <div class="text-sm text-gray-500 mt-1">Reviewer truy ngược version, test result</div>
  </div>
</div>

<!--
Hai lớp bảo vệ: Functional (Newman) + Compatibility (Pact).
-->

