import { configureStore } from '@reduxjs/toolkit'

//TODO: REMOVE AFTER PR WITH REDUX
export interface GameState {
  playerHitPoints: number
  score: number
  framesPerSecond: number
}

const initialState: GameState = {
  playerHitPoints: 0,
  score: 0,
  framesPerSecond: 0,
}

export const HIT_POINT_UPDATED = 'game/hit-point-updated'
export const SCORE_UPDATED = 'game/score-updated'
export const FPS_UPDATED = 'game/fps-updated'

export function gameReducer(
  state = initialState,
  action: { type: any; payload: any }
) {
  switch (action.type) {
    case HIT_POINT_UPDATED: {
      return {
        ...state,
        ...{ playerHitPoints: action.payload },
      }
    }
    case SCORE_UPDATED: {
      return {
        ...state,
        ...{ score: action.payload },
      }
    }
    case FPS_UPDATED: {
      return {
        ...state,
        ...{ framesPerSecond: action.payload },
      }
    }
    default:
      return state
  }
}

export const selectPlayerHitPoints = (state: GameState) => state.playerHitPoints
export const selectPlayerScore = (state: GameState) => state.score
export const selectPlayerFps = (state: GameState) => state.framesPerSecond

export const gameStore = configureStore({ reducer: gameReducer })
