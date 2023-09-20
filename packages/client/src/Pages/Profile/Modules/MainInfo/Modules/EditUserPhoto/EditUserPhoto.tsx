import { Upload } from 'antd'
import React from 'react'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import type { UploadChangeParam } from 'antd/es/upload'

const EditUserPhoto = () => {
  const beforeUpload = (file: RcFile) => {
    console.log('before')
    console.log(file)
  }

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    console.log(info)
    console.log('handle')
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <Upload
      name="avatar"
      listType="picture-circle"
      className="avatar-uploader"
      showUploadList={false}
      action="https://ya-praktikum.tech/api/v2/user/profile/avatar"
      beforeUpload={beforeUpload}
      onChange={handleChange}>
      {uploadButton}
    </Upload>
  )
}

export default EditUserPhoto
