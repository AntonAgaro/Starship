import { configureStore } from '@reduxjs/toolkit'
import { userState } from './user/userState'
import { leaderBoardState } from './leaderboard/leaderBoardState'

export const store = configureStore({
  reducer: { user: userState, leaderboard: leaderBoardState },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
