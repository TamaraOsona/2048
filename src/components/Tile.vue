<template>
  <div
    :class="{
      'tile text-gray-800 text-2xl w-full h-full flex items-center justify-center': true,
      'bg-rose-100': score === 2,
      'bg-rose-300': score === 4,
      'bg-rose-400': score === 8,
      'bg-rose-500 text-gray-100': score === 16,
      'bg-rose-600 text-gray-100': score === 32,
      'bg-rose-700 text-gray-100': score === 64,
      'bg-rose-800 text-gray-100': score === 128,
      'bg-rose-900 text-gray-100': score === 256,
      'bg-stone-700 text-gray-100': score === 528,
      'bg-stone-900 text-gray-100': score === 1024,
    }"
  >
    {{ score }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  score: number,
  isNew: boolean
}>()
</script>
