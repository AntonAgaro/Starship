import React, { FC } from 'react'
import styles from './profile.module.less'
import { Typography } from 'antd'
import MainInfo from './Modules/MainInfo/MainInfo'
import PasswordChange from './Modules/PasswordChange/PasswordChange'

const { Title } = Typography

const Profile: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Title className={styles.title} level={2}>
          Профиль
        </Title>
        <div className={styles.blocks}>
          <MainInfo />
          <PasswordChange />
        </div>
      </div>
    </div>
  )
}

export default Profile
