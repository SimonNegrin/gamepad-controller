<script lang="ts">
  import { fade } from 'svelte/transition'
  import type { GamepadStatus, Point, TriggerStatus } from '../vite-env'
  import Joystick from './Joystick.svelte'
  import Trigger from './Trigger.svelte'

  let {
    oninput
  }: {
    oninput: (status: GamepadStatus) => void
  } = $props()

  let showPortraitWarn = $state(isDeviceVertical())
  let gamepadStatus: GamepadStatus = {
    joystick: {
      x: 0,
      y: 0
    },
    triggerA: {
      isPressed: false
    },
    triggerB: {
      isPressed: false
    },
    triggerC: {
      isPressed: false
    },
    start: {
      isPressed: false
    }
  }

  function onorientationchange(): void {
    showPortraitWarn = isDeviceVertical()
  }

  function isDeviceVertical(): boolean {
    return screen.orientation.type.startsWith('portrait')
  }

  function onJoystickInput(joystick: Point): void {
    gamepadStatus = {
      ...gamepadStatus,
      joystick
    }
    oninput(gamepadStatus)
  }

  function onTriggerAInput(triggerA: TriggerStatus): void {
    gamepadStatus = {
      ...gamepadStatus,
      triggerA
    }
    oninput(gamepadStatus)
  }

  function onTriggerBInput(triggerB: TriggerStatus): void {
    gamepadStatus = {
      ...gamepadStatus,
      triggerB
    }
    oninput(gamepadStatus)
  }

  function onTriggerCInput(triggerC: TriggerStatus): void {
    gamepadStatus = {
      ...gamepadStatus,
      triggerC
    }
    oninput(gamepadStatus)
  }

</script>
<main>
  {#if showPortraitWarn}
    <div class="portrait-warn" transition:fade>
      <div>Coloca el dispositivo en horizontal</div>
    </div>
  {/if}

  <div class="ctrl joystick-wrapper">
    <Joystick oninput={onJoystickInput} />
  </div>
  <div class="ctrl trigger trigger-a">
    <Trigger oninput={onTriggerAInput} />
  </div>
  <div class="ctrl trigger trigger-b">
    <Trigger oninput={onTriggerBInput} />
  </div>
  <div class="ctrl trigger trigger-c">
    <Trigger oninput={onTriggerCInput} />
  </div>
  <div class="ctrl btn-start"></div>
</main>

<svelte:window onorientationchange={onorientationchange} />

<style>
  main {
    touch-action: none;
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: rgb(20, 20, 20);
    background-image: url('/megadrive_gamepad.png');
    background-size: calc(100% + 40px) auto;
    background-position: -20px center;
    background-repeat: no-repeat;
  }
  .portrait-warn {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: red;
    color: #fff;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    text-align: center;
  }
  .ctrl {
    position: absolute;
    /* background-color: rgba(248, 255, 157, 0.405); */
  }
  .joystick-wrapper {
    left: 5%;
    width: 33%;
    top: 17%;
    aspect-ratio: 1;

  }
  .trigger {
    width: 10%;
    aspect-ratio: 1;
  }
  .trigger-a {
    top: 49%;
    left: 63%;
  }
  .trigger-b {
    top: 39%;
    left: 74%;
  }
  .trigger-c {
    top: 31%;
    left: 85%;
  }
  .btn-start {
    width: 12%;
    aspect-ratio: 3;
    left: 66%;
    top: 17%;
    transform: rotate(-25deg);
  }
</style>
