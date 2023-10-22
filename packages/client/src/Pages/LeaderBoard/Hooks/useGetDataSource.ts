import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { LeaderBoard } from '../../../Redux/leaderboard/types'

const useGetDataSource = () => {
  const leaderBoard = useSelector(
    (rootState: RootState) => rootState.leaderboard
  ) as LeaderBoard

  const dataSource: {
    key: number
    rating: number
    login: string
    score: number
  }[] = []

  leaderBoard?.map((item, index) => {
    dataSource.push({
      key: index + 1,
      rating: index + 1,
      login: item.data.userName,
      score: item.data.scoreStarship,
    })
  })

  return dataSource
}

export default useGetDataSource
