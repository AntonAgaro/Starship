export type LeaderBoard =
  | {
      data: {
        userName: string
        scoreStarship: number
      }
    }[]
  | null
