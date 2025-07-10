<script lang="ts">
  import { fade } from 'svelte/transition'
  import type { GamepadStatus, Point, TriggerStatus } from '../vite-env'
  import Joystick from './Joystick.svelte'
  import Trigger from './Trigger.svelte'
  import Start from './Start.svelte'

  let {
    oninput
  }: {
    oninput: (status: GamepadStatus) => void
  } = $props()

  let mainEl: HTMLElement
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
  
  function onStartInput(start: TriggerStatus): void {
    gamepadStatus = {
      ...gamepadStatus,
      start
    }
    oninput(gamepadStatus)
  }

  function onToggleFullscreen(): void {
    document.fullscreenElement
      ? document.exitFullscreen()
      : mainEl.requestFullscreen()
  }
</script>
<main bind:this={mainEl}>
  {#if showPortraitWarn}
    <div class="portrait-warn" transition:fade>
      <div>Coloca el dispositivo en horizontal</div>
    </div>
  {/if}

  <div class="gamepad">
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
    <div class="ctrl btn-start">
      <Start oninput={onStartInput} />
    </div>
    <button
      type="button"
      class="ctrl btn-fullscreen"
      onclick={onToggleFullscreen}
      aria-label="Fullscreen"
    ></button>
  </div>
</main>

<svelte:window onorientationchange={onorientationchange} />

<style>
  main {
    touch-action: none;
    position: relative;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    background-color: oklch(14.5% 0 0);
  }
  .gamepad {
    position: relative;
    top: -10px;
    left: -40px;
    width: calc(100% + 60px);
    aspect-ratio: 1686 / 988;
    background-image: url('/megadrive_gamepad.png');
    background-repeat: no-repeat;
    background-size: contain;
  }
  .portrait-warn {
    position: absolute;
    z-index: 20;
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
    background-color: transparent;
    border: none;
    /* background-color: rgba(248, 255, 157, 0.405); */
  }
  .joystick-wrapper {
    left: 11%;
    top: 26%;
    width: 24.5%;
    aspect-ratio: 1;

  }
  .trigger {
    --radius: 40px;
    width: 10%;
    aspect-ratio: 1;
    overflow: hidden;
  }
  .trigger-a {
    top: 48%;
    left: 62%;
    border-top-right-radius: var(--radius);
  }
  .trigger-b {
    top: 39%;
    left: 72%;
    border-top-right-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
  }
  .trigger-c {
    top: 33%;
    left: 82%;
    border-bottom-left-radius: var(--radius);
  }
  .btn-start {
    width: 11%;
    aspect-ratio: 3;
    left: 65%;
    top: 20.5%;
    transform: rotate(-25deg);
  }
  .btn-fullscreen {
    width: 11%;
    aspect-ratio: 3;
    left: 45.75%;
    top: 23.5%;
  }
</style>
