import { LeaderBoardApi } from './../../Api/leaderboard'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LeaderBoard } from './types'

const userInitialState = null as LeaderBoard

const leaderBoardApi = new LeaderBoardApi()

export const asyncGetLeaderBoard = createAsyncThunk<LeaderBoard>(
  'leaderboard/all',
  async () => {
    const response = await leaderBoardApi.getLeaderboard()
    return response as LeaderBoard
  }
)

const slice = createSlice({
  name: 'leaderBoard',
  initialState: userInitialState,
  reducers: {
    setLeaderBoard: (state, action: PayloadAction<LeaderBoard>) =>
      action.payload,
  },
  extraReducers: builder => {
    builder.addCase(
      asyncGetLeaderBoard.fulfilled,
      (state, action: PayloadAction<LeaderBoard>) => {
        return action.payload
      }
    )
  },
})

export const { actions } = slice
export const leaderBoardState = slice.reducer
