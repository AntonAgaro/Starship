import { TAuthorInfo, TTopicInfo, TTopicListInfo } from '../Redux/forum/types'
import { num_per_page } from '../Utils/helpers'
const numElements = 42
export const topicListStubGenerate = (): TTopicInfo[] => {
  const result: TTopicInfo[] = []

  let n = 1
  while (result.length < numElements) {
    const author: TAuthorInfo = {
      first_name: 'Test',
      login: `test_login ${n}`,
      second_name: `login ${n}`,
      display_name: 'ololosha',
      avatar: '',
      id: n + 111,
    }

    const newItem: TTopicInfo = {
      id: n,
      title: `Mock Topic ${n}`,
      created_date_time: new Date().toISOString(),
      author: author,
      last_comment_date_time: new Date().toISOString(),
    }
    result.push(newItem)
    n++
  }

  console.log(result)

  return result
}

const stubList = topicListStubGenerate()

export const topicListStub = (
  page: number,
  limit: number = num_per_page
): TTopicListInfo => {
  const result: TTopicListInfo = {
    list: [],
    total: numElements,
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
