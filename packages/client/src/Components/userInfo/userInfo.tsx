import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { TProfileInfo } from '../../types'
import { Avatar, Divider, Dropdown, MenuProps } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { asyncLogout } from '../../Redux/user/userState'
import { store } from '../../Redux/store'

type TUserInfoProps = {
  profile: TProfileInfo
}
const UserInfo: FC<TUserInfoProps> = (props: { profile: TProfileInfo }) => {
  const { profile } = props

  const name =
    (profile?.display_name ? profile.display_name : profile.login) +
    (' ' + profile?.first_name ?? '') +
    (' ' + profile?.second_name ?? '')

  const navigate = useNavigate()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: name,
      icon: <UserOutlined />,
      onClick: () => navigate('/profile'),
    },
    {
      key: '2',
      label: <Divider />,
      disabled: true,
    },

    {
      key: '4',
      danger: true,
      label: 'Выйти',
      onClick: async () => {
        try {
          store.dispatch(asyncLogout())
        } catch (e) {
          console.log(e)
        }
      },
    },
  ]

  return (
    <Dropdown menu={{ items }}>
      <a onClick={e => e.preventDefault()}>
        <Avatar
          src={
            profile.avatar
              ? `https://ya-praktikum.tech/api/v2/resources${profile.avatar}`
              : ''
          }
          style={{ backgroundColor: '#87d068', marginLeft: '25px' }}
          icon={<UserOutlined />}
        />
      </a>
    </Dropdown>
  )
}

export default UserInfo
