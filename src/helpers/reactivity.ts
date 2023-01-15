import { ProxyTarget, Reactive, State } from '../types'

const reactiveSet = new WeakSet()
const stateChangeEvent = new CustomEvent('onStateChange')

export const reactive = (target: any, onChange: any): Reactive => {
  const handler: ProxyHandler<object> = {
    get: (target: ProxyTarget, property: string | symbol) => {
      if (typeof target[property] === 'object' && !reactiveSet.has(target[property])) {
        reactiveSet.add(target[property])
        return new Proxy(target[property], handler)
      }
      return target[property]
    },
    set: (target: ProxyTarget, property: string | symbol, value: any) => {
      target[property] = value
      onChange()

      return true
    },
  }
  return new Proxy(target, handler) as Reactive
}

export const createState = (value: any): State => {
  const onChange = (): void => {
    document.dispatchEvent(stateChangeEvent)
  }

  return reactive(value, onChange)
}
