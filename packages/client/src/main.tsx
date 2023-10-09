import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './Redux/store'
import CheckUserContainer from './Containers/CheckUserContainer/CheckUserContainer'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <CheckUserContainer>
        <App />
      </CheckUserContainer>
    </Provider>
  </React.StrictMode>
)
