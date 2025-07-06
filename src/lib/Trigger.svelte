<script lang="ts">
  import type { TriggerStatus } from '../vite-env'

  let {
    oninput
  }: {
    oninput: (status: TriggerStatus) => void
  } = $props()

  function ontouchstart(): void {
    oninput({ isPressed: true })
  }

  function ontouchend(): void {
    oninput({ isPressed: false })
  }

</script>

<div
  class="trigger"
  ontouchstart={ontouchstart}
  ontouchend={ontouchend}></div>

<style>
  .trigger {
    width: 100%;
    height: 100%;
  }
</style>