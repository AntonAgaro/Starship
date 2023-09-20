import App from './App'
import { render, screen } from '@testing-library/react'

const appContentFooter = 'Footer'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  render(<App />)
  expect(screen.getByText(appContentFooter)).toBeDefined()
})
