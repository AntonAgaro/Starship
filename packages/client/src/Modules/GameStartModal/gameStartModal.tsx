import { FC } from 'react'
import styles from './gameStartModal.module.less'

export type GameStartModalProps = {
  onStart: () => void
  width: string
  height: string
}

const GameStartModal: FC<GameStartModalProps> = ({
  onStart,
  width,
  height,
}) => {
  return (
    <div className={styles.gameStartModal} style={{ width, height }}>
      <div className={styles.controls}>
        <div>Управление кораблём: &larr; &uarr; &rarr; &darr;</div>
        <div>Выстрел: Пробел</div>
      </div>
      <div className={'НАЧАТЬ ИГРУ'} onClick={onStart}>
        НАЧАТЬ ИГРУ
      </div>
    </div>
  )
}
export default GameStartModal
