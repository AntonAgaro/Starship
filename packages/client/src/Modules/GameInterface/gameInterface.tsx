import { FC } from 'react'
import styles from './gameInterface.module.less'

export type GameInterfaceProps = {
  //onStart: () => void
  hitPoints: number
  score: number
  width: string
  height: string
}

const GameInterface: FC<GameInterfaceProps> = ({
  /*onStart*/ width,
  height,
  score,
  hitPoints,
}) => {
  return (
    <div className={styles.gameInterface} style={{ width, height }}>
      <div className={styles.hitPoints}>&#10084; {hitPoints}</div>
      <div className={styles.score}>💫 {score}</div>
    </div>
  )
}
export default GameInterface
