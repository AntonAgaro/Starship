import { useEffect } from 'react'
import LeaderBoardTable from './Modules/LeaderBoardTable/leaderBoardTable'
import { store } from '../../Redux/store'
import styles from './leaderBoard.module.less'
import { asyncGetLeaderBoard } from '../../Redux/leaderboard/leaderBoardState'

const LeaderBoard = () => {
  useEffect(() => {
    store.dispatch(asyncGetLeaderBoard())
  }, [])

  return (
    <div className={styles.wrapper}>
      <LeaderBoardTable />
    </div>
  )
}

export default LeaderBoard
