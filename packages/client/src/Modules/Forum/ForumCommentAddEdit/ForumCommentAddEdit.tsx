import React, { useEffect, useRef } from 'react'
import { Form, Input, InputRef, Modal } from 'antd'

export interface UpdateCommentValues {
  text: string
}

interface CommentAddEditFormProps {
  oldText: string
  topic_id?: number
  comment_id: number
  open: boolean
  onCreate: (values: UpdateCommentValues) => void
  onCancel: () => void
}
const { TextArea } = Input

const ForumCommentAddEdit: React.FC<CommentAddEditFormProps> = props => {
  const [form] = Form.useForm()

  const myRef = useRef<InputRef>(null)

  useEffect(() => {
    if (myRef && myRef.current) {
      const input = myRef.current as InputRef
      input.focus()
    }
  }, [])

  return (
    <Modal
      getContainer="app"
      open={props.open}
      title={props.topic_id ? `Изменить комментарий` : `Новое коментарий`}
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
        name="form_comment_add_edit"
        initialValues={{ modifier: 'public', text: props.oldText }}>
        <Form.Item
          name="text"
          label="Текст комментарий"
          rules={[{ required: true, message: 'Пожалуйста текст комментария' }]}>
          <TextArea rows={15} ref={myRef} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default ForumCommentAddEdit
