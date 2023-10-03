import { FC, useEffect, useRef, useState } from 'react'
import Canvas from '../../Components/Canvas'
import GameStartModal from '../../Modules/GameStartModal/gameStartModal'
import Game from './classes/Game'
import styles from './game.module.less'
import GameEndModal from '../../Modules/GameEndModal/gameEndModal'
import { useNavigate } from 'react-router-dom'

const GamePage: FC = () => {
  const game = useRef<Game | null>(null)
  const navigate = useNavigate()
  const [isStartModalVisible, setStartModalVisible] = useState(true)
  const [isGameStopped, setIsGameStopped] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [points, setPoints] = useState(1000)

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleStop()
      }
    }
    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  const handleStart = () => {
    if (isGameOver) {
      game.current = null
      setIsGameStopped(false)
    }
    setStartModalVisible(false)
  }

  const handleStop = () => {
    setIsGameStopped(true)
    game.current?.pause()
  }

  const handleContinue = () => {
    setIsGameStopped(false)
    game.current?.resume()
  }

  const handleExit = () => {
    navigate('/')
  }

  const width = 1000,
    height = 666

  return (
    <div className={styles.gameWrapper}>
      {isStartModalVisible ? (
        <GameStartModal
          onStart={handleStart}
          width={`${width}px`}
          height={`${height}px`}
        />
      ) : (
        <>
          <Canvas
            width={width}
            height={height}
            isPaused={isGameStopped}
            callback={ctx => {
              if (!game.current) {
                game.current = new Game({
                  context: ctx,
                  width,
                  height,
                  isPaused: isGameStopped,
                })
              }
            }}
          />
          <GameEndModal
            points={points}
            onStart={handleStart}
            isGameOver={isGameOver}
            isGameStopped={isGameStopped}
            onContinue={handleContinue}
            onExit={handleExit}
            onStop={handleStop}
            width={`${width}px`}
            height={`${height}px`}
          />
        </>
      )}
    </div>
  )
}
export default GamePage
