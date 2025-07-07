<script lang="ts">
  import type { Connection } from '../vite-env'
  import QrScan from "./QrScan.svelte"
  import { createSignalingConnection, ICE_SERVERS } from "./services"
  import type SignalingConnection from "./services/SignalingConnection"

  let {
    onconnected
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

    peerConnection.addEventListener('datachannel', (event) => {
      dataChannel = event.channel

      dataChannel.addEventListener('open', () => {
        console.log('Data channel open')
        onconnected({ peerConnection, dataChannel })
      })
    })

    await peerConnection.setRemoteDescription(offer)
    const answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)
    signalingConnection.sendAnswer(answer)
  }

  async function onRemoteCandidate(candidate: RTCIceCandidateInit): Promise<void> {
    console.log('Remote ICE candidate received')
    await peerConnection.addIceCandidate(candidate)
  }

  function onSignalingDisconnect(): void {
    console.log('Signaling disconnected')
  }
</script>

<div class="control-binding">
  {#if isSignaling}
    <div>Signaling...</div>
  {:else}
    <QrScan onresult={onResult} />
  {/if}
</div>

<style>
  .control-binding {
    width: 100dvw;
    height: 100dvh;
  }
</style>
