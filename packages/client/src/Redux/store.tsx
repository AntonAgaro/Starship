import { configureStore } from '@reduxjs/toolkit'
import { userState } from './user/userState'
import { leaderBoardState } from './leaderboard/leaderBoardState'
import { TUserState } from './user/types'
import { LeaderBoard } from './leaderboard/types'

export interface AppState {
  user: TUserState
  leaderboard: LeaderBoard
}

export const createStore = (preloadedState?: AppState) => {
  return configureStore({
    reducer: { user: userState, leaderboard: leaderBoardState },
    preloadedState,
  })
}

export type AppDispatch = ReturnType<typeof createStore>['dispatch']
export type RootState = AppState
