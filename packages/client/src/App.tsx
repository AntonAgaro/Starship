import { BrowserRouter } from 'react-router-dom'
import './App.css'
import withBasicProviders from './Providers/withBasicProviders'
import withThemeProvider from './Providers/withThemeProvider'
import Router from './Routes/Router'
import { useEffect, useState } from 'react'
import LoadingLayout from './Layouts/loadingLayout'
import { useSelector } from 'react-redux'
import { RootState, store } from './Redux/store'
import { TProfileInfo } from './types'
import { asyncGetProfile } from './Redux/user/userState'

function App() {
  const currentProfile = useSelector(
    (rootState: RootState) => rootState.user
  ) as TProfileInfo

  const [loading, setLoading] = useState(true)

  const getProfile = async () => {
    await store.dispatch(asyncGetProfile())
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
