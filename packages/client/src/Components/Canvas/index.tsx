import React, { useRef, useEffect, MutableRefObject } from 'react'

interface CanvasProps {
  width: number
  height: number
  callback: (ctx: CanvasRenderingContext2D) => void
  isPaused: boolean
}
const Canvas = ({ width, height, callback, isPaused }: CanvasProps) => {
  const canvas: MutableRefObject<HTMLCanvasElement | null> = useRef(null)
  useEffect(() => {
    if (!canvas.current || isPaused) {
      return
    }
    const context = canvas.current.getContext('2d') as CanvasRenderingContext2D
    callback(context)
  }, [isPaused, callback])
  return <canvas width={width} height={height} ref={canvas}></canvas>
}

export default Canvas
