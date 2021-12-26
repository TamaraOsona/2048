import { onMounted, onUnmounted } from 'vue'

type ArrowKeyListener = (e: KeyboardEvent) => void

export function useArrowKeys () {
  const listeners: Record<string, Array<ArrowKeyListener>> = {
    ArrowUp: [], ArrowDown: [], ArrowLeft: [], ArrowRight: []
  }

  const onArrowUp = (listener: ArrowKeyListener) => {
    listeners.ArrowUp.push(listener)
  }

  const onArrowDown = (listener: ArrowKeyListener) => {
    listeners.ArrowDown.push(listener)
  }

  const onArrowLeft = (listener: ArrowKeyListener) => {
    listeners.ArrowLeft.push(listener)
  }

  const onArrowRight = (listener: ArrowKeyListener) => {
    listeners.ArrowRight.push(listener)
  }

  onMounted(() => {
    const listener: ArrowKeyListener = (event) => {
      (listeners[event.key] ?? []).forEach(callback => callback(event))
    }

    document.addEventListener('keydown', listener)

    onUnmounted(() => {
      document.addEventListener('keydown', listener)
    })
  })

  return {
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight
  }
}
