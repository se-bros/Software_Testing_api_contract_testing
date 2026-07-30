---
layout: section
---

# PHẦN C — CONTRACT TESTING

<div class="text-lg text-gray-400 mt-4">Vấn đề · Giải pháp · Pact Framework</div>

---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">06 · The Problem</div>

# Khi mỗi service đều **"xanh"**... hệ thống vẫn có thể **"đỏ"**

<div class="grid grid-cols-3 gap-4 mt-8">
  <div v-click class="p-4 bg-red-50 border border-red-200 rounded-xl">
  <div class="text-2xl font-bold text-red-500 mb-2">Consumer<sup>1</sup></div>
  <div class="text-sm text-gray-600">Kỳ vọng field <code>product.name</code>, nhưng Provider đổi thành <code>displayName</code></div>
  </div>
  <div v-click class="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
  <div class="text-2xl font-bold text-yellow-600 mb-2">Provider<sup>2</sup></div>
  <div class="text-sm text-gray-600">Unit test vẫn pass — logic và schema mới đều đúng theo góc nhìn backend</div>
  </div>
  <div v-click class="p-4 bg-red-50 border border-red-200 rounded-xl">
  <div class="text-2xl font-bold text-red-500 mb-2">Runtime</div>
  <div class="text-sm text-gray-600">Lỗi chỉ lộ khi tích hợp — trên staging hoặc production</div>
  </div>
</div>

<div v-click class="mt-8 p-4 bg-cyan-50 border border-cyan-200 rounded-lg text-center">
  <div class="text-lg text-cyan-700 font-bold">"Hai phía có còn hiểu cùng một giao thức hay không?"</div>
  <div class="text-sm text-gray-500 mt-2">Unit test kiểm tra logic nội bộ — không kiểm chứng giả định xuyên biên giới</div>
</div>

<div class="footnotes">
<div class="fn-item"><sup>1</sup><strong>Consumer</strong> — Bên gọi API (vd: FrontendWebsite).</div>
<div class="fn-item"><sup>2</sup><strong>Provider</strong> — Bên cung cấp API (vd: ProductService).</div>
</div>

<!--
Motivation slide: unit test không đủ.
-->

---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">06 · Definition</div>

# Contract Testing là gì?

<div class="grid grid-cols-5 gap-8 mt-6 items-start">
  <div class="col-span-3">
  <div class="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg text-lg italic text-gray-700">
      Contract<sup>1</sup> là đặc tả <strong>có thể thực thi</strong> về những request Consumer gửi và response Provider cam kết đáp ứng.
  </div>

  <v-clicks>

  - **Request:** method, path, query, headers, body
  - **Response:** status, headers, schema và matching rules
  - **Context:** provider state<sup>2</sup> — điều kiện trước của interaction<sup>3</sup>

  </v-clicks>
  </div>

  <div class="col-span-2 p-4 bg-gray-50 border border-gray-200 rounded-lg">
  <div class="text-xs font-mono text-cyan-600 mb-3 font-bold">INTERACTION</div>
  <div class="text-sm leading-6">
      <span class="text-gray-400">Given</span> product 10 exists<br>
      <span class="text-gray-400">When</span> GET /product/10<br>
      <span class="text-gray-400">Then</span> 200 + Product schema
  </div>
  </div>
</div>

<div v-click class="mt-6 text-sm text-gray-500">
  Contract Testing xác minh <strong class="text-cyan-700">tính tương thích</strong> — không chứng minh toàn bộ nghiệp vụ đúng.
</div>

<div class="footnotes">
<div class="fn-item"><sup>1</sup><strong>Contract</strong> — Bản cam kết bằng máy về cách hai bên giao tiếp.</div>
<div class="fn-item"><sup>2</sup><strong>Provider state</strong> — Điều kiện dữ liệu cần có trước khi chạy interaction (vd: "product 10 exists").</div>
<div class="fn-item"><sup>3</sup><strong>Interaction</strong> — Một cặp request–response cụ thể trong contract.</div>
</div>

<!--
Contract = đặc tả có thể thực thi.
-->

---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">06 · Comparison</div>

# So sánh các lớp kiểm thử

<div class="mt-4">
  <table class="w-full text-sm">
  <thead>
      <tr class="border-b-2 border-cyan-200">
        <th class="text-left py-2 text-cyan-700">Tiêu chí</th>
        <th class="text-left py-2 text-cyan-700">API Testing</th>
        <th class="text-left py-2 text-cyan-700">Contract Testing</th>
        <th class="text-left py-2 text-cyan-700">Integration<sup>1</sup></th>
        <th class="text-left py-2 text-cyan-700">E2E<sup>2</sup></th>
      </tr>
  </thead>
  <tbody>
      <tr v-click class="border-b border-gray-100"><td class="py-2 font-bold">Câu hỏi</td><td>Endpoint đúng?</td><td class="text-cyan-700 font-bold">Còn tương thích?</td><td>Phối hợp đúng?</td><td>Journey chạy?</td></tr>
      <tr v-click class="border-b border-gray-100"><td class="py-2 font-bold">Phạm vi</td><td>1+ endpoint</td><td>1 cặp C–P</td><td>Nhóm thành phần</td><td>Toàn hệ thống</td></tr>
      <tr v-click class="border-b border-gray-100"><td class="py-2 font-bold">Môi trường</td><td>API thật/mock</td><td>Cô lập, local/CI</td><td>Bán tích hợp</td><td>Gần production</td></tr>
      <tr v-click class="border-b border-gray-100"><td class="py-2 font-bold">Feedback</td><td>Nhanh–TB</td><td class="text-cyan-700 font-bold">Nhanh, rõ</td><td>Trung bình</td><td>Chậm</td></tr>
      <tr v-click class="border-b border-gray-100"><td class="py-2 font-bold">Điểm mạnh</td><td>Chức năng, auth</td><td>Chống breaking change</td><td>Wiring</td><td>User journey</td></tr>
      <tr v-click><td class="py-2 font-bold">Điểm mù</td><td>Phụ thuộc consumer</td><td>Business logic</td><td>Ngoài scope</td><td>Flaky, đắt</td></tr>
  </tbody>
  </table>
</div>

<div v-click class="mt-4 p-3 bg-cyan-50 border border-cyan-200 rounded-lg text-sm">
  Contract Test <strong>bổ sung</strong> Unit / Integration / E2E — không thay thế tất cả.
</div>

<div class="footnotes">
<div class="fn-item"><sup>1</sup><strong>Integration</strong> — Kiểm thử nhiều thành phần phối hợp với nhau.</div>
<div class="fn-item"><sup>2</sup><strong>E2E</strong> — Kiểm thử toàn bộ hành trình người dùng qua nhiều service.</div>
</div>

<!--
Dùng đúng lớp test cho đúng loại rủi ro.
-->

---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">07 · Architecture</div>

# Mô hình Consumer–Provider

```mermaid {scale: 0.75}
flowchart LR
  C["Consumer\nFrontendWebsite"]
  API["Provider API\nProductService"]
  DB[(Provider data)]

  C -->|"HTTP request"| API
  API -->|"HTTP response"| C
  API --> DB
```

<div class="grid grid-cols-2 gap-6 mt-4">
  <div v-click class="p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
  <strong class="text-cyan-700">Consumer (FrontendWebsite)</strong>
  <div class="text-sm text-gray-600 mt-1">Mô tả chính xác phần API nó sử dụng → sinh Pact file (JSON)</div>
  </div>
  <div v-click class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
  <strong class="text-blue-700">Provider (ProductService)</strong>
  <div class="text-sm text-gray-600 mt-1">Chứng minh implementation đáp ứng mọi interaction → chạy verification</div>
  </div>
</div>

<div v-click class="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-sm">
  <strong class="text-indigo-700">Pact Broker:<sup>1</sup></strong> Lưu contract + version + kết quả verification → Compatibility matrix<sup>2</sup> → <code>can-i-deploy</code> gate
</div>

<div class="footnotes">
<div class="fn-item"><sup>1</sup><strong>Pact Broker</strong> — Kho trung tâm lưu contract + kết quả verification.</div>
<div class="fn-item"><sup>2</sup><strong>Compatibility matrix</strong> — Bảng tra cứu phiên bản Consumer nào tương thích phiên bản Provider nào.</div>
</div>

<!--
Consumer-driven ≠ Consumer áp đặt.
-->

---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">07 · Why Consumer-Driven?</div>

# Consumer-Driven: Vì sao?

<div class="grid grid-cols-2 gap-6 mt-8">
  <div v-click class="p-5 bg-red-50 border border-red-200 rounded-xl">
  <h3 class="text-lg font-bold text-red-600 mb-2">Provider-Driven</h3>
  <div class="text-sm text-gray-600">
      Provider công bố toàn bộ schema. Consumer phải thích nghi.<br>
      <strong class="text-red-500">Vấn đề:</strong> Provider khó biết phần nào đang được sử dụng.
  </div>
  </div>
  <div v-click class="p-5 bg-green-50 border border-green-200 rounded-xl">
  <h3 class="text-lg font-bold text-green-600 mb-2">Consumer-Driven</h3>
  <div class="text-sm text-gray-600">
      Mỗi Consumer phát hành interaction mình phụ thuộc. Provider xác minh tập hợp nhu cầu thực tế.<br>
      <strong class="text-green-600">Lợi ích:</strong> Provider biết field nào đang dùng → tránh xóa/sửa nhầm.
  </div>
  </div>
</div>

<div class="mt-8 flex items-center justify-center gap-6">
  <div v-click class="flex items-center gap-2">
  <span class="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
  <span class="text-sm">Consumer nêu nhu cầu</span>
  </div>
  <div class="text-gray-300">→</div>
  <div v-click class="flex items-center gap-2">
  <span class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
  <span class="text-sm">Provider xác minh</span>
  </div>
  <div class="text-gray-300">→</div>
  <div v-click class="flex items-center gap-2">
  <span class="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
  <span class="text-sm">Hai đội cùng tiến hóa</span>
  </div>
</div>

<!--
Công cụ hỗ trợ cuộc hội thoại — không thay thế thiết kế API.
-->

---

<div class="text-sm font-mono tracking-widest text-cyan-600 uppercase mb-4">07 · Limitations</div>

# Giới hạn của Contract Testing

<div class="grid grid-cols-2 gap-5 mt-6">
  <div v-click class="p-4 bg-red-50 border border-red-200 rounded-xl">
  <h3 class="font-bold text-red-600">Business logic nội bộ</h3>
  <div class="text-sm text-gray-600 mt-1">Response đúng schema nhưng tính sai tổng tiền vẫn pass</div>
  </div>
  <div v-click class="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
  <h3 class="font-bold text-yellow-600">Hạ tầng production</h3>
  <div class="text-sm text-gray-600 mt-1">DNS, TLS, gateway, timeout cần lớp test/monitor khác</div>
  </div>
  <div v-click class="p-4 bg-orange-50 border border-orange-200 rounded-xl">
  <h3 class="font-bold text-orange-600">Hành trình nhiều service</h3>
  <div class="text-sm text-gray-600 mt-1">Một pact chỉ chứng minh một ranh giới</div>
  </div>
  <div v-click class="p-4 bg-purple-50 border border-purple-200 rounded-xl">
  <h3 class="font-bold text-purple-600">Chất lượng API design</h3>
  <div class="text-sm text-gray-600 mt-1">Tương thích ≠ dễ dùng, nhất quán, an toàn</div>
  </div>
</div>

<div v-click class="mt-6 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-center">
  <strong>Unit</strong> → logic · <strong class="text-cyan-700">Contract</strong> → compatibility · <strong>Integration</strong> → wiring · <strong>E2E</strong> → critical journeys
</div>

<!--
Contract test là một lớp bảo vệ có scope rõ ràng.
-->

