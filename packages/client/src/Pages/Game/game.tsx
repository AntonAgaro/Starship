import axios from 'axios'
import { FC, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LeaderBoardApi from '../../Api/leaderboard'
import Canvas from '../../Components/Canvas'
import GameEndModal from '../../Modules/GameEndModal/gameEndModal'
import GameInterface from '../../Modules/GameInterface/gameInterface'
import GameStartModal from '../../Modules/GameStartModal/gameStartModal'
import { RootState } from '../../Redux/store'
import { RouteUrls } from '../../Routes/Router'
import { TProfileInfo } from '../../types'
import Game from './classes/Game'
import {
  gameStore,
  selectPlayerFps,
  selectPlayerHitPoints,
  selectPlayerScore,
} from './classes/helpers/stateManager'
import styles from './game.module.less'

export enum Buttons {
  escape = 'Escape',
  fullScreenToggle = 'f',
  performanceToggle = 'p',
}

const LeaderboardAPI = new LeaderBoardApi()

const GamePage: FC = () => {
  const game = useRef<Game | null>(null)
  const navigate = useNavigate()
  const currentProfile = useSelector(
    (rootState: RootState) => rootState.user
  ) as TProfileInfo
  const [isStartModalVisible, setStartModalVisible] = useState(true)
  const [isGameStopped, setIsGameStopped] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)

  const [playerHitPoints, setPlayerHitPoints] = useState(200)
  const [playerScore, setPlayerScore] = useState(0)
  const [playerFps, setPlayerFps] = useState(0)
  const [isPlayerFpsVisible, setPlayerFpsVisible] = useState(false)

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case Buttons.escape:
          handleStop()
          break
        case Buttons.fullScreenToggle:
          toggleFullScreen()
          break
        case Buttons.performanceToggle:
          isPlayerFpsVisible
            ? setPlayerFpsVisible(false)
            : setPlayerFpsVisible(true)
          break
      }
    }
    window.addEventListener('keydown', handleKeyPress)

    const hitPointsUnsubscribe = gameStore.subscribe(() =>
      setPlayerHitPoints(selectPlayerHitPoints(gameStore.getState()))
    )

    const scoreUnsubscribe = gameStore.subscribe(() =>
      setPlayerScore(selectPlayerScore(gameStore.getState()))
    )

    const fpsUnsubscribe = gameStore.subscribe(() =>
      setPlayerFps(selectPlayerFps(gameStore.getState()))
    )

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      scoreUnsubscribe()
      hitPointsUnsubscribe()
      fpsUnsubscribe()
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
    }
  }

  const handleStart = () => {
    if (isGameOver) {
      game.current = null
      setIsGameStopped(false)
    }
    setStartModalVisible(false)
  }

  const setLeaderBoard = async () => {
    const data = {
      data: {
        scoreStarship: playerScore,
        userName: currentProfile?.display_name
          ? currentProfile?.display_name
          : currentProfile?.login,
      },
      ratingFieldName: 'scoreStarship',
      teamName: 'starship',
    }

    try {
      await LeaderboardAPI.leaderboard(data)
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e.response?.data)
      }
    }
  }

  const handleStop = () => {
    setIsGameStopped(true)
    setLeaderBoard()
    game.current?.pause()
  }

  const handleContinue = () => {
    setIsGameStopped(false)
    game.current?.resume()
  }

  const handleExit = () => {
    game.current?.destroy()
    game.current = null
    navigate(RouteUrls.landing)
  }

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }

  useEffect(() => {
    if (playerHitPoints <= 0) {
      setIsGameOver(true)
      setLeaderBoard()
    }
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
            fps={playerFps}
            performanceVisible={isPlayerFpsVisible}
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
