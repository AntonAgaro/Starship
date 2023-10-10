import { GameBlockSettings, Shooter } from '../types/GameBlockTypes'
import Enemy from './Enemy'

export default class EnemyBoss extends Enemy {
  constructor(settings: GameBlockSettings & Pick<Shooter, 'shotDamage'>) {
    super(settings)
  }
}
