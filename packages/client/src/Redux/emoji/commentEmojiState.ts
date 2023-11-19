import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { EmojiApi } from '../../Api/emoji'
import { Emoji, EmojiState } from './types'

const commentEmojiInitialState = {} as EmojiState

const empjiApi = new EmojiApi()

export const asyncGetCommentEmojis = createAsyncThunk<EmojiState, number>(
  'emoji/commentEmojis',
  async (topicId: number) => {
    const response = await empjiApi.getCommentEmojis(topicId)

    return { [topicId]: response as Emoji[] } as EmojiState
  }
)

const slice = createSlice({
  name: 'emoji/commentEmojis',
  initialState: commentEmojiInitialState,
  reducers: {
    setTopicEmojis: (state: EmojiState, action: PayloadAction<EmojiState>) => ({
      ...state,
      ...action.payload,
    }),
  },
  extraReducers: builder => {
    builder.addCase(
      asyncGetCommentEmojis.fulfilled,
      (state, action: PayloadAction<EmojiState>) => {
        return {
          ...state,
          ...action.payload,
        }
      }
    )
  },
})

export const { actions } = slice
export const commentEmojiState = slice.reducer
