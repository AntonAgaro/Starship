export type children = string | null | JSX.Element

export type TProfileInfo = {
  first_name: string
  second_name: string
  phone: string
  email: string
  display_name: string
  login: string
  password: string
  id: number
  avatar: string
  role?: string
}
export type TOAuthServiceInfo = {
  service_id: string
}

export type TOAuthRequest = {
  OauthSignInRequest: {
    code: string
    redirect_uri: string
  }
}
