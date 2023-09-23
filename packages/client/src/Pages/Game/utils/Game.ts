import bgImg from '../../../assets/images/background.jpeg'
import playerImg from '../../../assets/images/player-ship.png'
interface IGameSettings {
  context: CanvasRenderingContext2D
  width: number
  height: number
}
export default class Game {
  private readonly ctx: CanvasRenderingContext2D
  private readonly gameWidth: number
  private readonly gameHeight: number
  private time = 0
  constructor(settings: IGameSettings) {
    this.ctx = settings.context
    this.gameWidth = settings.width
    this.gameHeight = settings.height
    console.log(this.ctx)
    this.drawImages()
  }

  start() {
    const now = Date.now()
    const dt = (now - this.time) / 1000.0

    this.time = now
    window.requestAnimationFrame(() => {
      // this.ctx?.clearRect(0, 0, 1000, 666)
      this.start()
    })
  }

  drawImages() {
    const bg = new Image()
    bg.src = bgImg

    const player = new Image()
    player.src = playerImg

    window.requestAnimationFrame(() => {
      this.ctx.drawImage(bg, 0, 0)
      this.ctx.drawImage(
        player,
        this.gameWidth / 2 - 25,
        this.gameHeight - 200,
        100,
        118
      )
    })
  }
}
