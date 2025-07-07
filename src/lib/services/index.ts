import SignalingConnection from "./SignalingConnection"

const WS_SERVER_URL = "ws://localhost:6100"

export async function createSignalingConnection(
  roomId: string
): Promise<SignalingConnection> {
  const signalingConnection = new SignalingConnection(WS_SERVER_URL)
  await signalingConnection.connect()
  await signalingConnection.joinRoom(roomId)
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
