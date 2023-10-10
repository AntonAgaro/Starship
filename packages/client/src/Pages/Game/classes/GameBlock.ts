import {
  DEFAULT_COLLISION_DAMAGE_VALUE,
  DEFAULT_HIT_POINTS_VALUE,
} from '../constants/Constants'
import { GameBlockPosition, GameBlockSettings } from '../types/GameBlockTypes'

export default abstract class GameBlock {
  protected position: GameBlockPosition
  protected imgUrl: string
  protected hitPoints: number | null
  protected collisionDamage: number | null
  protected scoreForDestoying: number

  constructor({
    startPosition,
    imgUrl,
    hitPoints,
    collisionDamage,
    scoreForDestoying,
  }: GameBlockSettings) {
    this.position = startPosition
    this.imgUrl = imgUrl
    this.hitPoints = hitPoints ?? DEFAULT_HIT_POINTS_VALUE
    this.collisionDamage = collisionDamage ?? DEFAULT_COLLISION_DAMAGE_VALUE
    this.scoreForDestoying = scoreForDestoying ?? 0
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

  getHitPoints() {
    return this.hitPoints
  }

  setHitPoints(hitPoints: number) {
    this.hitPoints = hitPoints
  }

  getCollisionDamage() {
    return this.collisionDamage
  }

  setCollisionDamage(collisionDamage: number) {
    this.collisionDamage = collisionDamage
  }

  getScoreForDestroying() {
    return this.scoreForDestoying
  }
}
