import React, { FC } from 'react'
import styles from './error.module.less'

type TErrorCode = 404 | 500

type TErrorProps = {
  code: TErrorCode
}

const Error: FC<TErrorProps> = ({ code }) => {
  return (
    <section className={styles.container}>
      <span className={styles.codeMessage}>{code === 404 ? 404 : 500}</span>
      <span className={styles.message}>
        {code === 404 ? 'Not Found' : 'Internal Server Error'}
      </span>
    </section>
  )
}
export default Error
