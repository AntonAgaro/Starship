import { Router } from 'express'
import Topic from '../controllers/Topic'
import removeSpecialCharacters from '../utils/removeSpecialCharacters'

const router = Router()
const LOCAL_URL = `/forum/topic`

router.get(LOCAL_URL, async (req, res) => {
  const id: number | unknown = req.query?.id

  if (!id) return res.status(400).send('Param id is required.')

  const topic = await new Topic(id as number).getTopic()

  res.json({
    topic,
  })

  return
})

router.get(`forum/topics`, async (_req, res) => {
  const topics = await new Topic(null).getTopics()

  res.json(topics)
})

router.post(LOCAL_URL, async (req, res) => {
  const { title, author_id } = req.body

  if (!(title && author_id)) {
    return res.status(400).send('Properties title, author_id are required.')
  }

  const topic = await new Topic(null).createTopic(
    removeSpecialCharacters(title),
    Number(author_id)
  )

  res.json({
    topic,
  })

  return
})

router.put(LOCAL_URL, async (req, res) => {
  try {
    const { topic_id, title } = req.body

    if (!(title && topic_id))
      return res.status(400).send('Properties title and topic_id are required.')

    const updatedTopic = await new Topic({
      id: topic_id,
    }).updateTopic(title)

    res.json(updatedTopic)
  } catch (error) {
    res.json(error)
  }

  return
})

router.delete(LOCAL_URL, async (req, res) => {
  try {
    const { id } = req.body

    if (!id) return res.status(400).send('Param id is required.')

    const topic = new Topic(id)

    if (!topic) return res.json("Topic wasn't found.")

    await topic.remove()
    res.json('OK')
  } catch (error) {
    res.json(error)
  }

  return
})

export default router
