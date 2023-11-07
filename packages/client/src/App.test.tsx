import { render, screen } from '@testing-library/react'
import App from './App'
import { createStore } from './Redux/store'
import { Provider } from 'react-redux'
import CheckUserContainer from './Containers/CheckUserContainer/CheckUserContainer'

const appContentLoading = 'Загрузка...'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  const store = createStore()
  render(
    <Provider store={store}>
      <CheckUserContainer>
        <App />
      </CheckUserContainer>
    </Provider>
  )
  expect(screen.getByText(appContentLoading)).toBeDefined()
})
