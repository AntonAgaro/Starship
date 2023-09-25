import GameBlock from './GameBlock'
import { GameBlockSettings } from '../types/GameBlockTypes'

export default class BattleField extends GameBlock {
  constructor(settings: GameBlockSettings) {
    super(settings)
  }
}
