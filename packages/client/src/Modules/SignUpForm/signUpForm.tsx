import { Alert, Button, Card, Form, Input } from 'antd'
import { FC, useState } from 'react'
import './signUpForm.less'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { TSignUpData } from '../../Redux/user/types'
import { asyncSignUp } from '../../Redux/user/userState'
import { store } from '../../Redux/store'

export const SignUpForm: FC = () => {
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState('')

  const onFinish = async (values: TSignUpData) => {
    console.log('Success:', values)

    let errors = 0

    if (values.password != values.passwordRepeat) {
      errors++
      setErrorMessage('Пароли не совпадают')
    }

    if (errors == 0) {
      setErrorMessage('')
      try {
        store.dispatch(asyncSignUp(values))
        setTimeout(() => navigate('/'), 800)
      } catch (e) {
        if (axios.isAxiosError(e)) {
          const { reason } = e.response?.data ?? {}
          setErrorMessage(`Ошибка регистрации: ${reason}`)
        }
      }
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Card title="Зарегистрироваться" className="sign-up-form">
      <Form
        name="sign-up"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 30 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on">
        <Form.Item<TSignUpData>
          label="Логин"
          name="login"
          rules={[{ required: true, message: 'Введите свой логин!' }]}>
          <Input />
        </Form.Item>

        <Form.Item<TSignUpData>
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Введите свой пароль!' }]}>
          <Input.Password className="input-password" />
        </Form.Item>

        <Form.Item<TSignUpData>
          label="Повторите пароль"
          name="passwordRepeat"
          rules={[{ required: true, message: 'Повторите свой пароль!' }]}>
          <Input.Password className="input-password" />
        </Form.Item>

        <Form.Item<TSignUpData>
          label="Имя"
          name="first_name"
          rules={[{ required: true, message: 'Введите своё имя!' }]}>
          <Input />
        </Form.Item>

        <Form.Item<TSignUpData>
          label="Фамилия"
          name="second_name"
          rules={[{ required: true, message: 'Введите свою фамилию!' }]}>
          <Input />
        </Form.Item>

        <Form.Item<TSignUpData>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Введите свой email!' }]}>
          <Input />
        </Form.Item>

        <Form.Item<TSignUpData>
          label="Номер телефона"
          name="phone"
          rules={[{ required: true, message: 'Введите свой номер!' }]}>
          <Input />
        </Form.Item>
        {errorMessage ? (
          <Alert message={errorMessage} type="error" showIcon />
        ) : (
          ''
        )}
        <Form.Item wrapperCol={{ offset: 5, span: 30 }}>
          <Button type="link" onClick={() => navigate('/signin')}>
            Уже есть аккаунт? Войдите!
          </Button>
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
