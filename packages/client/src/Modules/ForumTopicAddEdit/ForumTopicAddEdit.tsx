import React, { useEffect, useRef } from 'react'
import { Form, Input, InputRef, Modal } from 'antd'

export interface UpdateTopicValues {
  title: string
}

interface TopicAddEditFormProps {
  oldTitle: string
  topic_id?: number
  open: boolean
  onCreate: (values: UpdateTopicValues) => void
  onCancel: () => void
}

const ForumTopicAddEdit: React.FC<TopicAddEditFormProps> = props => {
  const [form] = Form.useForm()

  const myRef = useRef<InputRef>(null)

  /*
   *  This is the main different
   */
  useEffect(() => {
    if (myRef && myRef.current) {
      const input = myRef.current as InputRef
      input.focus() // TODO: так и не добился автофокуса при показе модала, не работает автофокус
    }
  })

  return (
    <Modal
      getContainer="app"
      open={props.open}
      title={
        props.topic_id
          ? `Изменить название обсуждения "${props.oldTitle}"`
          : `Новое обсудение`
      }
      okText="Сохранить"
      cancelText="Отмена"
      centered
      onCancel={props.onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields()
            props.onCreate(values)
          })
          .catch(info => {
            console.log('Validate Failed:', info)
          })
      }}>
      <Form
        form={form}
        layout="vertical"
        name="form_topic_add_edit"
        initialValues={{ modifier: 'public', title: props.oldTitle }}>
        <Form.Item
          name="title"
          label="Название обсуждения"
          rules={[{ required: true, message: 'Пожалуйста введите название!' }]}>
          <Input ref={myRef} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default ForumTopicAddEdit
