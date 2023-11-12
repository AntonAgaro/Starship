import { Router } from 'express'
import ChosenTheme from '../controllers/ChosenTheme'
import Theme from '../controllers/Theme'

const router = Router()
const ROUTE = `/theme`

router.get(`${ROUTE}/available`, async (req, res) => {
  try {
    const availableThemes = await new Theme({}).getAllThemes()

    res.json(availableThemes)
  } catch (error) {
    res.json(error)
  }

  return
})

router.get(`${ROUTE}/token`, async (req, res) => {
  try {
    const { token } = req.query

    if (!token) return res.status(400).send('token query param is required')

    const chosenTheme = await new ChosenTheme({
      user_theme_token: token as unknown as string,
    }).getChosenThemeByThemeToken

    res.json(chosenTheme)
  } catch (error) {
    res.json(error)
  }

  return
})

router.get(`${ROUTE}/login`, async (req, res) => {
  try {
    const { login } = req.query

    if (!login) return res.status(400).send('login query param is required')

    const chosenTheme = await new ChosenTheme({
      user_login: login as unknown as string,
    }).getChosenThemeByThemeToken

    res.json(chosenTheme)
  } catch (error) {
    res.json(error)
  }

  return
})

router.put(`${ROUTE}/token`, async (req, res) => {
  try {
    const { token, theme_id } = req.body

    if (!(token && theme_id))
      return res.status(400).send('properties token and theme_id are required.')

    const updatedChosenTheme = await new ChosenTheme({
      user_theme_token: token,
      theme_id,
    }).updateChosenThemeWithThemeToken()

    res.json(updatedChosenTheme)
  } catch (error) {
    res.json(error)
  }

  return
})

router.put(`${ROUTE}/login`, async (req, res) => {
  try {
    const { login, theme_id } = req.body

    if (!(login && theme_id))
      return res.status(400).send('properties login and theme_id are required.')

    const updatedChosenTheme = await new ChosenTheme({
      user_login: login,
      theme_id,
    }).updateChosenThemeWithUserLogin()

    res.json(updatedChosenTheme)
  } catch (error) {
    res.json(error)
  }

  return
})

router.post('${ROUTE}/token', async (req, res) => {
  try {
    const { token, theme_id } = req.body

    if (!(token && theme_id)) {
      return res.status(400).send('properties token, theme_id are required.')
    }

    const chosenTheme = await new ChosenTheme({
      user_theme_token: token,
      theme_id,
    }).createChosenThemeWithThemeToken()

    res.json(chosenTheme)
  } catch (error) {
    res.json(error)
  }

  return
})

router.post('${ROUTE}/login', async (req, res) => {
  try {
    const { login, theme_id } = req.body

    if (!(login && theme_id)) {
      return res.status(400).send('properties login, theme_id are required.')
    }

    const chosenTheme = await new ChosenTheme({
      user_login: login,
      theme_id,
    }).createChosenThemeWithThemeToken()

    res.json(chosenTheme)
  } catch (error) {
    res.json(error)
  }

  return
})

router.delete('${ROUTE}/token', async (req, res) => {
  try {
    const { token } = req.body

    if (!token) return res.status(400).send('property token is required.')

    const chosenTheme = new ChosenTheme({ user_theme_token: token })
    const response = await chosenTheme.removeChosenThemeWithThemeToken()

    res.json(response)
  } catch (error) {
    res.json(error)
  }

  return
})

router.get(`${ROUTE}/login`, async (req, res) => {
  try {
    const availableThemes = await new Theme({}).getAllThemes()

    res.json(availableThemes)
  } catch (error) {
    res.json(error)
  }

  return
})
