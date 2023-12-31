import { Avatar, Button, Flex, List, Modal, Pagination, Space } from 'antd'
import { LikeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { FC, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../Hooks/reduxHooks'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { TCommentInfo, TTopicInfo } from '../../../Redux/forum/types'
import {
  getDisplayProfileName,
  getProfileAvatar,
  num_per_page,
} from '../../../Utils/helpers'
import React from 'react'
import { asyncGetTopic } from '../../../Redux/forum/currentTopicState'
import { TProfileInfo } from '../../../Redux/user/types'

import {
  asyncDeleteComment,
  asyncUpdateComment,
} from '../../../Redux/forum/currentCommentState'
import { RouteUrls } from '../../../Routes/Router'
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
              <IconText
                icon={LikeOutlined}
                text=""
                key="list-vertical-like-o"
              />
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
