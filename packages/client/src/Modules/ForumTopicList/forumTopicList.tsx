import { Avatar, Button, Flex, List, Pagination, Space } from 'antd'
import {
  LikeOutlined,
  MessageOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../Hooks/reduxHooks'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import { TTopicInfo, TTopicListInfo } from '../../Redux/forum/types'
import {
  getDisplayProfileName,
  getProfileAvatar,
  num_per_page,
} from '../../Utils/helpers'
import { asyncGetTopicList } from '../../Redux/forum/topicListState'
import React from 'react'
import { asyncDeleteTopic } from '../../Redux/forum/currentTopicState'
import { TProfileInfo } from '../../Redux/user/types'

export const ForumTopicList: FC = () => {
  const [page, setPage] = useState(1)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const topicList = useSelector(
    (rootState: RootState) => rootState.topicList
  ) as TTopicListInfo

  const profile = useSelector(
    (rootState: RootState) => rootState.user
  ) as TProfileInfo

  useEffect(() => {
    dispatch(asyncGetTopicList(page))
  }, [page])

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  )
  const size = 'small'

  const deleteTopic = async (item: TTopicInfo) => {
    if (item) {
      await dispatch(
        asyncDeleteTopic({ topic_id: item.id, author_id: profile.id })
      )
      dispatch(asyncGetTopicList(page))
    }
  }

  return (
    <List
      itemLayout="horizontal"
      size="large"
      dataSource={topicList?.list}
      footer={
        <div>
          <Pagination
            defaultCurrent={1}
            pageSize={num_per_page}
            total={topicList?.total}
            onChange={page => setPage(page)}
          />
        </div>
      }
      renderItem={item => (
        <List.Item
          key={item?.title}
          actions={[
            <Button
              type="primary"
              shape="round"
              icon={<EditOutlined />}
              size={size}
            />,
            <Button
              type="primary"
              shape="round"
              icon={<DeleteOutlined />}
              size={size}
              onClick={() => deleteTopic(item)}
            />,
          ]}>
          <List.Item.Meta
            avatar={<Avatar src={getProfileAvatar(item?.author)} />}
            title={item?.title}
            description={getDisplayProfileName(item?.author)}
          />
          <Flex gap="small">
            <IconText
              icon={LikeOutlined}
              text="156"
              key="list-vertical-like-o"
            />
            <IconText
              icon={MessageOutlined}
              text="2"
              key="list-vertical-message"
            />
          </Flex>
        </List.Item>
      )}
    />
  )
}
