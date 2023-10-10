import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import styles from './Loading.module.less'
import { children } from '../../types'

type iLoading = {
  children?: children | children[]
}

const Loading = (props: iLoading) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>{props.children}</div>
      <div className={styles.spinner}>
        <LoadingOutlined />
      </div>
    </div>
  )
}

export default Loading
