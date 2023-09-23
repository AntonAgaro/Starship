import bgImg from '../../../assets/images/background.jpeg'
import playerImg from '../../../assets/images/player-ship.png'
import bossImg from '../../../assets/images/boss-ship.png'
import firstEnemyImg from '../../../assets/images/enemy-1.png'
import secondEnemyImg from '../../../assets/images/enemy-2.png'
import ImagesPreloader from './ImagesPreloader'
import Player from './Player'
import BattleField from './BattleField'
import Enemy from './Enemy'
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
  private player: Player
  private battleField: BattleField
  private lastUpdateTime = 0
  private enemies: Enemy[] = []
  private lastEnemy = 1
  constructor(settings: IGameSettings) {
    this.ctx = settings.context
    this.gameWidth = settings.width
    this.gameHeight = settings.height
    this.player = new Player({
      startPosition: {
        x: this.gameWidth / 2 - 25,
        y: this.gameHeight - 200,
        width: 100,
        height: 118,
        dx: 0,
        dy: 0,
        velocity: 600,
      },
      imgUrl: playerImg,
    })
    this.battleField = new BattleField({
      startPosition: {
        x: 0,
        y: 0,
        width: this.gameWidth,
        height: this.gameHeight,
        dx: 0,
        dy: 0,
        velocity: 0,
      },
      imgUrl: bgImg,
    })
    // Загружаем изображения и начинаем отрисовку в бесконечном цикле
    this.imagesPreloader = new ImagesPreloader({
      urls: [bgImg, playerImg, bossImg, firstEnemyImg, secondEnemyImg],
      onReadyCallbacks: [
        () => {
          this.start()
        },
      ],
    })

    // Каждые 3 сек создаем нового врага
    setInterval(() => {
      this.addEnemies()
    }, 3000)
  }

  start() {
    const now = Date.now()
    //dt - разница между текущем временем и времененм последнего обновления
    const dt = (now - this.lastUpdateTime) / 1000.0
    this.updateElements(dt)
    this.renderImages()
    this.lastUpdateTime = now
    // Рекурсивно вызываем перерисовку
    window.requestAnimationFrame(() => {
      this.start()
    })
  }

  // в updateElements обновляются позиции всех элементов
  // для дальнейшей перерисовки
  updateElements(dt: number) {
    this.player.move(dt)
    this.enemies.forEach(enemy => {
      // Если враг дошел до низа поля, убираем его из this.enemies
      if (enemy.getY() > this.gameHeight) {
        this.destroyEnemy(enemy)
        return
      }
      enemy.move(dt)
    })
  }

  renderImages() {
    //Очищаем отрисованные изображения прежде чем рисовать новые
    this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight)

    this.ctx.drawImage(
      this.imagesPreloader.getImg(this.battleField.getImg()),
      this.battleField.getX(),
      this.battleField.getY()
    )
    this.ctx.drawImage(
      this.imagesPreloader.getImg(this.player.getImg()),
      this.player.getX(),
      this.player.getY(),
      this.player.getWidth(),
      this.player.getHeight()
    )

    this.enemies.forEach(enemy => {
      this.ctx.drawImage(
        this.imagesPreloader.getImg(enemy.getImg()),
        enemy.getX(),
        enemy.getY(),
        enemy.getWidth(),
        enemy.getHeight()
      )
    })
  }

  addEnemies() {
    // Враг появляется в рандомной точке по x наверху карты и движется вниз
    const randomX = Math.floor(Math.random() * this.gameWidth)
    this.enemies.push(
      new Enemy({
        startPosition: {
          x: randomX,
          y: 0,
          width: 100,
          height: 102,
          dx: 0,
          dy: 150,
          velocity: 300,
        },
        imgUrl: this.lastEnemy === 1 ? firstEnemyImg : secondEnemyImg,
      })
    )
    this.lastEnemy = this.lastEnemy === 1 ? 2 : 1
  }

  destroyEnemy(enemy: Enemy) {
    this.enemies = this.enemies.filter(e => e !== enemy)
  }
}
