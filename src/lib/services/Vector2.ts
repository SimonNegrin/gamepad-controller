
export default class Vector2 {

  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}

  get angleRad(): number {
    return Math.atan2(this.y, this.x)
  }

  get angleDeg(): number {
    const rad = this.angleRad
    return rad * (180 / Math.PI)
  }
  
  get angleDegAbs(): number {
    const rad = this.angleRad
    let deg = rad * (180 / Math.PI)
    if (deg < 0) {
      deg += 360
    }
    return deg
  }

  get length(): number {
    return Math.sqrt((this.x ** 2) + (this.y ** 2))
  }

}
