import { Button, Card, Form, Input } from 'antd'
import { FC } from 'react'
import './signUpForm.less'

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

type FieldType = {
  username?: string
  password?: string
  passwordRepeat?: string
  firstName?: string
  secondName?: string
  phoneNumber?: string
}

export const SignUpForm: FC = () => {
  return (
    <Card title="Зарегистрироваться" className="sign-up-form">
      <Form
        name="sign-up"
        labelCol={{ span: 10 }}
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

        <Form.Item<FieldType>
          label="Повторите пароль"
          name="passwordRepeat"
          rules={[{ required: true, message: 'Повторите свой пароль!' }]}>
          <Input.Password className="input-password" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Имя"
          name="firstName"
          rules={[{ required: true, message: 'Введите своё имя!' }]}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Фамилия"
          name="secondName"
          rules={[{ required: true, message: 'Введите свою фамилию!' }]}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Номер телефона"
          name="phoneNumber"
          rules={[{ required: true, message: 'Введите свой номер!' }]}>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5, span: 30 }}>
          <Button type="link">Уже есть аккаунт? Войдите!</Button>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 9, span: 20 }}>
          <Button type="default" htmlType="submit">
            Регистрация
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
