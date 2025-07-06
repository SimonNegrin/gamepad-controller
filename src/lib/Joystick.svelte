<script lang="ts">
  import type { Point } from '../vite-env'

  let {
    oninput
  }: {
    oninput: (point: Point) => void
  } = $props()

  let captured = false
  let element: HTMLDivElement

  function ontouchstart(event: TouchEvent): void {
    if (captured) return
    captured = true
    emit(event)
  }
  
  function ontouchmove(event: TouchEvent): void {
    if (!captured) return
    emit(event)
  }
  
  function ontouchend(): void {
    captured = false
    oninput({ x: 0, y: 0 })
  }

  function emit(event: TouchEvent): void {
    const [touch] = event.touches
    const rect = element.getBoundingClientRect()
    const x = touch.clientX - (rect.left + (rect.width / 2))
    const y = (touch.clientY - (rect.top + (rect.height / 2))) * -1
    oninput({ x, y })
  }

</script>

<div
  class="joystick"
  bind:this={element}
  ontouchstart={ontouchstart}
  ontouchmove={ontouchmove}
  ontouchend={ontouchend}
  ></div>

<style>
  .joystick {
    width: 100%;
    height: 100%;
  }
</style>