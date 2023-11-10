import Title from 'antd/es/skeleton/Title'
import {
  TAuthorInfo,
  TCommentInfo,
  TCommentListInfo,
  TTopicInfo,
  TTopicListInfo,
} from '../Redux/forum/types'
import { num_per_page } from '../Utils/helpers'

const numElements = 42

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

const authorGenerate = (n: number): TAuthorInfo => {
  return {
    first_name: 'Test',
    login: `test_login ${n}`,
    second_name: `login ${n}`,
    display_name: 'ololosha',
    avatar: '',
    id: n + 111,
  }
}

const commentGenerate = (n: number, topic_id: number): TCommentInfo => {
  return {
    id: n + 1144,
    text: loremIpsum,
    topic_id,
    created_date_time: new Date().toISOString(),
    author: authorGenerate(n + 2000),
  }
}

const commentsListGenerate = (n_: number, topic_id: number): TCommentInfo[] => {
  const comments: TCommentInfo[] = []
  let n = n_
  while (comments.length < numElements) {
    const newItem: TCommentInfo = commentGenerate(n + 600, topic_id)
    comments.push(newItem)
    n++
  }

  return comments
}

const topicGenerate = (
  n: number,
  title: string,
  generateComments = false
): TTopicInfo => {
  const author: TAuthorInfo = authorGenerate(n)
  const list = generateComments ? commentsListGenerate(n + 300, n) : []

  return {
    id: n,
    title: title != '' ? title : `Mock Topic ${n}`,
    created_date_time: new Date().toISOString(),
    author: author,
    last_comment_date_time: new Date().toISOString(),
    comments: {
      list: list,
      num_pages: -1,
      current_page: 1,
      total: list.length,
    },
  }
}

const topicListStubGenerate = (): TTopicInfo[] => {
  const result: TTopicInfo[] = []

  let n = 1
  while (result.length < numElements) {
    const newItem: TTopicInfo = topicGenerate(n, '', true)
    result.push(newItem)
    n++
  }

  console.log(result)

  return result
}

let stubList = topicListStubGenerate()

export const topicListStub = (
  page: number,
  limit: number = num_per_page
): TTopicListInfo => {
  const result: TTopicListInfo = {
    list: [],
    total: stubList.length,
    current_page: page,
    num_pages: 0,
  }

  const numPages = Math.ceil(numElements / limit)
  const start = (page - 1) * limit

  for (let i = start; i < start + limit && i < stubList.length; i++) {
    const newItem: TTopicInfo = stubList[i]

    result.list.push(newItem)
  }
  result.num_pages = numPages
  console.log(result)
  return result
}

export const getTopicStub = (
  page: number,
  topic_id: number,
  limit: number = num_per_page
): TTopicInfo | null => {
  const currentTopic: TTopicInfo | undefined = JSON.parse(
    JSON.stringify(stubList.find(el => el?.id == topic_id))
  )

  if (!currentTopic) return null

  const len = currentTopic.comments?.list?.length ?? 0
  const result: TCommentListInfo = {
    list: [],
    total: len,
    current_page: page,
    num_pages: 0,
  }
  const numPages = Math.ceil(len / limit)
  const start = (page - 1) * limit

  for (let i = start; i < start + limit && i < len; i++) {
    const newItem: TCommentInfo | undefined = currentTopic.comments?.list[i]

    if (newItem) {
      result.list.push(newItem)
    }
  }
  result.num_pages = numPages

  currentTopic.comments = result

  console.log(result)
  return currentTopic
}

export const removeTopicStub = (topic_id: number) => {
  stubList = stubList.filter((el: TTopicInfo) => el?.id != topic_id)
}

export const updateTopicStub = async (
  title: string,
  topic_id: number
): Promise<TTopicInfo | undefined> => {
  const old = JSON.parse(JSON.stringify(stubList)) as TTopicInfo[]

  console.log(title, topic_id)

  const n = stubList.length + 1

  let newItem: TTopicInfo | undefined = undefined

  old.map((el: TTopicInfo, index) => {
    if (el?.id == topic_id) {
      el.title = title
      newItem = el
      old[index] = el
    }
  })

  stubList = old
  return newItem
}

export const addTopicStub = (title: string): TTopicInfo => {
  const n = stubList.length + 1

  const newItem: TTopicInfo = topicGenerate(n, title)
  stubList.reverse()
  stubList.push(newItem)
  stubList.reverse()
  return newItem
}

export const removeCommentStub = (topic_id: number, Comment_id: number) => {
  const old = JSON.parse(JSON.stringify(stubList)) as TTopicInfo[]

  old.map((currentTopic: TTopicInfo, index) => {
    if (currentTopic?.id == topic_id && currentTopic.comments) {
      const comments = currentTopic.comments?.list.filter(
        (el: TCommentInfo) => el?.id != Comment_id
      )

      currentTopic.comments.list = comments
      old[index] = currentTopic
    }
  })

  stubList = old
}
