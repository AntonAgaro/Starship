import { TProfileInfo } from '../../types'

export type TUserState = TProfileInfo | null

export type TLoginData = { login: string; password: string }

export type TSignUpData = {
  login: string
  password: string
  passwordRepeat?: string
  first_name: string
  second_name: string
  phone: string
  email: string
}

export type TChangeProfile = {
  first_name: string
  second_name: string
  login: string
  email: string
  phone: string
  display_name: string
}

export type TChangePassword = {
  newPassword: string
  oldPassword: string
}
