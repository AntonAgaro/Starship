import React, { useRef, useEffect, MutableRefObject, FC } from 'react'

interface CanvasProps {
  width: number
  height: number
  callback: (ctx: CanvasRenderingContext2D) => void
}
const Canvas = ({ width, height, callback }: CanvasProps) => {
  const canvas: MutableRefObject<HTMLCanvasElement | null> = useRef(null)
  useEffect(() => {
    if (!canvas.current) {
      return
    }
    const context = canvas.current.getContext('2d') as CanvasRenderingContext2D
    callback(context)
  })
  return <canvas width={width} height={height} ref={canvas}></canvas>
}

export default Canvas
