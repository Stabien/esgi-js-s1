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

export type Reactive = AnyObject | any[]

export interface WindowData {
  uuid: string
  iconPath: string
  isMaximized: boolean
  isHidden: boolean
  isFocused: boolean
}

export interface DatetimeSettings {
  seconds: boolean
  minutes: boolean
  hours: boolean
  day: boolean
  month: boolean
  year: boolean
}

export interface SettingsData {
  datetime: DatetimeSettings
}

export interface WindowSize {
  width: number
  height: number
}

export type TictactoeSymbols = 'x' | 'o'
export type TictactoeGameOverState = false | 'x' | 'o' | '='

export interface TictactoeData {
  hasGameStarded: boolean
  isPlayerOneTurn: boolean
  board: string[]
  isGameOver: boolean
  isPlayerOneBeginning: boolean
  currentScore: [number, number]
}

export interface CalculatorData {

}

// export type CalculatorState = 'un truc'

export type CalculatorSymbol = '+' | '-' | '/' | '*'