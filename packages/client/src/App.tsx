import { BrowserRouter } from 'react-router-dom'
import './App.css'
import withBasicProviders from './Providers/withBasicProviders'
import withThemeProvider from './Providers/withThemeProvider'
import Router from './Routes/Router'

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default withBasicProviders(withThemeProvider)(App)
