import React, { FC } from 'react'
import styles from './game.module.less'
import Game from './utils/Game'
import Canvas from '../../Components/Canvas'
const GamePage: FC = () => {
  return (
    <div className={styles.gameWrapper}>
      <Canvas
        width={1000}
        height={666}
        callback={ctx => {
          new Game({ context: ctx, width: 1000, height: 666 })
        }}
      />
    </div>
  )
}
export default GamePage
