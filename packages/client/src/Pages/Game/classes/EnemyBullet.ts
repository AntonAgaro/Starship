import { GameBlockSettings } from '../types/GameBlockTypes'
import GameBlock from './GameBlock'

export default class EnemyBullet extends GameBlock {
  constructor(settings: GameBlockSettings) {
    super(settings)
  }

  move(dt: number) {
    if (this.getDy()) {
      this.setY(this.getY() + this.getDy() * dt)
      this.setX(this.getX() + this.getDx() * dt)
    }
  }
}
