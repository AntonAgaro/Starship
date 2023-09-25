import { BrowserRouter } from 'react-router-dom'
import './App.css'
import withBasicProviders from './Providers/withBasicProviders'
import withThemeProvider from './Providers/withThemeProvider'
import Router from './Routes/Router'
import { useEffect, useState } from 'react'
import { bus } from './Utils/eventBus'
import ApiAuth from './Api/auth'
import { TProfileInfo } from './types'

function App() {
  const auth = new ApiAuth()
  const [currentProfile, setCurrentProfile] = useState<TProfileInfo | null>(
    null
  )
  const [loading, setLoading] = useState(true)

  const getProfile = async (isLogout = false) => {
    if (isLogout) {
      setCurrentProfile(null)
      return
    }
    try {
      const profile = await auth.getProfile()

      setCurrentProfile(profile)
      bus.emit('profileChanged', profile)
    } catch (e) {
      console.log(e)
      setCurrentProfile(null)
      bus.emit('profileChanged', null)
    }
    setLoading(false)
  }

  useEffect(() => {
    getProfile()
    bus.on('isAuthenticated', getProfile)
    return () => {
      bus.off('isAuthenticated', getProfile)
    }
  }, [])
  if (loading === true) {
    // This shows while the user is being fetched
    return <> Loading... </>
  }
  return (
    <BrowserRouter>
      <Router isAuthenticated={currentProfile !== null} />
    </BrowserRouter>
  )
}

export default withBasicProviders(withThemeProvider)(App)
