import { UserOutlined } from '@ant-design/icons'
import { Avatar, Card, Space, Table } from 'antd'
import Column from 'antd/es/table/Column'
import { FC } from 'react'
import './leaderBoardTable.less'

const LeaderBoardTable: FC = () => {
  const dataSource = [
    {
      key: '1',
      rating: 1,
      login: 'qwerty',
      score: 100000,
    },
    {
      key: '2',
      rating: 2,
      login: 'qwerty1',
      score: 20000,
    },
    {
      key: '3',
      rating: 3,
      login: 'qwerty2',
      score: 10000,
    },
    {
      key: '4',
      rating: 4,
      login: 'qwerty3',
      score: 5000,
    },
    {
      key: '5',
      rating: 5,
      login: 'qwerty4',
      score: 3000,
    },
    {
      key: '6',
      rating: 6,
      login: 'qwerty5',
      score: 1000,
    },
    {
      key: '7',
      rating: 7,
      login: 'qwerty6',
      score: 1000,
    },
    {
      key: '8',
      rating: 8,
      login: 'qwerty7',
      score: 1000,
    },
  ]

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
          sorter={(a, b) => a.rating - b.rating}
          sortDirections={['descend', 'ascend']}
          defaultSortOrder="ascend"
        />
        <Column title="Количество очков" dataIndex="score" key="score" />
        <Column
          title="Логин"
          dataIndex="login"
          key="login"
          sorter={(a, b) => a.login.localeCompare(b.login)}
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
