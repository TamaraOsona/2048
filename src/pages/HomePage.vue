<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center">
    <div class="w-96 flex items-center justify-end mb-4">
      <div class="text-gray-800">
        <GameScore :score="gameScore" />
      </div>
      <button
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold ml-4 py-2 px-4 border border-gray-400 rounded shadow"
        @click="start"
      >
        Restart
      </button>
    </div>

    <Board
      :tiles="tiles"
      :columns="columns"
      :rows="rows"
    />
  </div>
</template>

<script setup lang="ts">
import Board from '../components/Board.vue'
import GameScore from '../components/GameScore.vue'
import { onMounted } from 'vue'
import { useGame } from '../composables/useGame'

const {
  columns,
  rows,
  tiles,
  start,
  gameScore
} = useGame()

onMounted(() => {
  start()
})
</script>
