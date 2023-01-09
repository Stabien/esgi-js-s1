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
