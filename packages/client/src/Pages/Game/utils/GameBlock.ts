type GameBlockPosition = {
  x: number
  y: number
  width: number
  height: number
}

export interface GameBlockSettings {
  startPosition: GameBlockPosition
  imgUrl: string
}
export default abstract class GameBlock {
  private position: GameBlockPosition
  private imgUrl: string

  constructor(settings: GameBlockSettings) {
    this.position = settings.startPosition
    this.imgUrl = settings.imgUrl
  }

  getX() {
    return this.position.x
  }

  getY() {
    return this.position.y
  }

  getWidth() {
    return this.position.width
  }

  getHeight() {
    return this.position.height
  }

  getImg() {
    return this.imgUrl
  }

  setX(newX: number) {
    this.position.x = newX
  }

  setY(newY: number) {
    this.position.y = newY
  }
}
