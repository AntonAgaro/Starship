/* eslint-disable @typescript-eslint/ban-types */

export interface Listener {
  [key: string]: Array<Function>
}
class EventBus {
  public listeners: Listener

  constructor() {
    this.listeners = {}
  }

  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)
  }

  off(event: string, callback: Function) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    )
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      return
    }

    this.listeners[event].forEach(function (listener) {
      listener(...args)
    })
  }
}
export default EventBus
export const bus: EventBus = new EventBus()
