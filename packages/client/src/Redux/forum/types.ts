export type TCommentInfo = {
  id: number
  topic_id: number
  text: string
  created_date_time: string
  author: TAuthorInfo
} | null

export type TAuthorInfo = {
  first_name: string
  second_name: string
  display_name: string
  login: string
  id: number
  avatar: string
}

export type TTopicInfo = {
  id: number
  title: string
  created_date_time: string
  last_comment_date_time: string | null
  author: TAuthorInfo
  comments?: TCommentListInfo
} | null

export type TTopicListInfo = {
  list: TTopicInfo[]
  total: number
  current_page: number
  num_pages: number
} | null

export type TCommentListInfo = {
  list: TCommentInfo[]
  current_page: number
  num_pages: number
  total: number
} | null

export type TCreateTopicData = {
  title: string
  author_id: number
}
export type TUpdateTopicData = {
  topic_id: number
  title: string
  author_id: number
}
export type TGetTopicData = {
  page: number
  topic_id: number
}

export type TDeleteTopicData = {
  topic_id: number
  author_id: number
}

export type TCreateCommentData = {
  text: string
  author_id: number
  topic_id: number
}
export type TUpdateCommentData = {
  comment_id: number
  text: string
  author_id: number
  topic_id: number
  page: number
}
export type TGetCommentData = {
  topic_id: number
  comment_id: number
}

export type TDeleteCommentData = {
  topic_id: number
  comment_id: number
  author_id: number
}
