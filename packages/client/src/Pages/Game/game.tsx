import { FC, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Canvas from '../../Components/Canvas'
import GameEndModal from '../../Modules/GameEndModal/gameEndModal'
import GameInterface from '../../Modules/GameInterface/gameInterface'
import GameStartModal from '../../Modules/GameStartModal/gameStartModal'
import { RouteUrls } from '../../Routes/Router'
import Game from './classes/Game'
import {
  gameStore,
  selectPlayerHitPoints,
  selectPlayerScore,
} from './classes/helpers/stateManager'
import styles from './game.module.less'

export enum Buttons {
  escape = 'Escape',
}

const GamePage: FC = () => {
  const game = useRef<Game | null>(null)
  const navigate = useNavigate()
  const [isStartModalVisible, setStartModalVisible] = useState(true)
  const [isGameStopped, setIsGameStopped] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)

  const [playerHitPoints, setPlayerHitPoints] = useState(200)
  const [playerScore, setPlayerScore] = useState(0)

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === Buttons.escape) {
        handleStop()
      }
    }
    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  const callback = (ctx: CanvasRenderingContext2D) => {
    if (!game.current) {
      game.current = new Game({
        context: ctx,
        width,
        height,
        isPaused: isGameStopped,
      })

      gameStore.subscribe(() =>
        setPlayerHitPoints(selectPlayerHitPoints(gameStore.getState()))
      )

      gameStore.subscribe(() =>
        setPlayerScore(selectPlayerScore(gameStore.getState()))
      )
    }
  }

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
    navigate(RouteUrls.landing)
  }

  useEffect(() => {
    if (playerHitPoints <= 0) setIsGameOver(true)
  }, [playerHitPoints])

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
          <GameInterface
            width={`${width}px`}
            height={`${height}px`}
            hitPoints={playerHitPoints}
            score={playerScore}
          />
          <Canvas
            width={width}
            height={height}
            isPaused={isGameStopped}
            callback={callback}
          />
          <GameEndModal
            points={playerScore}
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
