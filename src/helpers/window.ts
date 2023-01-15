import {
  setIsWindowMaximized,
  setWindows,
  setIsWindowHidden,
  setIsWindowFocused,
} from '../store/actions'
import { getElementByUUID, getIsWindowHidden, getIsWindowMaximized } from '../store/getters'
import state from '../store/state'
import { WindowData } from '../types'

export const resizeWindow = (windowUUID: string): void => {
  const htmlWindow = getElementByUUID(windowUUID)
  const maximizeIcon = htmlWindow.getElementsByClassName('window-icon-maximize')[0] as HTMLElement
  const minimizeIcon = htmlWindow.getElementsByClassName('window-icon-minimize')[0] as HTMLElement

  const isMaximized = getIsWindowMaximized(windowUUID)

  if (isMaximized) {
    htmlWindow.style.width = '400px'
    htmlWindow.style.height = '400px'
    maximizeIcon.style.display = 'block'
    minimizeIcon.style.display = 'none'
  } else {
    htmlWindow.style.width = '100%'
    htmlWindow.style.height = '100%'
    maximizeIcon.style.display = 'none'
    minimizeIcon.style.display = 'block'
  }

  setIsWindowMaximized(windowUUID, !isMaximized)
}

export const removeWindow = (windows: WindowData[], windowUUID: string): void => {
  const htmlWindow = getElementByUUID(windowUUID)

  htmlWindow.remove()
  windows = windows.filter((window) => window.uuid !== windowUUID)
  setWindows(windows)
}

export const hideWindow = (elementUUID: string): void => {
  const htmlWindow = getElementByUUID(elementUUID)

  htmlWindow.style.display = 'none'
  htmlWindow.style.zIndex = '0'
  setIsWindowHidden(elementUUID, true)
}

export const displayWindow = (elementUUID: string): void => {
  const htmlWindow = getElementByUUID(elementUUID)
  const { windows } = state

  for (const window of windows) {
    const currentHtmlWindow = getElementByUUID(elementUUID)
    if (window.uuid === elementUUID) {
      currentHtmlWindow.style.zIndex = '10'
    } else {
      currentHtmlWindow.style.zIndex = '0'
    }
  }

  htmlWindow.style.display = 'block'
  setIsWindowHidden(elementUUID, false)
}

export const setDisplayWindow = (elementUUID: string): void => {
  const isHidden = getIsWindowHidden(elementUUID)

  if (isHidden) {
    displayWindow(elementUUID)
  } else {
    hideWindow(elementUUID)
  }

  setIsWindowFocused(elementUUID, isHidden)
  setIsWindowHidden(elementUUID, !isHidden)
}
