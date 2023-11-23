import React, { FC } from 'react'
import './topic.less'
import { ForumTopic } from '../../../Modules/Forum/ForumTopic/forumTopic'
import { useParams } from 'react-router-dom'

export const Topic: FC = () => {
  const { id } = useParams()

  return <ForumTopic topic_id={id ? Number.parseInt(id) : 0} />
}
