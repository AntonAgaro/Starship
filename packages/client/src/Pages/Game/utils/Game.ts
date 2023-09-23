import bgImg from '../../../assets/images/background.jpeg'
import playerImg from '../../../assets/images/player-ship.png'
import bossImg from '../../../assets/images/boss-ship.png'
import firstEnemyImg from '../../../assets/images/enemy-1.png'
import secondEnemyImg from '../../../assets/images/enemy-2.png'
import ImagesPreloader from './ImagesPreloader'
interface IGameSettings {
  context: CanvasRenderingContext2D
  width: number
  height: number
}
export default class Game {
  private readonly ctx: CanvasRenderingContext2D
  private readonly gameWidth: number
  private readonly gameHeight: number
  private readonly imagesPreloader: ImagesPreloader
  private time = 0
  constructor(settings: IGameSettings) {
    this.ctx = settings.context
    this.gameWidth = settings.width
    this.gameHeight = settings.height
    this.imagesPreloader = new ImagesPreloader({
      urls: [bgImg, playerImg, bossImg, firstEnemyImg, secondEnemyImg],
      onReadyCallbacks: [
        () => {
          this.drawImages()
        },
      ],
    })
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
    window.requestAnimationFrame(() => {
      this.ctx.drawImage(this.imagesPreloader.getImg(bgImg), 0, 0)
      this.ctx.drawImage(
        this.imagesPreloader.getImg(playerImg),
        this.gameWidth / 2 - 25,
        this.gameHeight - 200,
        100,
        118
      )
    })
  }
}
