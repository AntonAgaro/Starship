import { useEffect } from 'react'
import './App.css'
import withThemeProvider from './Providers/withThemeProvider'
import { Button } from 'antd'
import withBasicProviders from './Providers/withProviders'
import { SignIn } from './Pages/SignIn'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return <SignIn />
}

export default withBasicProviders(withThemeProvider)(App)
