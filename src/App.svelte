<script lang="ts">
  import ControlBinding from './lib/ControlBinding.svelte'
  import Gamepad from './lib/Gamepad.svelte'
  import type { Connection, GamepadStatus } from './vite-env'

  let connection: Connection

  function onGamepadInput(gamepadStatus: GamepadStatus): void {
    console.log(gamepadStatus)
  }

  function onConnected(conn: Connection): void {
    connection = conn
  }
</script>

{#if connection}
  <Gamepad oninput={onGamepadInput} />
{:else}
  <ControlBinding onconnected={onConnected} />
{/if}
