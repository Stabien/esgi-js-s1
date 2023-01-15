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
