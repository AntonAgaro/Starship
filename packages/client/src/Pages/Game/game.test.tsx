import GamePage from './game'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/jest-globals'
import { beforeEach, describe, expect, test } from '@jest/globals'
import { BrowserRouter } from 'react-router-dom'

describe('Test GamePage', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <GamePage />
      </BrowserRouter>
    )
  })

  test('Start game button should be on page', () => {
    expect(screen.getByText('НАЧАТЬ ИГРУ')).toBeInTheDocument()
  })

  test('Start / Stop game functions', async () => {
    await userEvent.click(screen.getByText('НАЧАТЬ ИГРУ'))

    const canvas = document.querySelector('canvas')
    expect(canvas).toBeInTheDocument()

    const closeBtn = document.querySelector('#close-game-btn')
    expect(closeBtn).toBeInTheDocument()

    await userEvent.click(closeBtn as HTMLElement)

    expect(screen.getByText('ВЫЙТИ')).toBeInTheDocument()
    expect(screen.getByText('ПРОДОЛЖИТЬ ИГРУ')).toBeInTheDocument()
  })
})
