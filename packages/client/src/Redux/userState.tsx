import { createSlice } from '@reduxjs/toolkit'
import { TProfileInfo } from '../types'

const initialState = null as TProfileInfo | null

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentProfile: (state, { payload }: { payload: TProfileInfo | null }) =>
      payload,
  },
})

export const { setCurrentProfile } = slice.actions
export const userState = slice.reducer
