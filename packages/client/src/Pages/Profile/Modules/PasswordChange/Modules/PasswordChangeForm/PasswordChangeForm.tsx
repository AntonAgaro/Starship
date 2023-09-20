import React from 'react'
import { Form, Button, Input } from 'antd'

type PasswordChangeFormValues = {
  oldPassword: string
  newPassword: string
  confirm: string
}

const PasswordChangeForm = () => {
  const [form] = Form.useForm()

  const onSubmit = (values: PasswordChangeFormValues) => {
    console.log(values)
  }

  return (
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
        <Input.Password placeholder="Введите пароль" />
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
        <Input.Password placeholder="Введите пароль" />
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
        <Input.Password placeholder="Повторите пароль" />
      </Form.Item>
      <Form.Item>
        <Button size="large" type="primary" htmlType="submit">
          Сменить пароль
        </Button>
      </Form.Item>
    </Form>
  )
}

export default PasswordChangeForm
