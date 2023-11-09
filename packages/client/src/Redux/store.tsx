import { configureStore } from '@reduxjs/toolkit'
import { userState } from './user/userState'
import { leaderBoardState } from './leaderboard/leaderBoardState'
import { TUserState } from './user/types'
import { LeaderBoard } from './leaderboard/types'
import { ThemeState } from './theme/types'
import Theme from './theme/Theme'

export interface AppState {
  user: TUserState
  leaderboard: LeaderBoard
  theme: ThemeState
}

export const createStore = (preloadedState?: AppState) => {
  return configureStore({
    reducer: { user: userState, leaderboard: leaderBoardState, theme: Theme },
    preloadedState,
  })
}

export type AppDispatch = ReturnType<typeof createStore>['dispatch']
export type RootState = AppState
