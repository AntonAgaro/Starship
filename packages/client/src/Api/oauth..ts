import axios from 'axios'
import { ApiBase } from './base'
import { TOAuthRequest, TOAuthServiceInfo } from '../types'

export class ApiOAuth extends ApiBase {
  constructor() {
    super('/oauth/yandex')
  }

  async login(data: { OauthSignInRequest: TOAuthRequest }) {
    const result = await this.axios.post('/', data)
    return result.data
  }

  async getServiceInfo(data: {
    redirect_uri: string
  }): Promise<TOAuthServiceInfo> {
    const result = await this.axios.post('/service-id', data)
    return result.data
  }
}

export default ApiOAuth
