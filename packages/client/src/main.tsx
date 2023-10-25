import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './Redux/store'
import CheckUserContainer from './Containers/CheckUserContainer/CheckUserContainer'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <CheckUserContainer>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CheckUserContainer>
    </Provider>
  </React.StrictMode>
)
