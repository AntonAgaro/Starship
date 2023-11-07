export type TCommentInfo = {
  id: number
  text: string
  createdDateTime: string
  author: TAuthorInfo
  auhor_id: number
}

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
}

export type TTopicListInfo = {
  list: TTopicInfo
  current_page: number
  num_pages: number
}

export type TCommentListInfo = {
  list: TCommentInfo
  current_page: number
  num_pages: number
}
