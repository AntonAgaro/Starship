import { TProfileInfo } from '../types'
import { ApiBase } from './base'

export class ApiAuth extends ApiBase {
  constructor() {
    super('/auth')
  }

  signin(data: { login: string; password: string }) {
    return this.http.post('/signin', { data })
  }

  signup(data: {
    first_name: string
    second_name: string
    login: string
    email: string
    password: string
    phone: string
  }) {
    return this.http.post('/signup', { data })
  }

  getProfile(): Promise<TProfileInfo> {
    return this.http.get('/user')
  }

  logout() {
    return this.http.post('/logout')
  }

  create = undefined
  read = undefined
  update = undefined
  delete = undefined
}

export default ApiAuth
