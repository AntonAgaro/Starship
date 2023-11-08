import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, Divider, Dropdown, MenuProps } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { asyncLogout } from '../../Redux/user/userState'
import { RouteUrls } from '../../Routes/Router'
import { useAppDispatch } from '../../Hooks/reduxHooks'
import { TProfileInfo } from '../../Redux/user/types'
import { getDisplayProfileName, getProfileAvatar } from '../../Utils/helpers'

type TUserInfoProps = {
  profile: TProfileInfo
}
const UserInfo: FC<TUserInfoProps> = (props: { profile: TProfileInfo }) => {
  const { profile } = props

  const name = getDisplayProfileName(profile)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: name,
      icon: <UserOutlined rev={undefined} />,
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
          await dispatch(asyncLogout())
        } catch (e) {
          console.log(e)
        } finally {
          navigate(RouteUrls.signIn)
        }
      },
    },
  ]

  return (
    <Dropdown menu={{ items }}>
      <a onClick={e => e.preventDefault()}>
        <Avatar
          src={getProfileAvatar(profile)}
          style={{ backgroundColor: '#87d068', marginLeft: '25px' }}
          icon={<UserOutlined rev={undefined} />}
        />
      </a>
    </Dropdown>
  )
}

export default UserInfo
