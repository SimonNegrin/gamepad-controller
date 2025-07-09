import SignalingConnection from "./SignalingConnection"

export async function createSignalingConnection(
  roomId: string
): Promise<SignalingConnection> {
  const signalingConnection = new SignalingConnection(import.meta.env.VITE_SIGNALING_SERVER)
  await signalingConnection.connect()
  signalingConnection.joinRoom(roomId)
  return signalingConnection
}

export const ICE_SERVERS: RTCIceServer[] = [
  {
    urls: "stun:stun.relay.metered.ca:80",
  },
  {
    urls: "turn:global.relay.metered.ca:80",
    username: "a0240ef79f4aab6adcbcd492",
    credential: "sivvkdvgYch7X1z4",
  },
  {
    urls: "turn:global.relay.metered.ca:80?transport=tcp",
    username: "a0240ef79f4aab6adcbcd492",
    credential: "sivvkdvgYch7X1z4",
  },
  {
    urls: "turn:global.relay.metered.ca:443",
    username: "a0240ef79f4aab6adcbcd492",
    credential: "sivvkdvgYch7X1z4",
  },
  {
    urls: "turns:global.relay.metered.ca:443?transport=tcp",
    username: "a0240ef79f4aab6adcbcd492",
    credential: "sivvkdvgYch7X1z4",
  },
]
