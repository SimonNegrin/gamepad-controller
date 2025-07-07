<script lang="ts">
  import Gamepad from './lib/Gamepad.svelte'
  import QrScan from './lib/QrScan.svelte'
  import type { GamepadStatus } from './vite-env'

  function onGamepadInput(gamepadStatus: GamepadStatus): void {
    console.log(gamepadStatus)
  }

  function onResult(roomId: string): void {
    console.log({ roomId })
  }

</script>

<!-- <Gamepad oninput={onGamepadInput} /> -->
<QrScan onresult={onResult} />
