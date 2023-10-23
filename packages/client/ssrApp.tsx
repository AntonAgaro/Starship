import { renderToString } from 'react-dom/server'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './src/Redux/store'
import CheckUserContainer from './src/Containers/CheckUserContainer/CheckUserContainer'
import App from './src/App'
import { StaticRouter } from 'react-router-dom/server'

export default function render(url: string) {
  renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <CheckUserContainer>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </CheckUserContainer>
      </Provider>
    </React.StrictMode>
  )
}
