import { Router } from 'express'
import Comment from '../controllers/Comment'
import removeSpecialCharacters from '../utils/removeSpecialCharacters'

const router = Router()
const ROUTE = `/forum/comment`

router.get(ROUTE, async (req, res) => {
  try {
    const { comment_id } = req.query

    if (!comment_id) return res.status(400).send('Comment_id is required')

    const comment = await new Comment({
      id: comment_id as unknown as number,
    }).getComment()

    res.json(comment)
  } catch (error) {
    res.json(error)
  }

  return
})

router.post(ROUTE, async (req, res) => {
  try {
    const { topic_id, author_id, text } = req.body

    if (!(topic_id && author_id && text)) {
      return res
        .status(400)
        .send('Properties topic_id, author_id and text are required.')
    }

    const comment = await new Comment({
      topic_id,
      author_id,
      text: removeSpecialCharacters(text),
    }).createComment()

    res.json(comment)
  } catch (error) {
    res.json(error)
  }

  return
})

router.put(ROUTE, async (req, res) => {
  try {
    const { comment_id, text } = req.body

    if (!(text && comment_id))
      return res
        .status(400)
        .send('Properties text and comment_id are required.')

    const updatedComment = await new Comment({
      id: comment_id,
    }).updateComment(text)

    res.json(updatedComment)
  } catch (error) {
    res.json(error)
  }

  return
})

router.delete(ROUTE, async (req, res) => {
  try {
    const { id } = req.body

    if (!id) return res.status(400).send('Property id is required.')

    const comment = new Comment({ id })
    const response = await comment.remove()

    res.json(response)
  } catch (error) {
    res.json(error)
  }

  return
})

export default router
