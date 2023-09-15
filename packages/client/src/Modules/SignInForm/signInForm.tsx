import { Button, Card, Form, Input } from 'antd'
import Link from 'antd/es/typography/Link'
import { FC } from 'react'

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

type FieldType = {
  username?: string
  password?: string
}

export const SignInForm: FC = () => {
  return (
    <Card title="Войти" className="sign-in-form">
      <Form
        name="sign-in"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 30 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on">
        <Form.Item<FieldType>
          label="Логин"
          name="username"
          rules={[{ required: true, message: 'Введите свой логин!' }]}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Введите свой пароль!' }]}>
          <Input.Password className="input-password" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 1, span: 30 }}>
          <Button type="link">Ещё нет аккаунта? Зарегистрируйтесь!</Button>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 9, span: 20 }}>
          <Button type="default" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
