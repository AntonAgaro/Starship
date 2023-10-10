import { GameBlockSettings, Shooter } from '../types/GameBlockTypes'
import GameBlock from './GameBlock'

export default class Enemy extends GameBlock implements Shooter {
  private direction = this.getDx() // Направление движения
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

    // Вычисляем расстояние, на которое нужно переместиться
    const distance = this.getVelocity() * dt * this.direction

    // Вычисляем новую позицию после перемещения
    const newX = this.getX() + distance

    // Если сталкивается со стеной, меняем направление
    if (newX < 1 || newX > 899) {
      this.direction = -this.direction
    }

    // Проверяем, чтобы позиция оставалась в пределах игрового окна от 0 до 9000
    if (newX >= 0 && newX <= 900) {
      this.setX(newX)
    }
  }
}
