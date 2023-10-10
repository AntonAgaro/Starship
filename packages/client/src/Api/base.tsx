import axios from 'axios'

export abstract class ApiBase {
  private base_url = 'https://ya-praktikum.tech/api/v2'
  public handle = ''
  public axios

  constructor(handle_ = '') {
    this.handle = this.base_url + handle_

    this.axios = axios.create({
      withCredentials: true,
      baseURL: this.handle,
      responseType: 'json',
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
