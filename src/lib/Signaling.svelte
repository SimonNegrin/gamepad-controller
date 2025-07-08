<script lang="ts">
  import { fade } from "svelte/transition"
</script>

<div class="signaling" transition:fade>
  <div>
    <div class="loader"></div>
    <div class="text">Connectando...</div>
  </div>
</div>

<style>
  .signaling {
    width: 100%;
    height: 100%;
    background-color: oklch(20.5% 0 0);
    color: oklch(51.4% 0.222 16.935);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text {
    margin-top: 2rem;
  }

  .loader {
    margin: auto;
    width: 40px;
    aspect-ratio: 1;
    position: relative;
    background: radial-gradient(10px, currentColor 94%, #0000);
  }
  .loader:before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background:
      radial-gradient(9px at bottom right, #0000 94%, currentColor) top left,
      radial-gradient(9px at bottom left, #0000 94%, currentColor) top right,
      radial-gradient(9px at top right, #0000 94%, currentColor) bottom left,
      radial-gradient(9px at top left, #0000 94%, currentColor) bottom right;
    background-size: 20px 20px;
    background-repeat: no-repeat;
    animation: signaling 1.5s infinite cubic-bezier(0.3, 1, 0, 1);
  }
  @keyframes signaling {
    33% {
      inset: -10px;
      transform: rotate(0deg);
    }
    66% {
      inset: -10px;
      transform: rotate(90deg);
    }
    100% {
      inset: 0;
      transform: rotate(90deg);
    }
  }
</style>
