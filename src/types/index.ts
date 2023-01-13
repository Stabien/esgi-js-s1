export type ListenerFunction = <K extends keyof HTMLElementEventMap>(
  this: HTMLElement,
  ev: HTMLElementEventMap[K],
) => void

export type TemplateProperty =
  | string
  | number
  | boolean
  | ListenerFunction
  | { [key: string]: TemplateProperty }

export interface Template {
  [key: string]: TemplateProperty | Template[]
}

export interface ProxyTarget {
  [key: string | symbol]: any
}

export interface AnyObject {
  [key: string]: any
}

export type Reactive = AnyObject | [any]
