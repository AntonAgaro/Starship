import React from 'react'
import { Form, Button, Input, message } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../../Redux/store'

import { asyncChangeProfile } from '../../../../../../Redux/user/userState'
import axios from 'axios'
import {
  TChangeProfile,
  TProfileInfo,
} from '../../../../../../Redux/user/types'
import {
  isValidEmail,
  isValidLogin,
  isValidName,
  isValidPhone,
} from '../../../../../../Utils/validation'
import { useAppDispatch } from '../../../../../../Hooks/reduxHooks'

const EditInfoForm = () => {
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const currentProfile = useSelector(
    (rootState: RootState) => rootState.user
  ) as TProfileInfo

  const onSubmit = (values: TChangeProfile) => {
    try {
      dispatch(asyncChangeProfile(values))
      messageApi.success('Данные изменены')
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e)

        const { reason } = e.response?.data ?? {}
        messageApi.error(`Ошибка изменения профиля: ${reason}`)
      }
    }
  }

  return (
    <>
      {contextHolder}
      <Form form={form} name="changeinfo" layout="vertical" onFinish={onSubmit}>
        <Form.Item
          label="Логин"
          name="login"
          initialValue={currentProfile.login}
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
        <Form.Item
          label="Отображаемое имя"
          name="display_name"
          initialValue={currentProfile.display_name}
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
        <Form.Item
          label="Имя"
          name="first_name"
          initialValue={currentProfile.first_name}
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
        <Form.Item
          label="Фамилия"
          name="second_name"
          initialValue={currentProfile.second_name}
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
        <Form.Item
          label="Номер телефона"
          name="phone"
          initialValue={currentProfile.phone}
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
        <Form.Item
          label="Почта"
          name="email"
          initialValue={currentProfile.email}
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
          <Input type="email" />
        </Form.Item>
        <Form.Item>
          <Button size="large" type="primary" htmlType="submit">
            Сменить информацию
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default EditInfoForm
