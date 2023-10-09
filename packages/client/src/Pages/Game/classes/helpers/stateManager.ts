import { configureStore } from '@reduxjs/toolkit'

//TODO: REMOVE AFTER PR WITH REDUX
export interface GameState {
  playerHitPoints: number
  score: number
}

const initialState: GameState = {
  playerHitPoints: 0,
  score: 0,
}

export const HIT_POINT_UPDATED = 'game/hit-point-updated'
export const SCORE_UPDATED = 'game/score-updated'

export function gameReducer(state = initialState, action) {
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
    default:
      return state
  }
}

export const selectPlayerHitPoints = (state: GameState) => state.playerHitPoints
export const selectPlayerScore = (state: GameState) => state.score

export const gameStore = configureStore({ reducer: gameReducer })
