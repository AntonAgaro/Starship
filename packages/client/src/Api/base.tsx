import { HTTPTransport } from '../Utils/http'

export abstract class ApiBase {
  protected http: HTTPTransport

  protected constructor(handle: string) {
    this.http = new HTTPTransport(handle)
  }

  public abstract create?(data: unknown): Promise<unknown>

  public abstract read?(identifier?: string): Promise<unknown>

  public abstract update?(data: unknown): Promise<unknown>

  public abstract delete?(identifier: string | number): Promise<unknown>
}
