<script lang="ts">
  import { onMount } from "svelte"
  import QrScanner from "qr-scanner"

  let {
    onresult,
  }: {
    onresult: (roomId: string) => void
  } = $props()

  const UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  let videoElement: HTMLVideoElement
  let qrScanner: QrScanner

  onMount(() => {
    qrScanner = new QrScanner(
      videoElement,
      async ({ data }) => {
        const url = new URL(data)
        const roomId = url.searchParams.get("r")
        if (!roomId || !UUID_REGEX.test(roomId)) {
          // TODO: Warn invalid QR data
          return
        }
        onresult(roomId)
      },
      {
        highlightScanRegion: true,
      }
    )

    qrScanner.start()

    return () => {
      qrScanner.stop()
      qrScanner.destroy()
    }
  })
</script>

<!-- svelte-ignore a11y_media_has_caption -->
<video bind:this={videoElement}></video>

<style>
  video {
    width: 100%;
    height: 100%;
  }
</style>
