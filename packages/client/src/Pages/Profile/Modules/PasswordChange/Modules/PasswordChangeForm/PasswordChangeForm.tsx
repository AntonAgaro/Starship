import React from 'react'
import { Form, Button, Input, message } from 'antd'
import { TChangePassword } from '../../../../../../Redux/user/types'
import axios from 'axios'
import UserApi from '../../../../../../Api/user'

type PasswordChangeFormValues = {
  oldPassword: string
  newPassword: string
  confirm: string
}

const userApi = new UserApi()

const PasswordChangeForm = () => {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

  const onSubmit = async (values: PasswordChangeFormValues) => {
    const data: TChangePassword = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    }

    try {
      await await userApi.changePassword(data)
      messageApi.success('Пароль изменен')
      form.resetFields()
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { reason } = e.response?.data ?? {}
        messageApi.error(`Ошибка изменения пароля: ${reason}`)
      }
    }
  }

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        name="changepassword"
        layout="vertical"
        onFinish={onSubmit}>
        <Form.Item
          name="oldPassword"
          label="Текущий пароль"
          rules={[
            {
              required: true,
              message: 'Это поле не может быть пустым.',
            },
          ]}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="Новый пароль"
          dependencies={['oldPassword']}
          rules={[
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value) {
                  return Promise.reject(
                    new Error('Это поле не может быть пустым.')
                  )
                }
                if (getFieldValue('oldPassword') === value) {
                  return Promise.reject(
                    new Error('Текущий и новый пароли совпадают')
                  )
                }
                return Promise.resolve()
              },
            }),
          ]}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Повторите новый пароль"
          dependencies={['newPassword']}
          rules={[
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value) {
                  return Promise.reject(
                    new Error('Это поле не может быть пустым.')
                  )
                }
                if (getFieldValue('newPassword') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Пароли не совпадают'))
              },
            }),
          ]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button size="large" type="primary" htmlType="submit">
            Сменить пароль
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default PasswordChangeForm
