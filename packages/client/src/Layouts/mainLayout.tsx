import React, { FC } from 'react'
import { Layout } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'

const MainLayout: FC = () => (
  <Layout>
    <Header>Header</Header>
    <Content>
      <Outlet />
    </Content>
    <Footer>Footer</Footer>
  </Layout>
)

export default MainLayout
