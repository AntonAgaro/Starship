import { UserOutlined } from '@ant-design/icons'
import { Avatar, Card, Space, Table } from 'antd'
import { FC } from 'react'
import './leaderBoardTable.less'
import useGetDataSource from '../../Hooks/useGetDataSource'

const { Column } = Table

const LeaderBoardTable: FC = () => {
  const dataSource = useGetDataSource()

  return (
    <Card title="Список лидеров" className="leader-board-table">
      <Table
        dataSource={dataSource}
        sticky
        scroll={{ y: 500 }}
        pagination={{ pageSize: 50 }}>
        <Column
          title="№"
          dataIndex="rating"
          key="rating"
          sorter={(a: { rating: number }, b: { rating: number }) =>
            a.rating - b.rating
          }
          sortDirections={['descend', 'ascend']}
          defaultSortOrder="ascend"
        />
        <Column title="Количество очков" dataIndex="score" key="score" />
        <Column
          title="Логин"
          dataIndex="login"
          key="login"
          sorter={(a: { login: string }, b: { login: string }) =>
            a.login.localeCompare(b.login)
          }
          sortDirections={['descend', 'ascend']}
          render={(_: any, record: { login: string }) => (
            <Space size="middle">
              <Avatar size="large" icon={<UserOutlined rev={undefined} />} />
              <span>{record.login}</span>
            </Space>
          )}
        />
      </Table>
    </Card>
  )
}

export default LeaderBoardTable
