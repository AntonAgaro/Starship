import { GameEventsEnum } from '../enums/GameEventsEnum'
import {
  GameBlockSettings,
  ScoreCollector,
  Shooter,
} from '../types/GameBlockTypes'
import GameBlock from './GameBlock'

export default class Player
  extends GameBlock
  implements Shooter, ScoreCollector
{
  shotDamage: number
  score: number

  constructor(settings: GameBlockSettings & Pick<Shooter, 'shotDamage'>) {
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

    this.shotDamage = settings.shotDamage
    this.score = 0
  }

  addScore(score: number) {
    this.score = this.score + score
  }

  getScore() {
    return this.score
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
