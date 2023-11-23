import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ForumApi from '../../Api/forum'
import { TTopicListInfo } from './types'

const topicListInitialState = null as TTopicListInfo

const forumApi = new ForumApi()

export const asyncGetTopicList = createAsyncThunk<TTopicListInfo, number>(
  'forum/topicList',
  async (page: number) => {
    const response = await forumApi.getTopicList(page)
    return response as TTopicListInfo
  }
)

const slice = createSlice({
  name: 'forum/topicList',
  initialState: topicListInitialState,
  reducers: {
    setTopicList: (state, action: PayloadAction<TTopicListInfo>) =>
      action.payload,
  },
  extraReducers: builder => {
    builder.addCase(
      asyncGetTopicList.fulfilled,
      (state, action: PayloadAction<TTopicListInfo>) => {
        return action.payload
      }
    )
  },
})

export const { actions } = slice
export const topicListState = slice.reducer
