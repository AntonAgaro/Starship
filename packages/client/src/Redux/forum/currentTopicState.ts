import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ForumApi from '../../Api/forum'
import {
  TCreateTopicData,
  TDeleteTopicData,
  TGetTopicData,
  TTopicInfo,
  TUpdateTopicData,
} from './types'
import { asyncGetTopicList } from './topicListState'

const currentTopicInitialState = null as TTopicInfo

const forumApi = new ForumApi()

export const asyncGetTopic = createAsyncThunk<TTopicInfo, TGetTopicData>(
  'forum/getTopic',
  async (data: TGetTopicData) => {
    const response = await forumApi.getTopic(data)
    if (!response) {
      window.location.href = '/404/'
    }
    return response as TTopicInfo
  }
)

export const asyncDeleteTopic = createAsyncThunk<TTopicInfo, TDeleteTopicData>(
  'forum/deleteTopic',
  async (data: TDeleteTopicData, { dispatch }) => {
    const response = await forumApi.deleteTopic(data)

    const { page } = data

    await dispatch(asyncGetTopicList(page))

    return response as null
  }
)

export const asyncUpdateTopic = createAsyncThunk<TTopicInfo, TUpdateTopicData>(
  'forum/updateTopic',
  async (data: TUpdateTopicData, { dispatch }) => {
    const { page, topic_id, title, author_id } = data
    let response = null

    if (topic_id === 0) {
      response = await forumApi.createTopic({ title, author_id })
    } else {
      response = await forumApi.updateTopic(data)
    }

    await dispatch(asyncGetTopicList(page))

    return response as TTopicInfo
  }
)

export const sliceTopic = createSlice({
  name: 'forum/currentTopic',
  initialState: currentTopicInitialState,
  reducers: {
    setCurrentTopic: (state, action: PayloadAction<TTopicInfo>) =>
      action.payload,
  },
  extraReducers: builder => {
    builder

      .addCase(
        asyncDeleteTopic.fulfilled,
        (state, action: PayloadAction<TTopicInfo>) => {
          return action.payload
        }
      )
      .addCase(asyncDeleteTopic.rejected, state => {
        return null
      })

      .addCase(
        asyncUpdateTopic.fulfilled,
        (state, action: PayloadAction<TTopicInfo>) => {
          return action.payload
        }
      )
      .addCase(asyncUpdateTopic.rejected, state => {
        return null
      })

      .addCase(
        asyncGetTopic.fulfilled,
        (state, action: PayloadAction<TTopicInfo>) => {
          return action.payload
        }
      )
      .addCase(asyncGetTopic.rejected, state => {
        return null
      })
  },
})

export const { actions } = sliceTopic
export const currentTopicState = sliceTopic.reducer
