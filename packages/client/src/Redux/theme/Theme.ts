import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ThemeState, setTheme } from './types'

const initialState: ThemeState = {
  theme: 'light',
}

const Slice = createSlice({
  initialState,
  name: 'Theme',
  reducers: {
    setTheme: (state, action: PayloadAction<setTheme>) => {
      state.theme = action.payload
    },
  },
})

export const actions = Slice.actions
export default Slice.reducer
