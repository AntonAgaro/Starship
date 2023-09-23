import GameBlock from './GameBlock'
import { GameBlockSettings } from '../types/GameBlockTypes'

export default class PlayerBullet extends GameBlock {
  constructor(settings: GameBlockSettings) {
    super(settings)
  }

  move(dt: number) {
    if (this.getDy()) {
      this.setY(this.getY() + this.getDy() * dt)
    }
  }
}
