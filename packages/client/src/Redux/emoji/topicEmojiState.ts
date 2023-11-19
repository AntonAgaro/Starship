import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { EmojiApi } from '../../Api/emoji'
import { Emoji, EmojiState } from './types'

const topicEmojiInitialState = {} as EmojiState

const emojiApi = new EmojiApi()

export const asyncGetTopicEmojis = createAsyncThunk<EmojiState, number>(
  'emoji/topicEmojis',
  async (topicId: number) => {
    const response = await emojiApi.getTopicEmojis(topicId)

    return { [topicId]: response as Emoji[] } as EmojiState
  }
)

const slice = createSlice({
  name: 'emoji/topicEmojis',
  initialState: topicEmojiInitialState,
  reducers: {
    setTopicEmojis: (state: EmojiState, action: PayloadAction<EmojiState>) => ({
      ...state,
      ...action.payload,
    }),
  },
  extraReducers: builder => {
    builder.addCase(
      asyncGetTopicEmojis.fulfilled,
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
export const topicEmojiState = slice.reducer
