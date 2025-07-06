/// <reference types="svelte" />
/// <reference types="vite/client" />

export type Point = {
  x: number
  y: number
}

export type TriggerStatus = {
  isPressed: boolean
}

export type GamepadStatus = {
  joystick: Point
  triggerA: TriggerStatus
  triggerB: TriggerStatus
  triggerC: TriggerStatus
  start: TriggerStatus
}
