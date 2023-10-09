import { GameBlockSettings, Shooter } from '../types/GameBlockTypes'
import GameBlock from './GameBlock'

export default class Enemy extends GameBlock implements Shooter {
  shotDamage = 0

  constructor(settings: GameBlockSettings & Pick<Shooter, 'shotDamage'>) {
    super(settings)

    this.shotDamage = settings.shotDamage
  }

  takeDamage(damage: number) {
    if (this.hitPoints) this.hitPoints = this.hitPoints - damage
  }

  setShotDamage(damage: number) {
    this.shotDamage = damage
  }

  getShotDamage() {
    return this.shotDamage
  }

  move(dt: number) {
    if (this.getDy()) {
      this.setY(this.getY() + this.getDy() * dt)
    }
  }
}
