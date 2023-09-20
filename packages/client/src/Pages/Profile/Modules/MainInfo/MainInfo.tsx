import React from 'react'
import styles from './MainInfo.module.less'
import Title from 'antd/es/typography/Title'
import EditUserPhoto from './Modules/EditUserPhoto/EditUserPhoto'
import EditInfoForm from './Modules/EditInfoForm/EditInfoForm'

const MainInfo = () => {
  return (
    <div className={styles.wrapper}>
      <Title level={3} className={styles.title}>
        Основная информация
      </Title>
      <EditUserPhoto />
      <EditInfoForm />
    </div>
  )
}

export default MainInfo
