import { render } from '@testing-library/react'
import Canvas from './index'
import '@testing-library/jest-dom/jest-globals'
import { describe, expect } from '@jest/globals'

describe('Test Canvas', () => {
  test('Canvas correctly renders', () => {
    render(
      <Canvas
        width={1000}
        height={1000}
        callback={() => true}
        isPaused={false}
      />
    )
    const canvasEl = document.querySelector('canvas')
    expect(canvasEl).toBeInTheDocument()
  })
})
