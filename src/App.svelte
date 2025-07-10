<script lang="ts">
  import ControlBinding from "./lib/ControlBinding.svelte"
  import Gamepad from "./lib/Gamepad.svelte"
  import Vector2 from "./lib/services/Vector2"
  import type { Connection, GamepadStatus } from "./vite-env"

  const JOYSTICK_THRESHOLD = 32

  let connection: Connection

  function onGamepadInput(gamepadStatus: GamepadStatus): void {
    const packet = createGamepadUpdatePacket(gamepadStatus)
    connection.dataChannel.send(packet.buffer)
  }

  function onConnected(conn: Connection): void {
    connection = conn
  }

  function createGamepadUpdatePacket(gamepadStatus: GamepadStatus): Uint8Array {
    const packet = new Uint8Array(2)

    // Byte 1: Tipo de paquete (1 = gamepad update)
    packet[0] = 1 // 00000001 en binario

    // Byte 2: Estado de los botones (cada bit es un botón)
    let buttonsByte = 0

    const angle = new Vector2(
      gamepadStatus.joystick.x,
      gamepadStatus.joystick.y
    )

    // Only active direction bits if the vector length
    // is greater than the preset threshold
    if (angle.length > JOYSTICK_THRESHOLD) {
      const deg = angle.angleDegAbs
      // Top
      if (deg >= 45 && deg < 135) buttonsByte |= 1 << 7
      // Right
      if (deg < 45 || deg >= 315) buttonsByte |= 1 << 6
      // Bottom
      if (deg >= 225 && deg < 315) buttonsByte |= 1 << 5
      // Left
      if (deg >= 135 && deg < 225) buttonsByte |= 1 << 4
    }

    // Triggers
    if (gamepadStatus.triggerA.isPressed) buttonsByte |= 1 << 3
    if (gamepadStatus.triggerB.isPressed) buttonsByte |= 1 << 2
    if (gamepadStatus.triggerC.isPressed) buttonsByte |= 1 << 1

    // Start btn
    if (gamepadStatus.start.isPressed) buttonsByte |= 1

    packet[1] = buttonsByte
    return packet
  }
</script>

{#if connection}
  <Gamepad oninput={onGamepadInput} />
{:else}
  <ControlBinding onconnected={onConnected} />
{/if}
