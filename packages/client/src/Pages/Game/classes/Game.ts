import bgImg from '../../../assets/images/background.jpeg'
import bossImg from '../../../assets/images/boss-ship.png'
import firstEnemyImg from '../../../assets/images/enemy-1.png'
import secondEnemyImg from '../../../assets/images/enemy-2.png'
import enemyBulletImg from '../../../assets/images/enemy-bullet.png'
import explosionImg from '../../../assets/images/explosion.png'
import playerBulletImg from '../../../assets/images/player-bullet.png'
import playerImg from '../../../assets/images/player-ship.png'
import { GameEventsEnum } from '../enums/GameEventsEnum'
import BattleField from './BattleField'
import Enemy from './Enemy'
import EnemyBullet from './EnemyBullet'
import Explosion from './Explosion'
import GameBlock from './GameBlock'
import ImagesPreloader from './ImagesPreloader'
import Player from './Player'
import PlayerBullet from './PlayerBullet'
import {
  checkHitPointEnough,
  getCoordDiff,
  performEnemyAndBulletCollision,
  performPlayerAndBulletCollision,
  performPlayerAndEnemyCollision,
} from './helpers/gameHelpers'
import {
  HIT_POINT_UPDATED,
  SCORE_UPDATED,
  gameStore,
} from './helpers/stateManager'
interface IGameSettings {
  context: CanvasRenderingContext2D
  width: number
  height: number
  isPaused: boolean
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
  private enemiesBullets: EnemyBullet[] = []
  private explosions: Explosion[] = []
  private lastEnemy = 1
  //@ts-expect-error activateEnemies() в конструкторе инициализирует эту переменную
  private addEnemiesInterval
  //@ts-expect-error activateEnemies() в конструкторе инициализирует эту переменную
  private addEnemiesBulletsInterval

  isPaused: boolean
  constructor(settings: IGameSettings) {
    this.ctx = settings.context
    this.gameWidth = settings.width
    this.gameHeight = settings.height
    this.isPaused = settings.isPaused

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
      collisionDamage: 50,
      hitPoints: 200,
      shotDamage: 40,
    })

    //TODO: временно
    gameStore.dispatch({
      type: HIT_POINT_UPDATED,
      payload: this.player.getHitPoints(),
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
        enemyBulletImg,
        explosionImg,
      ],
      onReadyCallbacks: [
        () => {
          this.start()
        },
      ],
    })

    this.activateEnemies()

    document.addEventListener(GameEventsEnum.AddPlayerBullets, this)

    // Убираем взрыв
    document.addEventListener(GameEventsEnum.AddExplosion, this)
  }

  activateEnemies() {
    this.addEnemiesInterval = setInterval(() => {
      this.addEnemies()
    }, 3000)

    this.addEnemiesBulletsInterval = setInterval(() => {
      this.addEnemiesBullets()
    }, 2000)
  }

  deactivateEnemies() {
    clearInterval(this.addEnemiesInterval)
    clearInterval(this.addEnemiesBulletsInterval)
  }

  handleEvent(event: Event) {
    switch (event.type) {
      case GameEventsEnum.AddExplosion:
        setTimeout(() => {
          this.removeExplosion((event as CustomEvent).detail.explosion)
        }, 500)
        break
      case GameEventsEnum.AddPlayerBullets:
        this.addPlayerBullets()
        break
    }
  }

  destroy() {
    this.deactivateEnemies()
    document.removeEventListener(GameEventsEnum.AddPlayerBullets, this)
    document.removeEventListener(GameEventsEnum.AddExplosion, this)
  }

  start() {
    const now = Date.now()
    //dt - разница между текущем временем и времененм последнего обновления
    if (!this.isPaused) {
      const dt = (now - this.lastUpdateTime) / 1000.0
      this.updateElements(dt)
      this.renderImages()
    }
    this.lastUpdateTime = now
    // Рекурсивно вызываем перерисовку
    if (!this.isPaused) {
      window.requestAnimationFrame(() => {
        this.start()
      })
    }
  }

  // в updateElements обновляются позиции всех элементов
  // для дальнейшей перерисовки
  updateElements(dt: number) {
    this.player.move(dt, this.gameWidth)
    for (let i = 0; i < this.enemies.length; i++) {
      // Если враг столкнулся с игроком - наносим урон обоим, если нет очков здоровья уничтожаем
      if (this.checkCollision(this.player, this.enemies[i])) {
        performPlayerAndEnemyCollision(this.player, this.enemies[i])
        //TODO: временно
        gameStore.dispatch({
          type: HIT_POINT_UPDATED,
          payload: this.player.getHitPoints(),
        })

        if (!checkHitPointEnough(this.enemies[i])) {
          this.createExplosion(this.enemies[i])
          this.destroyEnemy(this.enemies[i])
        }

        return
      }
      //Проверяем попал ли выстрел врага попал в игрока
      for (let eb = 0; eb < this.enemiesBullets.length; eb++) {
        if (this.checkCollision(this.player, this.enemiesBullets[eb])) {
          performPlayerAndBulletCollision(this.player, this.enemiesBullets[eb])

          //TODO: временно
          gameStore.dispatch({
            type: HIT_POINT_UPDATED,
            payload: this.player.getHitPoints(),
          })

          this.destroyEnemyBullet(this.enemiesBullets[eb])
        }
      }

      // Если враг дошел до низа поля, убираем его из this.enemies
      if (this.enemies[i].getY() > this.gameHeight) {
        this.destroyEnemy(this.enemies[i])
        return
      }

      this.enemiesBullets.forEach(bullet => {
        if (bullet.getY() > this.gameHeight) {
          this.destroyEnemyBullet(bullet)
        }
      })

      // Проверяем столкновение врага с пулей
      for (let pb = 0; pb < this.playerBullets.length; pb++) {
        if (this.checkCollision(this.enemies[i], this.playerBullets[pb])) {
          performEnemyAndBulletCollision(
            this.enemies[i],
            this.playerBullets[pb]
          )

          if (!checkHitPointEnough(this.enemies[i])) {
            this.player.addScore(this.enemies[i].getScoreForDestroying())

            //TODO: временно
            gameStore.dispatch({
              type: SCORE_UPDATED,
              payload: this.player.getScore(),
            })

            this.createExplosion(this.enemies[i])
            this.destroyEnemy(this.enemies[i])
            this.destroyPlayerBullet(this.playerBullets[pb])
          }
          return
        }
      }

      this.enemies[i].move(dt)
    }

    this.playerBullets.forEach(bullet => {
      if (bullet.getY() < 0) {
        this.destroyPlayerBullet(bullet)
        return
      }

      bullet.move(dt)
    })

    this.enemiesBullets.forEach(bullet => {
      if (bullet.getY() > this.gameWidth) {
        this.destroyEnemyBullet(bullet)
        return
      }

      bullet.move(dt)
    })
  }

  pause() {
    this.isPaused = true
    this.deactivateEnemies()
  }

  resume() {
    this.isPaused = false
    this.start()
    this.activateEnemies()
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

    this.enemiesBullets.forEach(bullet => {
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
          dy: 100,
          velocity: 100,
        },
        imgUrl: this.lastEnemy === 1 ? firstEnemyImg : secondEnemyImg,
        hitPoints: 30,
        collisionDamage: 20,
        scoreForDestoying: 1000,
        shotDamage: 10,
      })
    )
    // В зависимости от вида врага меняется картинка
    this.lastEnemy = this.lastEnemy === 1 ? 2 : 1
  }

  destroyEnemy(enemy: Enemy) {
    this.enemies = this.enemies.filter(e => e !== enemy)
  }

  destroyPlayerBullet(bullet: PlayerBullet) {
    this.playerBullets = this.playerBullets.filter(e => e !== bullet)
  }

  destroyEnemyBullet(bullet: EnemyBullet) {
    this.enemiesBullets = this.enemiesBullets.filter(e => e !== bullet)
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
        collisionDamage: this.player.getShotDamage(),
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
        collisionDamage: this.player.getShotDamage(),
      })
    )
  }

  addEnemiesBullets() {
    this.enemies.forEach(enemy => {
      this.enemiesBullets.push(
        new EnemyBullet({
          startPosition: {
            // TODO 42 подогнал, так как изображение игрока шире чем задано - исправить
            x: enemy.getX() + enemy.getWidth() - 60,
            y: enemy.getY(),
            width: 20,
            height: 50,
            dx:
              100 *
              getCoordDiff(
                enemy.getX() + enemy.getWidth() - 60,
                this.player.getX()
              ),
            dy: 100 * (this.player.getY() / enemy.getY()),
            velocity: 300,
          },
          imgUrl: enemyBulletImg,
          collisionDamage: enemy.getShotDamage(),
        })
      )
    })
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

  createExplosion(enemy: Enemy) {
    const explosion = new Explosion({
      startPosition: {
        x: enemy.getX(),
        y: enemy.getY(),
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
  }
}
