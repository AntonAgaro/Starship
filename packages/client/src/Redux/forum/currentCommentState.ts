import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ForumApi from '../../Api/forum'
import {
  TCommentInfo,
  TCreateCommentData,
  TDeleteCommentData,
  TGetCommentData,
  TUpdateCommentData,
} from './types'

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
>('forum/deleteComment', async (data: TDeleteCommentData) => {
  const response = await forumApi.deleteComment(data)
  return response as null
})

export const asyncCreateComment = createAsyncThunk<
  TCommentInfo,
  TCreateCommentData
>('forum/createComment', async (data: TCreateCommentData) => {
  const response = await forumApi.createComment(data)
  return response as TCommentInfo
})

export const asyncUpdateComment = createAsyncThunk<
  TCommentInfo,
  TUpdateCommentData
>('forum/updateComment', async (data: TUpdateCommentData) => {
  const response = await forumApi.updateComment(data)
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

      .addCase(
        asyncCreateComment.fulfilled,
        (state, action: PayloadAction<TCommentInfo>) => {
          return action.payload
        }
      )
      .addCase(asyncCreateComment.rejected, state => {
        return null
      })
  },
})

export const { actions } = slice
export const currentCommentState = slice.reducer
