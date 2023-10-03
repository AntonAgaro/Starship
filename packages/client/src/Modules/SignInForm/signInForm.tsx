import { Alert, Button, Card, Form, Input } from 'antd'
import './signInForm.less'
import { FC, useState } from 'react'
import ApiAuth from '../../Api/auth'
import { useNavigate } from 'react-router-dom'
import actions from '../../Redux/actions'
import { useDispatch } from 'react-redux'

type FieldType = {
  login: string
  password: string
}

export const SignInForm: FC = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onFinish = async (values: FieldType) => {
    console.log('Success:', values)
    const auth = new ApiAuth()
    try {
      await auth.login(values)
      setErrorMessage('')

      const profile = await auth.getProfile()
      dispatch(actions.userState.setCurrentProfile(profile))

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
        <Form.Item<FieldType>
          label="Логин"
          name="login"
          rules={[{ required: true, message: 'Введите свой логин!' }]}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
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

        <Form.Item wrapperCol={{ offset: 9, span: 20 }}>
          <Button type="default" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
