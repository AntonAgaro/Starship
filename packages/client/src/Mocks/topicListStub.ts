import Title from 'antd/es/skeleton/Title'
import { TAuthorInfo, TTopicInfo, TTopicListInfo } from '../Redux/forum/types'
import { num_per_page } from '../Utils/helpers'
import Topic from '../Pages/Forum/Topic/topic'
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

  stubList.push(newItem)
  return newItem
}
