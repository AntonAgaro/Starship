import { Layout } from 'antd'
import { FC } from 'react'

const LoadingLayout: FC = () => {
  const { Header } = Layout

  return (
    <Layout>
      <Header>Loading...</Header>
    </Layout>
  )
}

export default LoadingLayout
