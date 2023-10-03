import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TUserState } from './types'

const userInitialState = null as TUserState

const slice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setCurrentProfile: (state, action: PayloadAction<TUserState>) =>
      action.payload,
  },
})

export const { actions } = slice
export const userState = slice.reducer
