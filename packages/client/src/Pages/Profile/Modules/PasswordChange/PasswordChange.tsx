import React from 'react'
import styles from './PasswordChange.module.less'
import { Typography } from 'antd'
import PasswordChangeForm from './Modules/PasswordChangeForm/PasswordChangeForm'

const { Title } = Typography

const PasswordChange = () => {
  return (
    <div className={styles.wrapper}>
      <Title level={3} className={styles.title}>
        Смена пароля
      </Title>
      <PasswordChangeForm />
    </div>
  )
}

export default PasswordChange
