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

export { TComment, stateMessage }
