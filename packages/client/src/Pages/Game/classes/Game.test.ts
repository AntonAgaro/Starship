import { beforeEach, describe, expect, test } from '@jest/globals'
import BattleField from './BattleField'
import Enemy from './Enemy'
import Explosion from './Explosion'
import Game from './Game'
import Player from './Player'
import PlayerBullet from './PlayerBullet'

let canvas: HTMLCanvasElement
let game: Game

describe('Test Game class', () => {
  beforeEach(() => {
    canvas = document.createElement('canvas')
    game = new Game({
      context: canvas.getContext('2d') as CanvasRenderingContext2D,
      width: 1000,
      height: 1000,
      isPaused: false,
    })
  })

  test('Player was created', () => {
    expect(game['player']).toBeInstanceOf(Player)
  })

  test('BattleField was created', () => {
    expect(game['battleField']).toBeInstanceOf(BattleField)
  })

  test('Enemies are correctly adding', () => {
    game['addEnemies']()
    expect(game['enemies'].length).toBe(1)
  })

  test('addEnemies method add instanceof Enemy', () => {
    game['addEnemies']()
    expect(game['enemies'][0]).toBeInstanceOf(Enemy)
  })

  test('destroyEnemy correctly removes enemy', () => {
    game['addEnemies']()
    game['addEnemies']()
    const enemy1 = game['enemies'][0]
    game['destroyEnemy'](enemy1)
    expect(game['enemies'].length).toBe(1)
  })

  test('Enemy destroys when it Y is more than Game Y', () => {
    game['addEnemies']()
    game['addEnemies']()
    const enemy1 = game['enemies'][0]
    enemy1.setY(game['gameHeight'] + 12)
    game['updateElements'](1)
    expect(game['enemies'].find(enemy => enemy === enemy1)).toBe(undefined)
  })

  test('PlayerBullets correctly added', () => {
    game['addPlayerBullets']()
    expect(game['playerBullets'][0]).toBeInstanceOf(PlayerBullet)
  })

  test('Collision is correctly detected', () => {
    game['addEnemies']()
    const enemy1 = game['enemies'][0]
    const player = game['player']
    enemy1.setY(player.getY())
    enemy1.setX(player.getX())
    const isCollision = game['checkCollision'](enemy1, player)
    expect(isCollision).toBeTruthy()
  })

  test('Explosion correctly created', () => {
    game['addEnemies']()
    jest.useFakeTimers()
    game['createExplosion'](game['enemies'][0])
    jest.advanceTimersByTime(40)
    expect(game['explosions'][0]).toBeInstanceOf(Explosion)
  })

  test('Explosion correctly removed', () => {
    jest.useFakeTimers()
    game['addEnemies']()
    game['createExplosion'](game['enemies'][0])
    jest.advanceTimersByTime(1100)
    expect(game['explosions'].length).toBe(0)
  })
})
