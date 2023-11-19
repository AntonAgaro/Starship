import {
  DeleteOutlined,
  DislikeOutlined,
  EditOutlined,
  LikeOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Flex, List, Modal, Pagination, Space } from 'antd'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../Hooks/reduxHooks'
import { asyncGetTopic } from '../../../Redux/forum/currentTopicState'
import { TCommentInfo, TTopicInfo } from '../../../Redux/forum/types'
import { RootState } from '../../../Redux/store'
import { TProfileInfo } from '../../../Redux/user/types'
import {
  getDisplayProfileName,
  getEntityEmojisCountFromState,
  getProfileAvatar,
  num_per_page,
} from '../../../Utils/helpers'

import { asyncGetCommentEmojis } from '../../../Redux/emoji/commentEmojiState'
import { EmojiState } from '../../../Redux/emoji/types'
import {
  asyncDeleteComment,
  asyncUpdateComment,
} from '../../../Redux/forum/currentCommentState'
import { RouteUrls } from '../../../Routes/Router'
import { EMOJI } from '../../../Utils/constants'
import ForumCommentAddEdit, {
  UpdateCommentValues,
} from '../ForumCommentAddEdit/ForumCommentAddEdit'

type TTopicProps = { topic_id: number }

export const ForumTopic: FC<TTopicProps> = (props: TTopicProps) => {
  const [page, setPage] = useState(1)
  const [text, setText] = useState('')
  const [commentId, setCommentId] = useState(0)
  const [openCommentEdit, setOpenCommentEdit] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const currentTopic = useSelector(
    (rootState: RootState) => rootState.currentTopic
  ) as TTopicInfo

  const topicsEmojis = useSelector(
    (rootState: RootState) => rootState.commentEmojiState
  ) as EmojiState

  const profile = useSelector(
    (rootState: RootState) => rootState.user
  ) as TProfileInfo

  useEffect(() => {
    if (props.topic_id === 0) {
      navigate(RouteUrls.error404)
    } else {
      dispatch(asyncGetTopic({ page, topic_id: props.topic_id }))
    }
  }, [page])

  useEffect(() => {
    if (
      currentTopic?.comments?.list.length &&
      currentTopic?.comments?.list.length > 0
    ) {
      currentTopic.comments.list.forEach(topic => {
        dispatch(asyncGetCommentEmojis(topic?.id as number))
      })
    }
  }, [currentTopic])

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  )
  const size = 'small'

  const deleteComment = async (item: TCommentInfo) => {
    if (item) {
      await dispatch(
        asyncDeleteComment({
          author_id: profile.id,
          topic_id: props.topic_id,
          comment_id: item.id,
          page,
        })
      )
    }
  }

  const updateComment = async (data: UpdateCommentValues) => {
    setOpenCommentEdit(false)

    await dispatch(
      asyncUpdateComment({
        author_id: profile.id,
        comment_id: commentId,
        text: data.text,
        topic_id: props.topic_id,
        page,
      })
    )
  }

  const openEditForm = useCallback((item: TCommentInfo | null = null) => {
    if (item) {
      setText(item ? item.text : '')
      setCommentId(item ? item.id : -1)
    } else {
      setText('')
      setCommentId(0)
    }
    setOpenCommentEdit(true)
  }, [])

  return (
    <div>
      <Flex justify="space-around" align="center">
        <h1 style={{ color: 'white' }}>{currentTopic?.title}</h1>
        <Button onClick={() => openEditForm()}>+ Ответить</Button>
      </Flex>
      <List
        itemLayout="horizontal"
        size="large"
        dataSource={currentTopic?.comments?.list}
        footer={
          <div>
            <Pagination
              defaultCurrent={1}
              pageSize={num_per_page}
              total={currentTopic?.comments?.total}
              onChange={page => setPage(page)}
            />
          </div>
        }
        renderItem={item => (
          <List.Item
            key={'_comment_' + item?.id}
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
                    title: 'Удаление комментария',
                    content: `Удалить обсуждение комментарий? Действие невозможно будет отменить`,
                    centered: true,
                    okText: 'Да',
                    cancelText: 'Нет',
                    onOk: () => {
                      deleteComment(item)
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
              description={item?.text}
              title={getDisplayProfileName(item?.author)}
            />
            <Flex gap="small">
              {item?.created_date_time}
              <Button
                icon={<LikeOutlined />}
                key={`list_item_like_${item?.id}`}>
                {getEntityEmojisCountFromState(
                  topicsEmojis,
                  item?.id ?? 0,
                  EMOJI.LIKE
                )}
              </Button>
              <Button
                icon={<DislikeOutlined />}
                key={`list_item_dislike_${item?.id}`}>
                {getEntityEmojisCountFromState(
                  topicsEmojis,
                  item?.id ?? 0,
                  EMOJI.LIKE
                )}
              </Button>
            </Flex>
          </List.Item>
        )}
      />

      {openCommentEdit && (
        <ForumCommentAddEdit
          oldText={text}
          topic_id={props.topic_id}
          onCreate={updateComment}
          open={openCommentEdit}
          onCancel={() => setOpenCommentEdit(false)}
          comment_id={commentId}
        />
      )}
    </div>
  )
}
