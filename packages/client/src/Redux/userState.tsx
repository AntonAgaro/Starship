import { createSlice } from '@reduxjs/toolkit'
import { TProfileInfo } from '../types'

const initialState = null as TProfileInfo | null

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, { payload }: { payload: TProfileInfo }) => payload,
    signOut: () => null,
  },
})

export const { signIn, signOut } = slice.actions
export const userState = slice.reducer
