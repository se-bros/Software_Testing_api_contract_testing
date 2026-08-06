<template>
  <div v-if="$slidev.nav.currentPage !== 1" class="absolute top-4 right-4 text-xs text-gray-400 font-mono z-50">
    {{ $slidev.nav.currentPage }}
  </div>
</template>
