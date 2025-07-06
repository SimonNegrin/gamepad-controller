<script lang="ts">
  import type { Point } from '../vite-env'
  import Joystick from './Joystick.svelte'

  function onJoystickInput(point: Point): void {
    console.log(point)
  }

</script>
<main>
  <div class="ctrl joystick-wrapper">
    <Joystick oninput={onJoystickInput} />
  </div>
  <div class="ctrl btn btn-a"></div>
  <div class="ctrl btn btn-b"></div>
  <div class="ctrl btn btn-c"></div>
  <div class="ctrl btn-start"></div>
</main>

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
  .ctrl {
    position: absolute;
    background-color: rgba(248, 255, 157, 0.405);
  }
  .joystick-wrapper {
    left: 5%;
    width: 33%;
    top: 17%;
    aspect-ratio: 1;

  }
  .btn {
    width: 10%;
    aspect-ratio: 1;
  }
  .btn-a {
    top: 49%;
    left: 63%;
  }
  .btn-b {
    top: 39%;
    left: 74%;
  }
  .btn-c {
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
