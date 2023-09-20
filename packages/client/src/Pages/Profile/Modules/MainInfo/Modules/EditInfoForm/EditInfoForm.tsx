import React from 'react'
import { Form, Button, Input } from 'antd'

type EditInfoFormValues = {
  login: string
  firstName: string
  secondName: string
  phoneNumber: string
  display_name: string
  email: string
}

const EditInfoForm = () => {
  const [form] = Form.useForm()

  const onSubmit = (values: EditInfoFormValues) => {
    console.log(values)
  }

  return (
    <Form form={form} name="changeinfo" layout="vertical" onFinish={onSubmit}>
      <Form.Item
        label="Логин"
        name="login"
        rules={[{ required: true, message: 'Введите свой логин!' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Отображаемое имя"
        name="display_name"
        rules={[{ required: true, message: 'Введите свое имя!' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Имя"
        name="firstName"
        rules={[{ required: true, message: 'Введите своё имя!' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Фамилия"
        name="secondName"
        rules={[{ required: true, message: 'Введите свою фамилию!' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Номер телефона"
        name="phoneNumber"
        rules={[{ required: true, message: 'Введите свой номер!' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Почта"
        name="email"
        rules={[{ required: true, message: 'Введите свою почту!' }]}>
        <Input type="email" />
      </Form.Item>
      <Form.Item>
        <Button size="large" type="primary" htmlType="submit">
          Сменить информацию
        </Button>
      </Form.Item>
    </Form>
  )
}

export default EditInfoForm
