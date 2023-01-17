import { DatetimeSettings } from '../types'
import state from './state'

export const getIsWindowMaximized = (windowUUID: string): boolean => {
  const { windows } = state

  for (const window of windows) {
    if (window.uuid === windowUUID) {
      return window.isMaximized
    }
  }
  return false
}

export const getIsWindowHidden = (windowUUID: string): boolean => {
  const { windows } = state

  for (const window of windows) {
    if (window.uuid === windowUUID) {
      return window.isHidden
    }
  }
  return false
}

export const getIsWindowFocused = (windowUUID: string): boolean => {
  const { windows } = state

  for (const window of windows) {
    if (window.uuid === windowUUID) {
      return window.isFocused
    }
  }
  return false
}

export const getElementByUUID = (elementUUID: string): HTMLElement => {
  const htmlElement = document.querySelector(`[data-uuid=${elementUUID}]`) as HTMLElement

  return htmlElement
}

export const getDate = (): string => {
  const elementToDisplay = []
  const currentDatetime = new Date(Date.now())
  const settings: DatetimeSettings = state.settings.datetime

  let day = currentDatetime.getDate().toString()
  let month = (currentDatetime.getMonth() + 1).toString()
  const year = currentDatetime.getFullYear().toString()

  if (settings.day) {
    if (parseInt(day) < 10) {
      day = `0${day}`
    }
    elementToDisplay.push(day)
  }

  if (settings.month) {
    if (parseInt(month) < 10) {
      month = `0${month}`
    }
    elementToDisplay.push(month)
  }

  if (settings.year) {
    elementToDisplay.push(year)
  }

  return elementToDisplay.join('/')
}

export const getTime = (): string => {
  const elementToDisplay = []
  const currentDatetime = new Date(Date.now())
  const settings: DatetimeSettings = state.settings.datetime

  let seconds = currentDatetime.getSeconds().toString()
  let minutes = currentDatetime.getMinutes().toString()
  let hours = currentDatetime.getHours().toString()

  if (settings.hours) {
    if (parseInt(hours) < 10) {
      hours = `0${hours}`
    }
    elementToDisplay.push(hours)
  }

  if (settings.minutes) {
    if (parseInt(minutes) < 10) {
      minutes = `0${minutes}`
    }
    elementToDisplay.push(minutes)
  }

  if (settings.seconds) {
    if (parseInt(seconds) < 10) {
      seconds = `0${seconds}`
    }
    elementToDisplay.push(seconds)
  }

  return elementToDisplay.join(':')
}
