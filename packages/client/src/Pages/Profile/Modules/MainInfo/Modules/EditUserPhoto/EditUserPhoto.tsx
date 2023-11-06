import { Upload, message } from 'antd'
import React from 'react'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { PlusOutlined } from '@ant-design/icons'
import type { UploadChangeParam } from 'antd/es/upload'
import { RootState } from '../../../../../../Redux/store'
import { asyncGetProfile } from '../../../../../../Redux/user/userState'
import { useSelector } from 'react-redux'
import { TProfileInfo } from '../../../../../../types'
import { useAppDispatch } from '../../../../../../Hooks/reduxHooks'

const EditUserPhoto = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const currentProfile = useSelector(
    (rootState: RootState) => rootState.user
  ) as TProfileInfo
  const dispatch = useAppDispatch()

  const avatarUrl =
    'https://ya-praktikum.tech/api/v2/resources/' + currentProfile.avatar

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      messageApi.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      messageApi.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  const getProfile = async () => {
    await dispatch(asyncGetProfile())
  }

  const handleChange: UploadProps['onChange'] = () => {
    getProfile()
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <>
      {contextHolder}
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        method="put"
        withCredentials
        action="https://ya-praktikum.tech/api/v2/user/profile/avatar"
        beforeUpload={beforeUpload}
        onChange={handleChange}>
        {currentProfile.avatar ? (
          <img
            alt="avatar"
            style={{
              width: '100%',
              objectFit: 'contain',
              borderRadius: '60px',
            }}
            src={avatarUrl}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  )
}

export default EditUserPhoto
