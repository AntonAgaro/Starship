import bgImg from '../../../assets/images/background.jpeg'
import playerImg from '../../../assets/images/player-ship.png'
import ImagesPreloader from './ImagesPreloader'
import { describe, expect, test } from '@jest/globals'

describe('Test ImagePreloader class', () => {
  test('Correct getImages', () => {
    const loader = new ImagesPreloader({
      urls: [bgImg, playerImg],
      onReadyCallbacks: [],
    })
    expect(loader.getImg(bgImg)).toBeInstanceOf(HTMLImageElement)
  })

  test('Correct call after load callback images', () => {
    let res = 2
    new ImagesPreloader({
      urls: [bgImg, playerImg],
      onReadyCallbacks: [
        () => {
          res += 8
          expect(res).toBe(10)
        },
      ],
    })
  })
})
