import { GameBlockPosition, GameBlockSettings } from '../types/GameBlockTypes'

export default abstract class GameBlock {
  protected position: GameBlockPosition
  protected imgUrl: string

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

  getDx() {
    return this.position.dx
  }

  setDx(newDx: number) {
    this.position.dx = newDx
  }

  getDy() {
    return this.position.dy
  }

  setDy(newDy: number) {
    this.position.dy = newDy
  }

  getVelocity() {
    return this.position.velocity
  }

  setVelocity(newVelocity: number) {
    this.position.velocity = newVelocity
  }
}
