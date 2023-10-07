import { FC } from 'react'
import styles from './gameEndModal.module.less'
import { Image } from 'antd'
import Close from '../../assets/images/close.png'

export type GameEndModalProps = {
  onStart: () => void
  onStop: () => void
  onExit: () => void
  onContinue: () => void
  isGameStopped: boolean
  isGameOver: boolean
  points: number
  width: string
  height: string
}

const GameEndModal: FC<GameEndModalProps> = ({
  onExit,
  onStart,
  onContinue,
  onStop,
  isGameStopped,
  isGameOver,
  points,
  width,
  height,
}) => {
  if (isGameOver) {
    return (
      <div className={styles.gameEndModal} style={{ width, height }}>
        <div className={styles.actions}>
          <div className={styles.resultText}>ВЫ НАБРАЛИ {points} ОЧКОВ</div>
          <div className={styles.actionText} onClick={onStart}>
            ИГРАТЬ ЕШЁ
          </div>
          <div className={styles.actionText} onClick={onExit}>
            ВЫЙТИ
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={
        isGameStopped ? styles.gameEndModalWithShadow : styles.gameEndModal
      }
      style={{ width, height }}>
      {!isGameStopped ? (
        <div className={styles.exit} onClick={onStop}>
          <Image src={Close} preview={false} />
        </div>
      ) : (
        <div className={styles.actions}>
          <div className={styles.actionText} onClick={onContinue}>
            ПРОДОЛЖИТЬ ИГРУ
          </div>
          <div className={styles.actionText} onClick={onExit}>
            ВЫЙТИ
          </div>
        </div>
      )}
    </div>
  )
}

export default GameEndModal
