import { Alert, Button, Card, Form, Input } from 'antd'
import './signInForm.less'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { asyncLogin } from '../../Redux/user/userState'
import { TLoginData } from '../../Redux/user/types'
import { OAuthComponent } from '../OAuth/OAuth'

export const SignInForm: FC = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const onFinish = async (values: TLoginData) => {
    console.log('Success:', values)

    try {
      dispatch(asyncLogin(values))

      setTimeout(() => navigate('/'), 800)
    } catch (e) {
      console.log(e)
      setErrorMessage('Не верный логин или пароль')
      return false
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Card title="Войти" className="sign-in-form">
      <Form
        name="sign-in"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 30 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on">
        <Form.Item<TLoginData>
          label="Логин"
          name="login"
          rules={[{ required: true, message: 'Введите свой логин!' }]}>
          <Input />
        </Form.Item>

        <Form.Item<TLoginData>
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Введите свой пароль!' }]}>
          <Input.Password className="input-password" />
        </Form.Item>
        {errorMessage ? (
          <Alert message={errorMessage} type="error" showIcon />
        ) : (
          ''
        )}

        <Form.Item wrapperCol={{ offset: 1, span: 30 }}>
          <Button type="link" onClick={() => navigate('/signup')}>
            Ещё нет аккаунта? Зарегистрируйтесь!
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 1, span: 30 }}>
          <OAuthComponent showButton />
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
