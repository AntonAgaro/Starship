import { Router } from 'express'
import Theme from '../controllers/Theme'

const router = Router()
const ROUTE = `/theme`

router.get(`${ROUTE}/token`, async (req, res) => {
  try {
    const { token } = req.query

    if (!token) return res.status(400).send('token query param is required')

    const chosenTheme = await Theme.getThemeByThemeToken(token as string)

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

    const chosenTheme = await Theme.getThemeByUserLogin(login as string)

    res.json(chosenTheme)
  } catch (error) {
    res.json(error)
  }

  return
})

router.put(`${ROUTE}/token`, async (req, res) => {
  try {
    const { token, theme } = req.body

    if (!(token && theme))
      return res.status(400).send('properties token and theme are required.')

    const updatedChosenTheme = await Theme.updateThemeWithThemeToken(
      theme,
      token
    )

    res.json(updatedChosenTheme)
  } catch (error) {
    res.json(error)
  }

  return
})

router.put(`${ROUTE}/login`, async (req, res) => {
  try {
    const { login, theme } = req.body

    if (!(login && theme))
      return res.status(400).send('properties login and theme are required.')

    const updatedChosenTheme = await Theme.updateThemeWithUserLogin(
      theme,
      login
    )

    res.json(updatedChosenTheme)
  } catch (error) {
    res.json(error)
  }

  return
})

router.post('${ROUTE}/token', async (req, res) => {
  try {
    const { token, theme } = req.body

    if (!(token && theme)) {
      return res.status(400).send('properties token, theme are required.')
    }

    const chosenTheme = await Theme.createThemeWithThemeToken(theme, token)

    res.status(201).json(chosenTheme)
  } catch (error) {
    res.json(error)
  }

  return
})

router.post('${ROUTE}/login', async (req, res) => {
  try {
    const { login, theme } = req.body

    if (!(login && theme)) {
      return res.status(400).send('properties login, theme are required.')
    }

    const chosenTheme = await Theme.createThemeWithUserLogin(theme, login)

    res.status(201).json(chosenTheme)
  } catch (error) {
    res.json(error)
  }

  return
})

router.delete('${ROUTE}/token', async (req, res) => {
  try {
    const { token } = req.body

    if (!token) return res.status(400).send('property token is required.')

    const response = await Theme.removeThemeWithThemeToken(token)

    res.json(response)
  } catch (error) {
    res.json(error)
  }

  return
})
