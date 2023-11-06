import { Alert, Button, Card, Form, Input } from 'antd'
import { FC, useState } from 'react'
import './signUpForm.less'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { TSignUpData } from '../../Redux/user/types'
import { asyncSignUp } from '../../Redux/user/userState'
import {
  isValidEmail,
  isValidLogin,
  isValidName,
  isValidPassword,
  isValidPhone,
} from '../../Utils/validation'
import { useAppDispatch } from '../../Hooks/reduxHooks'

export const SignUpForm: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

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
        dispatch(asyncSignUp(values))
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
          rules={[
            () => ({
              validator(rule, value) {
                if (!value) {
                  return Promise.reject(
                    new Error('Это поле не может быть пустым.')
                  )
                }
                if (!isValidLogin(value)) {
                  return Promise.reject(
                    new Error(
                      'Логин должен быть от 3 до 20 символов и содержать только буквы, цифры, дефис и нижнее подчеркивание.'
                    )
                  )
                }
                return Promise.resolve()
              },
            }),
          ]}>
          <Input />
        </Form.Item>

        <Form.Item<TSignUpData>
          label="Пароль"
          name="password"
          rules={[
            () => ({
              validator(rule, value) {
                if (!value) {
                  return Promise.reject(
                    new Error('Это поле не может быть пустым.')
                  )
                }
                if (!isValidPassword(value)) {
                  return Promise.reject(
                    new Error(
                      'Пароль должен содержать от 8 до 40 символов и хотя бы одну заглавную букву и цифру.'
                    )
                  )
                }

                return Promise.resolve()
              },
            }),
          ]}>
          <Input.Password className="input-password" />
        </Form.Item>

        <Form.Item<TSignUpData>
          label="Повторите пароль"
          name="passwordRepeat"
          rules={[
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value) {
                  return Promise.reject(
                    new Error('Это поле не может быть пустым.')
                  )
                }
                if (getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Пароли не совпадают'))
              },
            }),
          ]}>
          <Input.Password className="input-password" />
        </Form.Item>

        <Form.Item<TSignUpData>
          label="Имя"
          name="first_name"
          rules={[
            () => ({
              validator(rule, value) {
                if (!value) {
                  return Promise.reject(
                    new Error('Это поле не может быть пустым.')
                  )
                }
                if (!isValidName(value)) {
                  return Promise.reject(
                    new Error(
                      'Имя должно содержать только буквы, дефисы и пробелы.'
                    )
                  )
                }
                return Promise.resolve()
              },
            }),
          ]}>
          <Input />
        </Form.Item>

        <Form.Item<TSignUpData>
          label="Фамилия"
          name="second_name"
          rules={[
            () => ({
              validator(rule, value) {
                if (!value) {
                  return Promise.reject(
                    new Error('Это поле не может быть пустым.')
                  )
                }
                if (!isValidName(value)) {
                  return Promise.reject(
                    new Error(
                      'Фамилия должно содержать только буквы, дефисы и пробелы.'
                    )
                  )
                }
                return Promise.resolve()
              },
            }),
          ]}>
          <Input />
        </Form.Item>

        <Form.Item<TSignUpData>
          label="Email"
          name="email"
          rules={[
            () => ({
              validator(rule, value) {
                if (!value) {
                  return Promise.reject(
                    new Error('Это поле не может быть пустым.')
                  )
                }
                if (!isValidEmail(value)) {
                  return Promise.reject(new Error('Неправильный формат email.'))
                }
                return Promise.resolve()
              },
            }),
          ]}>
          <Input />
        </Form.Item>

        <Form.Item<TSignUpData>
          label="Номер телефона"
          name="phone"
          rules={[
            () => ({
              validator(rule, value) {
                if (!value) {
                  return Promise.reject(
                    new Error('Это поле не может быть пустым.')
                  )
                }
                if (!isValidPhone(value)) {
                  return Promise.reject(
                    new Error(
                      'Неправильный формат номера телефона. Допустимы только цифры и символ + в начале.'
                    )
                  )
                }
                return Promise.resolve()
              },
            }),
          ]}>
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
