import { render, screen } from '@testing-library/react'
import App from './App'
import { store } from './Redux/store'
import { Provider } from 'react-redux'

const appContentFooter = 'Footer'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  expect(screen.getByText(appContentFooter)).toBeDefined()
})
