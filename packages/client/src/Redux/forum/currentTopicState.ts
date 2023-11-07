import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ForumApi from '../../Api/forum'
import {
  TCreateTopicData,
  TDeleteTopicData,
  TGetTopicData,
  TTopicInfo,
  TUpdateTopicData,
} from './types'

const currentTopicInitialState = null as TTopicInfo

const forumApi = new ForumApi()

export const asyncGetTopic = createAsyncThunk<TTopicInfo, TGetTopicData>(
  'forum/getTopic',
  async (data: TGetTopicData) => {
    const response = await forumApi.getTopic(data)
    return response as TTopicInfo
  }
)

export const asyncDeleteTopic = createAsyncThunk<TTopicInfo, TDeleteTopicData>(
  'forum/deleteTopic',
  async (data: TDeleteTopicData) => {
    const response = await forumApi.deleteTopic(data)
    return response as null
  }
)

export const asyncCreateTopic = createAsyncThunk<TTopicInfo, TCreateTopicData>(
  'forum/createTopic',
  async (data: TCreateTopicData) => {
    const response = await forumApi.createTopic(data)
    return response as TTopicInfo
  }
)

export const asyncUpdateTopic = createAsyncThunk<TTopicInfo, TUpdateTopicData>(
  'forum/updateTopic',
  async (data: TUpdateTopicData) => {
    const response = await forumApi.updateTopic(data)
    return response as TTopicInfo
  }
)

const slice = createSlice({
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

      .addCase(
        asyncCreateTopic.fulfilled,
        (state, action: PayloadAction<TTopicInfo>) => {
          return action.payload
        }
      )
      .addCase(asyncCreateTopic.rejected, state => {
        return null
      })
  },
})

export const { actions } = slice
export const currentTopicState = slice.reducer
