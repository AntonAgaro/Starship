import React from 'react'
import { Form, Button, Input, message } from 'antd'
import { useSelector } from 'react-redux'
import { RootState, store } from '../../../../../../Redux/store'
import { TProfileInfo } from '../../../../../../types'
import { asyncChangeProfile } from '../../../../../../Redux/user/userState'
import axios from 'axios'
import { TChangeProfile } from '../../../../../../Redux/user/types'

const EditInfoForm = () => {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const currentProfile = useSelector(
    (rootState: RootState) => rootState.user
  ) as TProfileInfo

  const onSubmit = (values: TChangeProfile) => {
    try {
      store.dispatch(asyncChangeProfile(values))
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
          rules={[{ required: true, message: 'Введите свой логин!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Отображаемое имя"
          name="display_name"
          initialValue={currentProfile.display_name}
          rules={[{ required: true, message: 'Введите свое имя!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Имя"
          name="first_name"
          initialValue={currentProfile.first_name}
          rules={[{ required: true, message: 'Введите своё имя!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Фамилия"
          name="second_name"
          initialValue={currentProfile.second_name}
          rules={[{ required: true, message: 'Введите свою фамилию!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Номер телефона"
          name="phone"
          initialValue={currentProfile.phone}
          rules={[{ required: true, message: 'Введите свой номер!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Почта"
          name="email"
          initialValue={currentProfile.email}
          rules={[{ required: true, message: 'Введите свою почту!' }]}>
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
