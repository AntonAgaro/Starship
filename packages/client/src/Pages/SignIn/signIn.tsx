import { Card, Layout } from 'antd'
import { Content, Footer } from 'antd/es/layout/layout'
import { FC } from 'react'
import { SignInForm } from '../../Modules/SignInForm'

export const SignIn: FC = () => {
  return (
    <Layout className="sign-in">
      <Content className="content">
        <SignInForm />
      </Content>
      <Footer className="footer">
        <p>Какой-то текст</p>
      </Footer>
    </Layout>
  )
}
