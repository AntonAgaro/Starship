export type Emoji = {
  id: number
  name: string
  count: number
}

export type EmojiState = Record<string, Emoji[]>
