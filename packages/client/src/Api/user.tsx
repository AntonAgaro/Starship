import { ApiBase } from './base'

export class UserApi extends ApiBase {
  constructor() {
    super('/user')
  }
  async changeInfo(data: {
    first_name: string
    second_name: string
    login: string
    email: string
    phone: string
    display_name: string
  }) {
    const result = await this.axios.put('/profile', data)
    return result.data
  }

  async changePassword(data: { newPassword: string; oldPassword: string }) {
    const result = await this.axios.put('/password', data)
    return result.data
  }
}

export default UserApi
