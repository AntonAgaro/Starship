import GameBlock from './GameBlock'
import { GameBlockSettings } from '../types/GameBlockTypes'

export default class Explosion extends GameBlock {
  constructor(settings: GameBlockSettings) {
    super(settings)
  }
}
