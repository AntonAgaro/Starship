import bgImg from '../../../assets/images/background.jpeg'
import playerImg from '../../../assets/images/player-ship.png'
import bossImg from '../../../assets/images/boss-ship.png'
import firstEnemyImg from '../../../assets/images/enemy-1.png'
import secondEnemyImg from '../../../assets/images/enemy-2.png'
import playerBulletImg from '../../../assets/images/player-bullet.png'
import explosionImg from '../../../assets/images/explosion.png'
import ImagesPreloader from './ImagesPreloader'
import Player from './Player'
import BattleField from './BattleField'
import Enemy from './Enemy'
import GameBlock from './GameBlock'
import { GameEventsEnum } from '../enums/GameEventsEnum'
import PlayerBullet from './PlayerBullet'
import Explosion from './Explosion'
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
  private readonly player: Player
  private battleField: BattleField
  private lastUpdateTime = 0
  private enemies: Enemy[] = []
  private playerBullets: PlayerBullet[] = []
  private explosions: Explosion[] = []
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
      urls: [
        bgImg,
        playerImg,
        bossImg,
        firstEnemyImg,
        secondEnemyImg,
        playerBulletImg,
        explosionImg,
      ],
      onReadyCallbacks: [
        () => {
          this.start()
        },
      ],
    })

    // Каждые 3 сек создаем нового врага
    setInterval(() => {
      this.addEnemies()
    }, 1000)

    document.addEventListener(GameEventsEnum.AddPlayerBullets, () => {
      this.addPlayerBullets()
    })

    // Убираем взрыв
    document.addEventListener(GameEventsEnum.AddExplosion, e => {
      setTimeout(() => {
        this.removeExplosion((e as CustomEvent).detail.explosion)
      }, 500)
    })
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
    this.player.move(dt, this.gameWidth)
    for (let i = 0; i < this.enemies.length; i++) {
      // Если враг столкнулся с игроком - уничтожаем его
      if (this.checkCollision(this.player, this.enemies[i])) {
        const explosion = new Explosion({
          startPosition: {
            x: this.enemies[i].getX(),
            y: this.enemies[i].getY(),
            width: 100,
            height: 100,
            dx: 0,
            dy: 0,
            velocity: 0,
          },
          imgUrl: explosionImg,
        })
        this.explosions.push(explosion)
        document.dispatchEvent(
          new CustomEvent(GameEventsEnum.AddExplosion, {
            detail: {
              explosion,
            },
          })
        )
        this.destroyEnemy(this.enemies[i])
        return
      }
      // Если враг дошел до низа поля, убираем его из this.enemies
      if (this.enemies[i].getY() > this.gameHeight) {
        this.destroyEnemy(this.enemies[i])
        return
      }

      // Проверяем столкновение врага с пулей
      for (let pb = 0; pb < this.playerBullets.length; pb++) {
        if (this.checkCollision(this.enemies[i], this.playerBullets[pb])) {
          const explosion = new Explosion({
            startPosition: {
              x: this.enemies[i].getX(),
              y: this.enemies[i].getY(),
              width: 100,
              height: 100,
              dx: 0,
              dy: 0,
              velocity: 0,
            },
            imgUrl: explosionImg,
          })
          this.explosions.push(explosion)

          document.dispatchEvent(
            new CustomEvent(GameEventsEnum.AddExplosion, {
              detail: {
                explosion,
              },
            })
          )

          this.destroyEnemy(this.enemies[i])
          this.destroyBullet(this.playerBullets[pb])
          return
        }
      }

      this.enemies[i].move(dt)
    }

    this.playerBullets.forEach(bullet => {
      if (bullet.getY() < 0) {
        this.destroyBullet(bullet)
        return
      }

      bullet.move(dt)
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

    this.renderObject(this.player)

    this.enemies.forEach(enemy => {
      this.renderObject(enemy)
    })

    this.playerBullets.forEach(bullet => {
      this.renderObject(bullet)
    })

    this.explosions.forEach(explosion => {
      this.renderObject(explosion)
    })
  }

  renderObject(object: GameBlock) {
    this.ctx.drawImage(
      this.imagesPreloader.getImg(object.getImg()),
      object.getX(),
      object.getY(),
      object.getWidth(),
      object.getHeight()
    )
  }

  addEnemies() {
    // Враг появляется в рандомной точке по x наверху карты и движется вниз
    let randomX = Math.floor(Math.random() * this.gameWidth)
    if (randomX < 0) {
      randomX = 0
    }
    // 100 - enemy width
    if (randomX + 100 > this.gameWidth) {
      randomX = this.gameWidth - 100
    }
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
    // В зависимости от вида врага меняется картинка
    this.lastEnemy = this.lastEnemy === 1 ? 2 : 1
  }

  destroyEnemy(enemy: Enemy) {
    this.enemies = this.enemies.filter(e => e !== enemy)
  }

  destroyBullet(bullet: PlayerBullet) {
    this.playerBullets = this.playerBullets.filter(e => e !== bullet)
  }

  removeExplosion(explosion: Explosion) {
    this.explosions = this.explosions.filter(e => e !== explosion)
  }

  addPlayerBullets() {
    this.playerBullets.push(
      new PlayerBullet({
        startPosition: {
          // TODO 12 подогнал, так как изображение игрока шире чем задано - исправить
          x: this.player.getX() - 12,
          y: this.player.getY(),
          width: 50,
          height: 100,
          dx: 0,
          dy: -600,
          velocity: 600,
        },
        imgUrl: playerBulletImg,
      })
    )
    this.playerBullets.push(
      new PlayerBullet({
        startPosition: {
          // TODO 42 подогнал, так как изображение игрока шире чем задано - исправить
          x: this.player.getX() + this.player.getWidth() - 42,
          y: this.player.getY(),
          width: 50,
          height: 100,
          dx: 0,
          dy: -600,
          velocity: 600,
        },
        imgUrl: playerBulletImg,
      })
    )
  }

  /* Метод отслеживает столкновения:
  принимает координаты верхнего/левого и нижнего/правого углов обоих объектов
  и проверяет, есть ли какие то пересечения.
  */
  checkCollision(block1: GameBlock, block2: GameBlock): boolean {
    return !(
      block1.getX() + block1.getWidth() <= block2.getX() ||
      block1.getX() > block2.getX() + block2.getWidth() ||
      block1.getY() + block1.getHeight() <= block2.getY() ||
      block1.getY() > block2.getY() + block2.getHeight()
    )
  }
}
