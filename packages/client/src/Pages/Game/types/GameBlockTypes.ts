//Блок может быть статичный - игровое поле, или движущийся - корабли, снаряды и т.д.
export interface GameBlockPosition {
  x: number
  y: number
  width: number
  height: number
  // направления движения
  dx: number
  dy: number
  // скорость движения
  velocity: number
}

export interface GameBlockSettings {
  startPosition: GameBlockPosition
  imgUrl: string
  hitPoints?: number
  collisionDamage?: number
  scoreForDestoying?: number
}

export interface Shooter {
  shotDamage: number
  takeDamage: (damage: number) => void
  setShotDamage: (damage: number) => void
  getShotDamage: () => number
}

export interface ScoreCollector {
  score: number
  addScore: (score: number) => void
  getScore: () => number
}
