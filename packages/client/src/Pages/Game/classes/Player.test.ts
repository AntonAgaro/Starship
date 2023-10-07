import Player from './Player'
import { describe, expect, test, beforeEach } from '@jest/globals'

let player: Player
describe('Test Player class', () => {
  beforeEach(() => {
    player = new Player({
      startPosition: {
        x: 25,
        y: 200,
        width: 100,
        height: 118,
        dx: 0,
        dy: 0,
        velocity: 600,
      },
      imgUrl: 'img',
    })
  })

  test('getX returns correct value', () => {
    expect(player.getX()).toBe(25)
  })

  test('getY returns correct value', () => {
    expect(player.getY()).toBe(200)
  })

  test('getWidth returns correct value', () => {
    expect(player.getWidth()).toBe(100)
  })

  test('getHeight returns correct value', () => {
    expect(player.getHeight()).toBe(118)
  })

  test('getImg returns correct value', () => {
    expect(player.getImg()).toBe('img')
  })

  test('getDx returns correct value', () => {
    expect(player.getDx()).toBe(0)
  })

  test('getDy returns correct value', () => {
    expect(player.getDy()).toBe(0)
  })

  test('getVelocity returns correct value', () => {
    expect(player.getVelocity()).toBe(600)
  })

  test('setX sets correct value', () => {
    player.setX(104)
    expect(player.getX()).toBe(104)
  })

  test('setY sets correct value', () => {
    player.setY(403)
    expect(player.getY()).toBe(403)
  })

  test('setDx sets correct value', () => {
    player.setDx(-1)
    expect(player.getDx()).toBe(-1)
  })

  test('setDy sets correct value', () => {
    player.setDy(4)
    expect(player.getDy()).toBe(4)
  })

  test('setVelocity sets correct value', () => {
    player.setVelocity(400)
    expect(player.getVelocity()).toBe(400)
  })
})
