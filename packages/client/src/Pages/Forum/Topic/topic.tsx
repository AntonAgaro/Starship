import React, { FC } from 'react'
import './topic.less'
import { ForumTopic } from '../../../Modules/Forum/ForumTopic/forumTopic'
import { useParams } from 'react-router-dom'

const { id } = useParams()

const Topic: FC = () => <ForumTopic topic_id={id ? Number.parseInt(id) : 0} />
export default Topic
