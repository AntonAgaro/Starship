enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}
type Options = {
  retries?: number
  timeout?: number
  headers?: { [key: string]: unknown }
  method?: METHODS
  data?: any
}

const queryStringify = (data: { [key: string]: unknown }) => {
  let str = ''

  const keys = Object.keys(data)
  keys.map(key => (str += '&' + key + '=' + data[key]))
  return '?' + str.substr(1)
}

export class HTTPTransport {
  private base_url = 'https://ya-praktikum.tech/api/v2'
  handle = ''
  constructor(handle_ = '') {
    this.handle = this.base_url + handle_
  }
  public get<Response>(url = '/', options: Options = {}): Promise<Response> {
    return this.request<Response>(
      this.handle + url,
      { ...options, method: METHODS.GET },
      options.timeout
    )
  }

  public put<Response>(url: string, options: Options = {}): Promise<Response> {
    return this.request<Response>(
      this.handle + url,
      { ...options, method: METHODS.PUT },
      options.timeout
    )
  }

  public post<Response>(url: string, options: Options = {}): Promise<Response> {
    return this.request<Response>(
      this.handle + url,
      { ...options, method: METHODS.POST },
      options.timeout
    )
  }

  public delete<Response>(
    url: string,
    options: Options = {}
  ): Promise<Response> {
    return this.request<Response>(
      this.handle + url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    )
  }

  fetchWithRetry(url: string, options: Options): Promise<Response> {
    const { retries = 1 } = options
    console.log(retries)

    const onError = (err: DOMException) => {
      const retriesLeft = retries - 1
      if (retriesLeft <= 0) {
        throw err
      }
      return this.fetchWithRetry(url, { ...options, retries: retriesLeft })
    }

    return this.request<Response>(url, options).catch(onError)
  }

  private request<Response>(
    url: string,
    options: Options = {},
    timeout = 5000
  ): Promise<Response> {
    const { method, data } = options

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      if (method === METHODS.GET && data) {
        url += queryStringify(data)
      }

      xhr.open(method ? method : METHODS.GET, url)
      xhr.timeout = timeout

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response)
          } else {
            reject(xhr.response)
          }
        }
      }
      xhr.onabort = reject
      xhr.onerror = reject
      xhr.ontimeout = reject
      xhr.onabort = reject
      xhr.onerror = reject
      xhr.ontimeout = reject
      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json')
      }
      xhr.withCredentials = true
      xhr.responseType = 'json'
      if (method === METHODS.GET || !data) {
        xhr.send()
      } else {
        xhr.send(data instanceof FormData ? data : JSON.stringify(data))
      }
    })
  }
}
