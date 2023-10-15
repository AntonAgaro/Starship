import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  TLoginData,
  TSignUpData,
  TUserState,
  TChangeProfile,
  TChangePassword,
} from './types'
import ApiAuth from '../../Api/auth'
import UserApi from '../../Api/user'

const userInitialState = null as TUserState

const authAPI = new ApiAuth()
const userApi = new UserApi()

export const asyncGetProfile = createAsyncThunk<TUserState>(
  'user/getProfile',
  async () => {
    const response = await authAPI.getProfile()
    return response as TUserState
  }
)
export const asyncLogin = createAsyncThunk<TUserState, TLoginData>(
  'user/login',
  async (values: TLoginData) => {
    await authAPI.login(values)

    const response = await authAPI.getProfile()
    return response as TUserState
  }
)
export const asyncLogout = createAsyncThunk<TUserState>(
  'user/logout',
  async () => {
    await authAPI.logout()
    return null
  }
)
export const asyncSignUp = createAsyncThunk<TUserState, TSignUpData>(
  'user/signUp',
  async (values: TSignUpData) => {
    await authAPI.signup(values)

    const response = await authAPI.getProfile()
    return response as TUserState
  }
)

export const asyncChangeProfile = createAsyncThunk<TUserState, TChangeProfile>(
  'user/changeProfile',
  async (values: TChangeProfile) => {
    const response = await userApi.changeInfo(values)
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
      .addCase(
        asyncChangeProfile.fulfilled,
        (state, action: PayloadAction<TUserState>) => {
          return action.payload
        }
      )
      .addCase(asyncChangeProfile.rejected, state => {
        return null
      })
      .addCase(
        asyncLogin.fulfilled,
        (state, action: PayloadAction<TUserState>) => {
          return action.payload
        }
      )
      .addCase(
        asyncLogout.fulfilled,
        (state, action: PayloadAction<TUserState>) => {
          return action.payload
        }
      )
      .addCase(
        asyncSignUp.fulfilled,
        (state, action: PayloadAction<TUserState>) => {
          return action.payload
        }
      )
  },
})

export const { actions } = slice
export const userState = slice.reducer
