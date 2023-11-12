import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ForumApi from '../../Api/forum'
import {
  TCommentInfo,
  TDeleteCommentData,
  TGetCommentData,
  TUpdateCommentData,
} from './types'
import { asyncGetTopic } from './currentTopicState'

const currentCommentInitialState = null as TCommentInfo

const forumApi = new ForumApi()

export const asyncGetComment = createAsyncThunk<TCommentInfo, TGetCommentData>(
  'forum/getComment',
  async (data: TGetCommentData) => {
    const response = await forumApi.getComment(data)
    return response as TCommentInfo
  }
)

export const asyncDeleteComment = createAsyncThunk<
  TCommentInfo,
  TDeleteCommentData
>('forum/deleteComment', async (data: TDeleteCommentData, { dispatch }) => {
  const response = await forumApi.deleteComment(data)

  const { topic_id, page } = data

  await dispatch(asyncGetTopic({ page, topic_id }))
  return response as null
})

export const asyncUpdateComment = createAsyncThunk<
  TCommentInfo,
  TUpdateCommentData
>('forum/updateComment', async (data: TUpdateCommentData, { dispatch }) => {
  const { author_id, text, topic_id, page } = data
  let response = null

  if (data.comment_id === 0) {
    response = await forumApi.createComment(data)
  } else {
    response = await forumApi.createComment({ author_id, text, topic_id })
  }
  await dispatch(asyncGetTopic({ page, topic_id }))

  return response as TCommentInfo
})

const slice = createSlice({
  name: 'forum/currentComment',
  initialState: currentCommentInitialState,
  reducers: {
    setCurrentComment: (state, action: PayloadAction<TCommentInfo>) =>
      action.payload,
  },
  extraReducers: builder => {
    builder

      .addCase(
        asyncDeleteComment.fulfilled,
        (state, action: PayloadAction<TCommentInfo>) => {
          return action.payload
        }
      )
      .addCase(asyncDeleteComment.rejected, state => {
        return null
      })

      .addCase(
        asyncUpdateComment.fulfilled,
        (state, action: PayloadAction<TCommentInfo>) => {
          return action.payload
        }
      )
      .addCase(asyncUpdateComment.rejected, state => {
        return null
      })

      .addCase(
        asyncGetComment.fulfilled,
        (state, action: PayloadAction<TCommentInfo>) => {
          return action.payload
        }
      )
      .addCase(asyncGetComment.rejected, state => {
        return null
      })
  },
})

export const { actions } = slice
export const currentCommentState = slice.reducer
