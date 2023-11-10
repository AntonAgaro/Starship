import { Avatar, Button, Flex, List, Modal, Pagination, Space } from 'antd'
import { LikeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../Hooks/reduxHooks'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import {
  TCommentInfo,
  TTopicInfo,
  TTopicListInfo,
} from '../../../Redux/forum/types'
import {
  getDisplayProfileName,
  getProfileAvatar,
  num_per_page,
} from '../../../Utils/helpers'
import React from 'react'
import {
  asyncCreateTopic,
  asyncDeleteTopic,
  asyncGetTopic,
  asyncUpdateTopic,
} from '../../../Redux/forum/currentTopicState'
import { TProfileInfo } from '../../../Redux/user/types'

import {
  asyncCreateComment,
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
  const [comment_id, setCommentId] = useState(0)
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
    }
    dispatch(asyncGetTopic({ page, topic_id: props.topic_id }))
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
        })
      )
      dispatch(asyncGetTopic({ page, topic_id: props.topic_id }))
    }
  }

  const updateComment = async (data: UpdateCommentValues) => {
    setOpenCommentEdit(false)
    if (comment_id != 0) {
      await dispatch(
        asyncUpdateComment({
          author_id: profile.id,
          comment_id,
          text: data.text,
          topic_id: props.topic_id,
        })
      )
    } else {
      await dispatch(
        asyncCreateComment({
          author_id: profile.id,
          text: data.text,
          topic_id: props.topic_id,
        })
      )
    }
    dispatch(asyncGetTopic({ page, topic_id: props.topic_id }))
  }

  return (
    <div>
      <Flex justify="space-around" align="center">
        <h1 style={{ color: 'white' }}>{currentTopic?.title}</h1>
        <Button
          onClick={() => {
            setText('')
            setCommentId(0)

            setOpenCommentEdit(true)
          }}>
          + Ответить
        </Button>
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
                onClick={() => {
                  setText(item ? item.text : '')
                  setCommentId(item ? item.id : -1)
                  setOpenCommentEdit(true)
                }}
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
          comment_id={comment_id}
        />
      )}
    </div>
  )
}
