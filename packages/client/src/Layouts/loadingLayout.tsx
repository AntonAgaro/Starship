import { Layout } from 'antd'
import { FC } from 'react'

const LoadingLayout: FC = () => {
  const { Footer, Header } = Layout

  return (
    <Layout>
      <Header>Loading...</Header>
      <Footer>Footer</Footer>
    </Layout>
  )
}

export default LoadingLayout
