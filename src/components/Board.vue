<template>
  <div>
    <div class="relative w-96 h-96">
      <div class="absolute top-0 left-0 grid grid-cols-4 h-96 w-96 border-l border-b">
        <div
          v-for="(cell, index) in columns * rows"
          :key="index"
          class="text-2xl border-r border-t p-0.5 col-span-1"
        />
      </div>

      <div class="absolute top-0 left-0 h-96 w-96">
        <template v-for="tile in tiles">
          <div
            v-if="tile"
            :key="tile.id"
            class="absolute top-0 left-0 p-0.5 w-24 h-24 transition duration-100"
            :style="`transform: translateX(calc(${tile.cellIndex % 4} * 6rem)) translateY(calc(${Math.floor(tile.cellIndex / 4)} * 6rem))`"
          >
            <Tile :score="tile.score" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tile from './Tile.vue'
import { Tile as TileType } from '../composables/useGame'

defineProps<{
  columns: number,
  rows: number,
  tiles: TileType[]
}>()
</script>
