import { BrowserRouter } from 'react-router-dom'
import './App.css'
import withBasicProviders from './Providers/withBasicProviders'
import withThemeProvider from './Providers/withThemeProvider'
import Router from './Routes/Router'
import { useEffect, useState } from 'react'
import ApiAuth from './Api/auth'
import LoadingLayout from './Layouts/loadingLayout'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './Redux/store'
import { TProfileInfo } from './types'
import actions from './Redux/actions'

function App() {
  const auth = new ApiAuth()
  const currentProfile = useSelector(
    (rootState: RootState) => rootState.user
  ) as TProfileInfo
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)

  const getProfile = async (isLogout = false) => {
    if (isLogout) {
      dispatch(actions.userState.setCurrentProfile(null))
      return
    }
    try {
      const profile = await auth.getProfile()

      dispatch(actions.userState.setCurrentProfile(profile))
    } catch (e) {
      console.log(e)
      dispatch(actions.userState.setCurrentProfile(null))
    }
    setLoading(false)
  }

  useEffect(() => {
    getProfile()
  }, [])

  if (loading === true) {
    // This shows while the user is being fetched
    return <LoadingLayout />
  }

  return (
    <BrowserRouter>
      <Router isAuthenticated={currentProfile !== null} />
    </BrowserRouter>
  )
}

export default withBasicProviders(withThemeProvider)(App)
