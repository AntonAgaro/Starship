import { render } from '@testing-library/react'
import Canvas from './index'
import { describe, expect } from '@jest/globals'
HTMLCanvasElement.prototype.getContext = jest.fn()
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
    expect(canvasEl).toBeInstanceOf(HTMLCanvasElement)
  })
})
