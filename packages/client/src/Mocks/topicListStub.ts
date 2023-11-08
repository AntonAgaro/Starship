import Title from 'antd/es/skeleton/Title'
import { TAuthorInfo, TTopicInfo, TTopicListInfo } from '../Redux/forum/types'
import { num_per_page } from '../Utils/helpers'
const numElements = 42

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

const topicGenerate = (n: number, title: string): TTopicInfo => {
  const author: TAuthorInfo = authorGenerate(n)
  return {
    id: n,
    title: title != '' ? title : `Mock Topic ${n}`,
    created_date_time: new Date().toISOString(),
    author: author,
    last_comment_date_time: new Date().toISOString(),
  }
}

const topicListStubGenerate = (): TTopicInfo[] => {
  const result: TTopicInfo[] = []

  let n = 1
  while (result.length < numElements) {
    const newItem: TTopicInfo = topicGenerate(n, '')
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

export const removeTopicStub = (topic_id: number) => {
  stubList = stubList.filter((el: TTopicInfo) => el?.id != topic_id)
}

export const updateTopicStub = (
  title: string,
  topic_id: number
): TTopicInfo | undefined => {
  const n = stubList.length + 1

  const newItem: TTopicInfo | undefined = stubList.find(
    el => el?.id == topic_id
  )

  if (newItem) {
    newItem.title = title
  }

  return newItem
}

export const addTopicStub = (title: string): TTopicInfo => {
  const n = stubList.length + 1

  const newItem: TTopicInfo = topicGenerate(n, title)

  stubList.push(newItem)
  return newItem
}
