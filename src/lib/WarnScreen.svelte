<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    children
  }: {
    children: Snippet
  } = $props()

</script>

<div class="warn-screen">
  <div class="stripe"></div>
  <div class="content">
    {@render children()}
  </div>
  <div class="stripe"></div>
</div>

<style>
  .warn-screen {
    position: relative;
    z-index: 100;
    width: 100%;
    height: 100%;
    background-color: #ffe100;
    display: flex;
    flex-direction: column;
  }
  
  .content {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .stripe {
    height: 30px;
    background-image: linear-gradient(125deg, #000000 25%, #ffe100 25%, #ffe100 50%, #000000 50%, #000000 75%, #ffe100 75%, #ffe100 100%);
    background-size: 48.83px 69.74px;
  }
</style>