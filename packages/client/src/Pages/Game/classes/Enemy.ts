import GameBlock from './GameBlock'
import { GameBlockSettings } from '../types/GameBlockTypes'

export default class Enemy extends GameBlock {
  private direction = Math.random() < 0.5 ? -1 : 1 // Направление движения: -1 для движения влево, 1 для движения вправо
  private moveSpeed = 100 // Скорость движения

  constructor(settings: GameBlockSettings) {
    super(settings)
  }

  move(dt: number) {
    if (this.getDy()) {
      this.setY(this.getY() + this.getDy() * dt)
    }

    // Вычисляем расстояние, на которое нужно переместиться
    const distance = this.moveSpeed * dt * this.direction

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
