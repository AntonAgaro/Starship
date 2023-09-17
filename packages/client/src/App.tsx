import { useEffect } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Router from './Routes/Router'
import withBasicProviders from './Providers/withBasicProviders'
import withThemeProvider from './Providers/withThemeProvider'

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default withBasicProviders(withThemeProvider)(App)
