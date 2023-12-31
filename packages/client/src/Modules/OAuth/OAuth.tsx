import { Button } from 'antd'
import { FC, useEffect } from 'react'
import { TOAuthServiceInfo } from '../../Redux/user/types'
import ApiOAuth from '../../Api/oauth.'
import { redirect_uri } from '../../Routes/Router'

type TOAuthProps = {
  showButton?: boolean
}
export const OAuthComponent: FC<TOAuthProps> = (props: TOAuthProps) => {
  const OAuthAPI = new ApiOAuth()

  const OAuth = async () => {
    const info: TOAuthServiceInfo = await OAuthAPI.getServiceInfo({
      redirect_uri,
    })
    const { service_id } = info
    if (service_id) {
      const href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${redirect_uri}`
      window.location.href = href
    }
  }

  return props.showButton ? (
    <Button type="link" onClick={OAuth}>
      Войти через аккаунт Яндекс
    </Button>
  ) : (
    <div></div>
  )
}
