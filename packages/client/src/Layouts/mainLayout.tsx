import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import { FC, SetStateAction, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { RouteUrls } from '../Routes/Router'
import './mainLayouts.less'
import UserInfo from '../Components/userInfo/userInfo'
import { TProfileInfo } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Redux/store'

const MainLayout: FC = () => {
  const currentProfile = useSelector(
    (rootState: RootState) => rootState.user
  ) as TProfileInfo

  const urls = Object.values(RouteUrls).filter(item => {
    return isNaN(Number(item))
  })
  const { Content, Footer, Header } = Layout
  const [current, setCurrent] = useState('mail')
  const navigate = useNavigate()

  const onMenuClick: MenuProps['onClick'] = e => {
    console.log('click ', e)
    navigate(e.key)
    setCurrent(e.key)
  }
  const menuItems: MenuProps['items'] = []

  urls.map((url: string) => {
    menuItems.push({
      key: url,
      label: `${url}`,
    })
  })

  return (
    <Layout className="main">
      <Header className="main-header">
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={onMenuClick}
          items={menuItems}
          selectedKeys={[current]}
        />
        {currentProfile && <UserInfo profile={currentProfile} />}
      </Header>
      <Content className="main-content">
        <Outlet />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  )
}

export default MainLayout
