import { FC } from 'react'
import styles from './gameInterface.module.less'

export type GameInterfaceProps = {
  //onStart: () => void
  hitPoints: number
  score: number
  fps: number
  width: string
  height: string
  performanceVisible: boolean
}

const GameInterface: FC<GameInterfaceProps> = ({
  /*onStart*/ width,
  height,
  score,
  fps,
  performanceVisible,
  hitPoints,
}) => {
  return (
    <div className={styles.gameInterface} style={{ width, height }}>
      <div className={styles.hitPoints}>&#10084; {hitPoints}</div>
      <div className={styles.score}>💫 {score}</div>
      {performanceVisible && (
        <div className={styles.performance}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 50 50">
            <path d="M 25 2 C 12.317 2 2 12.318 2 25 C 2 31.417 4.6454375 37.226344 8.8984375 41.402344 L 13.240234 37.248047 C 10.017234 34.152047 8 29.811 8 25 C 8 15.626 15.626 8 25 8 C 34.374 8 42 15.626 42 25 C 42 29.811 39.982766 34.152047 36.759766 37.248047 L 41.101562 41.402344 C 45.354562 37.226344 48 31.417 48 25 C 48 12.318 37.683 2 25 2 z M 32.232422 15.232422 L 20 26 L 25 31 L 35.767578 18.767578 L 32.232422 15.232422 z"></path>
          </svg>
          FPS: {fps}
        </div>
      )}
    </div>
  )
}
export default GameInterface
