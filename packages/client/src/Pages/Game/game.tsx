import React, { FC, useEffect, useRef } from 'react'
import styles from './game.module.less'
const Game: FC = () => {
  const canvas = useRef(null)

  useEffect(() => {
    console.log(canvas.current)
  })
  return (
    <div className={styles.gameWrapper}>
      <canvas width="1000" height="666" ref={canvas}></canvas>
    </div>
  )
}
export default Game
