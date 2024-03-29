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
  number1: number
  operator: string
  number2: number
}

export type CalculatorSymbol = '+' | '-' | '/' | '*'
export interface TimeData {
  hour: number
  minute: number
  second: number
  millisecond: number
}

export interface DateSettings {
  hideDate: boolean
  hideTime: boolean
  hideDays: boolean
  hideMonths: boolean
  hideYears: boolean
  hideHours: boolean
  hideMinutes: boolean
  hideSeconds: boolean
}

export interface BatterySettings {
  hideBattery: boolean
}

export interface NetworkSettings {
  hideNetworkLatency: boolean
  pingRefreshTime: number
}

export interface VibrationSettings {
  hideVibration: boolean
}

export interface SettingsData {
  dateSettings: DateSettings
  batterySettings: BatterySettings
  networkSettings: NetworkSettings
  vibrationSettings: VibrationSettings
}
