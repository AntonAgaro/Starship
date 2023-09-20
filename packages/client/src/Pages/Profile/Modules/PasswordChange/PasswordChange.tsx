import React from 'react'
import styles from './PasswordChange.module.less'
import Title from 'antd/es/typography/Title'
import PasswordChangeForm from './Modules/PasswordChangeForm/PasswordChangeForm'

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
