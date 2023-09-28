import { FC, useState } from 'react'
import Canvas from '../../Components/Canvas'
import GameStartModal from '../../Modules/GameStartModal/gameStartModal'
import Game from './classes/Game'
import styles from './game.module.less'
const GamePage: FC = () => {
  let game: Game

  const [isStartModalVisible, setStartModalVisible] = useState(true)

  const handleStart = () => {
    setStartModalVisible(false)
    console.log('start')
  }

  const width = 1000,
    height = 666

  return (
    <div className={styles.gameWrapper}>
      <Canvas
        width={width}
        height={height}
        callback={ctx => {
          if (!game) {
            game = new Game({ context: ctx, width, height })
          }
        }}
      />
      {isStartModalVisible && (
        <GameStartModal
          onStart={handleStart}
          width={`${width}px`}
          height={`${height}px`}
        />
      )}
    </div>
  )
}
export default GamePage
