import GameBlock from './GameBlock'
import { GameBlockSettings } from '../types/GameBlockTypes'
import { GameEventsEnum } from '../enums/GameEventsEnum'

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

  move(dt: number) {
    if (this.getDx()) {
      this.setX(this.getX() + this.getDx() * dt)
    }
  }

  private stop() {
    this.setDx(0)
  }
}
