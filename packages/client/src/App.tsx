import './App.css'
import withBasicProviders from './Providers/withBasicProviders'
import withThemeProvider from './Providers/withThemeProvider'
import Router from './Routes/Router'

function App() {
  return <Router />
}

export default withBasicProviders(withThemeProvider)(App)
