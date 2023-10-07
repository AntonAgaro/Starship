import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TUserState } from './types'
import ApiAuth from '../../Api/auth'

const userInitialState = null as TUserState
const authAPI = new ApiAuth()

export const asyncGetProfile = createAsyncThunk<TUserState>(
  'user/getProfile',
  async () => {
    const response = await authAPI.getProfile()
    return response as TUserState
  }
)

const slice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setCurrentProfile: (state, action: PayloadAction<TUserState>) =>
      action.payload,
  },
  extraReducers: builder => {
    builder
      .addCase(
        asyncGetProfile.fulfilled,
        (state, action: PayloadAction<TUserState>) => {
          return action.payload
        }
      )
      .addCase(asyncGetProfile.rejected, state => {
        return null
      })
  },
})

export const { actions } = slice
export const userState = slice.reducer
