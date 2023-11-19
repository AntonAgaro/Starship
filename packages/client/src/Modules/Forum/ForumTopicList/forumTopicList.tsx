import {
  DeleteOutlined,
  EditOutlined,
  LikeOutlined,
  MessageOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Flex, List, Modal, Pagination, Space } from 'antd'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../Hooks/reduxHooks'
import { asyncGetTopicEmojis } from '../../../Redux/emoji/topicEmojiState'
import { EmojiState } from '../../../Redux/emoji/types'
import {
  asyncDeleteTopic,
  asyncUpdateTopic,
} from '../../../Redux/forum/currentTopicState'
import { asyncGetTopicList } from '../../../Redux/forum/topicListState'
import { TTopicInfo, TTopicListInfo } from '../../../Redux/forum/types'
import { RootState } from '../../../Redux/store'
import { TProfileInfo } from '../../../Redux/user/types'
import { RouteUrls } from '../../../Routes/Router'
import { EMOJI } from '../../../Utils/constants'
import {
  getDisplayProfileName,
  getEntityEmojisCountFromState,
  getProfileAvatar,
  num_per_page,
} from '../../../Utils/helpers'
import ForumTopicAddEdit, {
  UpdateTopicValues,
} from '../ForumTopicAddEdit/ForumTopicAddEdit'
import './forumTopicList.less'

export const ForumTopicList: FC = () => {
  const [page, setPage] = useState(1)
  const [title, setTitle] = useState('')
  const [topicId, setTopicId] = useState(0)
  const [openTopicEdit, setOpenTopicEdit] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const topicList = useSelector(
    (rootState: RootState) => rootState.topicList
  ) as TTopicListInfo

  const topicsEmojis = useSelector(
    (rootState: RootState) => rootState.topicEmojiState
  ) as EmojiState

  const profile = useSelector(
    (rootState: RootState) => rootState.user
  ) as TProfileInfo

  useEffect(() => {
    dispatch(asyncGetTopicList(page))
  }, [page])

  useEffect(() => {
    if (topicList?.list.length && topicList?.list.length > 0) {
      topicList.list.forEach(topic => {
        dispatch(asyncGetTopicEmojis(topic?.id as number))
      })
    }
  }, [topicList])

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
        asyncDeleteTopic({ topic_id: item.id, author_id: profile.id, page })
      )
    }
  }

  const updateTopic = async (data: UpdateTopicValues) => {
    setOpenTopicEdit(false)

    await dispatch(
      asyncUpdateTopic({
        topic_id: topicId,
        author_id: profile.id,
        title: data.title,
        page,
      })
    )
  }

  const openEditForm = useCallback((item: TTopicInfo | null = null) => {
    if (item) {
      setTitle(item ? item.title : '')
      setTopicId(item ? item.id : -1)
    } else {
      setTitle('')
      setTopicId(0)
    }
    setOpenTopicEdit(true)
  }, [])

  return (
    <div>
      <Flex justify="space-around" align="center">
        <h1 style={{ color: 'white' }}>Форум</h1>
        <Button onClick={() => openEditForm()}>+</Button>
      </Flex>
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
                onClick={() => openEditForm(item)}
              />,
              <Button
                type="primary"
                shape="round"
                icon={<DeleteOutlined />}
                size={size}
                onClick={() => {
                  Modal.confirm({
                    title: 'Удаление обсуждения',
                    content: `Удалить обсуждение "${item?.title}"? Действие невозможно будет отменить`,
                    centered: true,
                    okText: 'Да',
                    cancelText: 'Нет',
                    onOk: () => {
                      deleteTopic(item)
                    },
                    footer: (_, { OkBtn, CancelBtn }) => (
                      <>
                        <CancelBtn />
                        <OkBtn />
                      </>
                    ),
                  })
                }}
              />,
            ]}>
            <List.Item.Meta
              avatar={<Avatar src={getProfileAvatar(item?.author)} />}
              title={
                item ? (
                  <Button
                    type="link"
                    className="topic-header"
                    onClick={() =>
                      navigate(
                        RouteUrls.topic.replace(':id', item.id.toString())
                      )
                    }>
                    {item?.title}
                  </Button>
                ) : (
                  ''
                )
              }
              description={getDisplayProfileName(item?.author)}
            />
            <Flex gap="small">
              <IconText
                icon={LikeOutlined}
                text={getEntityEmojisCountFromState(
                  topicsEmojis,
                  item?.id ?? 0,
                  EMOJI.LIKE
                )}
                key="list-vertical-like-o"
              />
              <IconText
                icon={MessageOutlined}
                text={item?.comments?.total.toString() ?? ''}
                key="list-vertical-message"
              />
            </Flex>
          </List.Item>
        )}
      />
      {openTopicEdit && (
        <ForumTopicAddEdit
          oldTitle={title}
          topic_id={topicId}
          onCreate={updateTopic}
          open={openTopicEdit}
          onCancel={() => setOpenTopicEdit(false)}
        />
      )}
    </div>
  )
}
