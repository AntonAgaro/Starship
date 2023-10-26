import axios from 'axios'
import { ApiBase } from './base'
import { TOAuthRequest, TOAuthServiceInfo } from '../Redux/user/types'

export class ApiOAuth extends ApiBase {
  constructor() {
    super('/oauth/yandex')
  }

  async login(data: TOAuthRequest) {
    const result = await this.axios.post('', data)
    return result.data
  }

  async getServiceInfo(data: {
    redirect_uri: string
  }): Promise<TOAuthServiceInfo> {
    const result = await this.axios.get(
      '/service-id/?redirect_uri=' + data.redirect_uri
    )
    return result.data
  }
}

export default ApiOAuth
