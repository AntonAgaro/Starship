type stateMessage = {
  success: boolean
  message: string
}

type TComment = {
  id?: number
  topic_id?: number
  author_id?: number
  text?: string
  created_at?: Date
  updated_at?: Date
}

type TChosenTheme = {
  theme_id?: number
  user_theme_token?: string
  user_login?: string
  id?: number
}

type TTheme = {
  id?: number
  theme_name?: string
}

export { TChosenTheme, TComment, TTheme, stateMessage }
