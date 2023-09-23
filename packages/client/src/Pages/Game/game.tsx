import React, { FC } from 'react'
import styles from './game.module.less'
import Game from './classes/Game'
import Canvas from '../../Components/Canvas'
const GamePage: FC = () => {
  let game: Game
  return (
    <div className={styles.gameWrapper}>
      <Canvas
        width={1000}
        height={666}
        callback={ctx => {
          if (!game) {
            game = new Game({ context: ctx, width: 1000, height: 666 })
          }
        }}
      />
    </div>
  )
}
export default GamePage
