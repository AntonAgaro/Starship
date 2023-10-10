import { FC } from 'react'
import LeaderBoardTable from '../../Modules/LeaderBoardTable/leaderBoardTable'
import './leaderBoard.less'

const LeaderBoard: FC = () => {
  return (
    <div className="wrapper">
      <LeaderBoardTable />
    </div>
  )
}

export default LeaderBoard
