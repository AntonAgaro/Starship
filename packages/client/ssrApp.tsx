import { renderToString } from 'react-dom/server'

// @ts-ignore
//нужно для ssr
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from './src/Redux/store'
import CheckUserContainer from './src/Containers/CheckUserContainer/CheckUserContainer'
import App from './src/App'
import { StaticRouter } from 'react-router-dom/server'

async function render(url: string) {
  const store = createStore()
  const preloadedState = store.getState()
  const renderResult = renderToString(
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
  return [preloadedState, renderResult]
}

export { render }
