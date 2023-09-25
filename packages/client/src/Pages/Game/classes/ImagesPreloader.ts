type TOnReadyCallbacks = { (): void }[]
interface IImagePreloaderSettings {
  urls: string[]
  onReadyCallbacks: TOnReadyCallbacks
}
export default class ImagesPreloader {
  private resources: Record<string, HTMLImageElement | null> = {}
  private onReadyCallbacks: TOnReadyCallbacks

  constructor(settings: IImagePreloaderSettings) {
    this.onReadyCallbacks = settings.onReadyCallbacks

    settings.urls.forEach(url => {
      this.load(url)
    })
  }

  private load(url: string): void {
    if (this.resources[url]) {
      return
    }

    const img = new Image()
    this.resources[url] = null
    img.src = url

    img.addEventListener('load', () => {
      this.resources[url] = img

      if (this.isReady()) {
        this.onReadyCallbacks.forEach(callback => {
          callback()
        })
      }
    })
  }

  public getImg(url: string): HTMLImageElement {
    if (!this.resources[url]) {
      return new Image()
    }
    return this.resources[url] as HTMLImageElement
  }

  private isReady(): boolean {
    let ready = true

    for (const resource in this.resources) {
      if (!this.resources[resource]) {
        ready = false
      }
    }

    return ready
  }
}
