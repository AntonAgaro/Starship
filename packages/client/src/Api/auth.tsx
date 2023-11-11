import axios from 'axios'
import { ApiBase } from './base'
import { TProfileInfo } from '../Redux/user/types'

export class ApiAuth extends ApiBase {
  constructor() {
    super('/auth')
  }
  async login(data: { login: string; password: string }) {
    try {
      const userResponse = await this.getProfile()

      if (userResponse.first_name) {
        await this.logout()
      }
    } catch (e) {
      console.log(e)
    }

    return await this.signin(data)
  }

  private async signin(data: { login: string; password: string }) {
    const result = await this.axios.post(`/signin`, data)
    return result.data
  }

  async signup(data: {
    first_name: string
    second_name: string
    login: string
    email: string
    password: string
    phone: string
  }) {
    const result = await this.axios.post('/signup', data)
    return result.data
  }

  async getProfile(): Promise<TProfileInfo> {
    const result = await this.axios.get('/user')
    return result.data
  }

  async logout() {
    const result = await this.axios.post('/logout')
    return result.data
  }
}

export default ApiAuth
