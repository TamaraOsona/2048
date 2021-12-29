<template>
  <div class="relative w-16 h-8">
    <div class="absolute w-16 flex items-center justify-center text-gray-800 text-xl font-semibold">
      {{ score }}
    </div>

    <div class="absolute w-16 flex items-center justify-center">
      <TransitionGroup
        enter-from-class="translate-y-0"
        enter-active-class="absolute transition transform duration-1000"
        enter-to-class="-translate-y-8 opacity-0"
        leave-active-class="opacity-0"
        @afterEnter="newScoreValues.shift()"
      >
        <div
          v-for="newScoreValue in newScoreValues"
          :key="newScoreValue.id"
          class="text-rose-800 text-sm font-bold"
        >
          +{{ newScoreValue.value }}
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  score: number
}>()

let counter = 0
const newScoreValues = ref([])

watch(() => props.score, (newValue, oldValue) => {
  if (newValue === 0) {
    return
  }

  newScoreValues.value.push({
    id: ++counter,
    value: newValue - oldValue
  })
})

</script>
