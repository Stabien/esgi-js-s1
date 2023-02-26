import { DateSettings, SettingsData } from '../types'
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

export const getNavbarDate = (): string => {
  const elementToDisplay = []
  const currentDatetime = new Date(Date.now())
  const settings: DateSettings = state.settings.dateSettings

  let day = currentDatetime.getDate().toString()
  let month = (currentDatetime.getMonth() + 1).toString()
  const year = currentDatetime.getFullYear().toString()

  if (!settings.hideDays) {
    if (parseInt(day) < 10) {
      day = `0${day}`
    }
    elementToDisplay.push(day)
  }

  if (!settings.hideMonths) {
    if (parseInt(month) < 10) {
      month = `0${month}`
    }
    elementToDisplay.push(month)
  }

  if (!settings.hideYears) {
    elementToDisplay.push(year)
  }

  return elementToDisplay.join('/')
}

export const getNavbarTime = (): string => {
  const elementToDisplay = []
  const currentDatetime = new Date(Date.now())
  const settings: DateSettings = state.settings.dateSettings

  let seconds = currentDatetime.getSeconds().toString()
  let minutes = currentDatetime.getMinutes().toString()
  let hours = currentDatetime.getHours().toString()

  if (!settings.hideHours) {
    if (parseInt(hours) < 10) {
      hours = `0${hours}`
    }
    elementToDisplay.push(hours)
  }

  if (!settings.hideMinutes) {
    if (parseInt(minutes) < 10) {
      minutes = `0${minutes}`
    }
    elementToDisplay.push(minutes)
  }

  if (!settings.hideSeconds) {
    if (parseInt(seconds) < 10) {
      seconds = `0${seconds}`
    }
    elementToDisplay.push(seconds)
  }

  return elementToDisplay.join(':')
}

export const getDate = (): string => {
  const elementToDisplay = []
  const currentDatetime = new Date(Date.now())

  let day = currentDatetime.getDate().toString()
  let month = (currentDatetime.getMonth() + 1).toString()
  const year = currentDatetime.getFullYear().toString()

  if (parseInt(day) < 10) {
    day = `0${day}`
  }
  elementToDisplay.push(day)

  if (parseInt(month) < 10) {
    month = `0${month}`
  }
  elementToDisplay.push(month)

  elementToDisplay.push(year)

  return elementToDisplay.join('/')
}

export const getTime = (): string => {
  const elementToDisplay = []
  const currentDatetime = new Date(Date.now())

  let seconds = currentDatetime.getSeconds().toString()
  let minutes = currentDatetime.getMinutes().toString()
  let hours = currentDatetime.getHours().toString()

  if (parseInt(hours) < 10) {
    hours = `0${hours}`
  }
  elementToDisplay.push(hours)
  if (parseInt(minutes) < 10) {
    minutes = `0${minutes}`
  }
  elementToDisplay.push(minutes)

  if (parseInt(seconds) < 10) {
    seconds = `0${seconds}`
  }
  elementToDisplay.push(seconds)

  return elementToDisplay.join(':')
}

export const getSettings = (): SettingsData => {
  return state.settings
}
