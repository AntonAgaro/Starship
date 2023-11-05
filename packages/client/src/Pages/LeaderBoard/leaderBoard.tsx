import { useEffect } from 'react'
import LeaderBoardTable from './Modules/LeaderBoardTable/leaderBoardTable'
import styles from './leaderBoard.module.less'
import { asyncGetLeaderBoard } from '../../Redux/leaderboard/leaderBoardState'
import { useAppDispatch } from '../../Hooks/reduxHooks'

const LeaderBoard = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(asyncGetLeaderBoard())
  }, [])

  return (
    <div className={styles.wrapper}>
      <LeaderBoardTable />
    </div>
  )
}

export default LeaderBoard
