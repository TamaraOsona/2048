import { computed, reactive, ref, toRefs } from 'vue'
import { difference, isEqual } from 'lodash-es'
import { useArrowKeys } from './useArrowKeys'

export const DIRECTION_UP = 'UP'
export const DIRECTION_DOWN = 'DOWN'
export const DIRECTION_LEFT = 'LEFT'
export const DIRECTION_RIGHT = 'RIGHT'

export type Tile = {
  id: number,
  score: number,
  isNew: boolean,
  cellIndex: number,
  willMerge: boolean,
  willRemove: boolean
}

export type Direction = typeof DIRECTION_UP
  | typeof DIRECTION_DOWN
  | typeof DIRECTION_LEFT
  | typeof DIRECTION_RIGHT

export function useGame (options = {
  columns: 4,
  rows: 4
}) {
  const {
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight
  } = useArrowKeys()

  let tilesCounter = 0
  const gameScore = ref(0)
  const { columns, rows } = toRefs(reactive(options))
  const cells = computed(() => columns.value * rows.value)
  const tiles = ref<Tile[]>([])

  function generateRandomTile () {
    const emptyCellIndexes = difference(
      [...new Array(cells.value)].map((_, i) => i),
      tiles.value.map(tile => tile.cellIndex)
    )

    const randomEmptyCellIndex = Math.round(Math.random() * (emptyCellIndexes.length - 1))
    const selectedCellIndex = emptyCellIndexes[randomEmptyCellIndex]

    tiles.value.push({
      id: ++tilesCounter,
      score: Math.random() > 0.9 ? 4 : 2,
      cellIndex: selectedCellIndex,
      isNew: true,
      willMerge: false,
      willRemove: false
    })
  }

  function nextTick (direction: Direction) {
    const simulatedNextTiles = simulateNextTiles(direction)
    const allTilesAreFilled = tiles.value.length === cells.value

    if (!isEqual(tiles.value, simulatedNextTiles)) {
      tiles.value = simulatedNextTiles

      setTimeout(() => {
        generateRandomTile()
        updateTiles()
      }, 100)
    } else if (allTilesAreFilled) {
      const movementsLeft = ([DIRECTION_UP, DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT] as Direction[])
        .filter(otherDirection => otherDirection !== direction)
        .some(otherDirection => !isEqual(tiles.value, simulateNextTiles(otherDirection)))

      if (!movementsLeft) {
        console.log('END!!')
      }
    }
  }

  function simulateNextTiles (direction: Direction) {
    const simulation = JSON.parse(JSON.stringify(tiles.value)) as Tile[]

    movementOrderedTileIndexes(direction).forEach((index) => {
      moveTile(simulation, direction, index)
    })

    return simulation
  }

  function movementOrderedTileIndexes (direction: Direction) {
    return ({
      [DIRECTION_UP]: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      [DIRECTION_DOWN]: [12, 13, 14, 15, 8, 9, 10, 11, 4, 5, 6, 7, 0, 1, 2, 3],
      [DIRECTION_LEFT]: [0, 4, 8, 12, 1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15],
      [DIRECTION_RIGHT]: [3, 7, 11, 15, 2, 6, 10, 14, 1, 5, 9, 13, 0, 4, 8, 12]
    })[direction]
  }

  function movementStep (direction: Direction) {
    return ({
      [DIRECTION_UP]: -4,
      [DIRECTION_DOWN]: 4,
      [DIRECTION_LEFT]: -1,
      [DIRECTION_RIGHT]: 1
    })[direction]
  }

  function tileBounds (direction: Direction, tileIndex: number) {
    if ([DIRECTION_LEFT, DIRECTION_RIGHT].includes(direction)) {
      return [tileIndex - (tileIndex % 4), tileIndex - (tileIndex % 4) + 3]
    }

    return [tileIndex % 4, tileIndex % 4 + 12]
  }

  function moveTile (simulatedTiles: Tile[], direction: Direction, index: number) {
    const tile = simulatedTiles.find(tile => tile.cellIndex === index)

    if (!tile) {
      return
    }

    const step = movementStep(direction)
    const [leftBound, rightBound] = tileBounds(direction, index)
    const nextIndex = index + step

    if ([DIRECTION_RIGHT, DIRECTION_DOWN].includes(direction)) {
      if (nextIndex > rightBound) {
        return
      }
    } else {
      if (nextIndex < leftBound) {
        return
      }
    }

    const nextTile = simulatedTiles.find(tile => tile.cellIndex === nextIndex)

    if (!nextTile) {
      tile.cellIndex = nextIndex
    } else if (tile.score === nextTile.score && nextTile.willMerge === false) {
      tile.cellIndex = nextIndex
      tile.willMerge = true
      tile.willRemove = true

      nextTile.willMerge = true
    }

    moveTile(simulatedTiles, direction, nextIndex)
  }

  function updateTiles () {
    tiles.value = tiles.value.filter(tile => tile.willRemove === false)

    gameScore.value += tiles.value.reduce((total, tile) =>
      total + (tile.willMerge ? tile.score * 2 : 0)
    , 0)

    tiles.value = tiles.value.map(tile => ({
      ...tile,
      score: tile.willMerge ? tile.score * 2 : tile.score,
      willMerge: false,
      isNew: false
    }))
  }

  function start () {
    tiles.value = []
    gameScore.value = 0
    generateRandomTile()
    generateRandomTile()
  }

  onArrowUp(() => nextTick(DIRECTION_UP))
  onArrowDown(() => nextTick(DIRECTION_DOWN))
  onArrowLeft(() => nextTick(DIRECTION_LEFT))
  onArrowRight(() => nextTick(DIRECTION_RIGHT))

  return {
    columns,
    rows,
    tiles,
    start,
    gameScore
  }
}
