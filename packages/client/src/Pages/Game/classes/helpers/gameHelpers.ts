import { DEFAULT_HIT_POINTS_VALUE } from '../../constants/Constants'
import Enemy from '../Enemy'
import GameBlock from '../GameBlock'
import Player from '../Player'
import PlayerBullet from '../PlayerBullet'

//Столкновение врага с игроком
export function performPlayerAndEnemyCollision(player: Player, enemy: Enemy) {
  const playerCollisionDamage = player.getCollisionDamage(),
    enemyCollisionDamage = enemy.getCollisionDamage()

  if (playerCollisionDamage && enemyCollisionDamage) {
    player.takeDamage(enemyCollisionDamage)
    enemy.takeDamage(playerCollisionDamage)
  }
}

//Столкновение врага с выстрелом
export function performEnemyAndBulletCollision(
  enemy: Enemy,
  bullet: PlayerBullet
) {
  const bulletCollisionDamage = bullet.getCollisionDamage(),
    enemyCollisionDamage = enemy.getCollisionDamage()

  if (bulletCollisionDamage && enemyCollisionDamage) {
    enemy.takeDamage(bulletCollisionDamage)
  }
}

//Столкновение игрока с выстрелом
export function performPlayerAndBulletCollision(
  player: Player,
  bullet: PlayerBullet
) {
  const bulletCollisionDamage = bullet.getCollisionDamage(),
    enemyCollisionDamage = player.getCollisionDamage()

  if (bulletCollisionDamage && enemyCollisionDamage) {
    player.takeDamage(bulletCollisionDamage)
  }
}

//Проверка оставшихся жизней
export const checkHitPointEnough = (block: GameBlock) => {
  return block.getHitPoints() !== DEFAULT_HIT_POINTS_VALUE
    ? //@ts-expect-error DEFAULT_HIT_POINTS_VALUE = null;
      block.getHitPoints() > 0
    : true
}

export const getCoordDiff = (a: number, b: number) => {
  return Math.sign(a - b) > 0 ? -(a / b) : a / b
}
