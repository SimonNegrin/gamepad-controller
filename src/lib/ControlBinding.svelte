<script lang="ts">
  import { fade } from 'svelte/transition'
  import type { Connection } from "../vite-env"
  import QrScan from "./QrScan.svelte"
  import { createSignalingConnection, ICE_SERVERS } from "./services"
  import type SignalingConnection from "./services/SignalingConnection"

  let {
    onconnected,
  }: {
    onconnected: (connection: Connection) => void
  } = $props()

  let isSignaling = $state(false)
  let peerConnection: RTCPeerConnection
  let signalingConnection: SignalingConnection
  let dataChannel: RTCDataChannel

  function onResult(roomId: string): void {
    console.log("RoomID detect:", roomId)
    initSignaling(roomId)
  }

  async function initSignaling(roomId: string): Promise<void> {
    if (isSignaling) return
    isSignaling = true
    signalingConnection = await createSignalingConnection(roomId)

    signalingConnection.on("offer", onOffer)
    signalingConnection.on("candidate", onRemoteCandidate)
    signalingConnection.on("disconnect", onSignalingDisconnect)
  }

  async function onOffer(offer: RTCSessionDescriptionInit): Promise<void> {
    console.log(`Offer received`, offer)

    peerConnection = new RTCPeerConnection({
      iceServers: ICE_SERVERS,
    })

    peerConnection.addEventListener("icecandidate", (event) => {
      if (event.candidate !== null) {
        signalingConnection.sendCandidate(event.candidate)
      }
    })

    peerConnection.addEventListener("datachannel", (event) => {
      dataChannel = event.channel

      dataChannel.addEventListener("open", () => {
        console.log("Data channel open")
        onconnected({ peerConnection, dataChannel })
      })
    })

    await peerConnection.setRemoteDescription(offer)
    const answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)
    signalingConnection.sendAnswer(answer)
  }

  async function onRemoteCandidate(
    candidate: RTCIceCandidateInit
  ): Promise<void> {
    console.log("Remote ICE candidate received")
    await peerConnection.addIceCandidate(candidate)
  }

  function onSignalingDisconnect(): void {
    console.log("Signaling disconnected")
  }
</script>

<div class="control-binding">
  {#if isSignaling}
    <div class="signaling" transition:fade>
      <div>
        <div class="loader"></div>
        <div class="text">Connectando...</div>
      </div>
    </div>
  {:else}
    <QrScan onresult={onResult} />
  {/if}
</div>

<style>
  .control-binding {
    width: 100dvw;
    height: 100dvh;
  }

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
    animation: l18 1.5s infinite cubic-bezier(0.3, 1, 0, 1);
  }
  @keyframes l18 {
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
