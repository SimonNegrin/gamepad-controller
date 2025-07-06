<script lang="ts">
  import Gamepad from './lib/Gamepad.svelte'
  import type { GamepadStatus } from './vite-env'

  function onGamepadInput(gamepadStatus: GamepadStatus): void {
    console.log(gamepadStatus)
  }

</script>

<Gamepad oninput={onGamepadInput} />
