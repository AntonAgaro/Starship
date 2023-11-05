import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { AppState, createStore } from './Redux/store'
import CheckUserContainer from './Containers/CheckUserContainer/CheckUserContainer'
import { BrowserRouter } from 'react-router-dom'

declare const window: Window &
  typeof globalThis & {
    __PRELOADED_STATE__?: AppState
  }

const store = createStore(window.__PRELOADED_STATE__)

delete window.__PRELOADED_STATE__

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
