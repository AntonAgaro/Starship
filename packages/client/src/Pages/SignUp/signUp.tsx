import { Layout } from 'antd'
import { Content, Footer } from 'antd/es/layout/layout'
import { FC } from 'react'
import { SignUpForm } from '../../Modules/SignUpForm'
import './signUp.less'

export const SignUp: FC = () => {
  return (
    <Layout className="sign-up">
      <Content className="content">
        <SignUpForm />
      </Content>
      <Footer className="footer">
        <p>Какой-то текст</p>
      </Footer>
    </Layout>
  )
}
