import React, { FC, useState } from 'react'
import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import { RouteUrls } from '../Routes/Router'
import './mainLayouts.less'
const MainLayout: FC = () => {
  const { Content, Footer, Header } = Layout
  const urls = Object.values(RouteUrls).filter(item => {
    return isNaN(Number(item))
  })

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
    <Layout>
      <Header className="main-header">
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={onMenuClick}
          items={menuItems}
          selectedKeys={[current]}
        />
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  )
}

export default MainLayout
