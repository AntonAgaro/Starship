import { GameEventsEnum } from '../enums/GameEventsEnum'
import { GameBlockSettings } from '../types/GameBlockTypes'
import GameBlock from './GameBlock'

export default class Player extends GameBlock {
  constructor(settings: GameBlockSettings) {
    super(settings)

    window.addEventListener('keydown', e => {
      if (e.code === 'Space') {
        document.dispatchEvent(new CustomEvent(GameEventsEnum.AddPlayerBullets))
      } else if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
        this.changeMoveDirection(e.code)
      }
    })

    window.addEventListener('keyup', () => {
      this.stop()
    })
  }

  private changeMoveDirection(keyCode: string) {
    const direction =
      keyCode === 'ArrowLeft' ? this.getVelocity() * -1 : this.getVelocity()
    this.setDx(direction)
  }

  move(dt: number, gameWidth: number) {
    if (this.getDx()) {
      let xOnNextFrame = this.getX() + this.getDx() * dt

      // Не даем игроку выйти за края поля
      if (xOnNextFrame < 0) {
        xOnNextFrame = 0
      } else if (xOnNextFrame + this.getWidth() > gameWidth) {
        xOnNextFrame = gameWidth - this.getWidth()
      }

      this.setX(xOnNextFrame)
    }
  }

  private stop() {
    this.setDx(0)
  }
}
