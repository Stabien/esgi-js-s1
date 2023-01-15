import { getElementByUUID } from './getters'
import state from './state'

export const setWindows = (value: any[]): void => {
  state.windows = value
}

export const setIsWindowMaximized = (windowUUID: string, isMaximized: boolean): void => {
  const htmlWindow = getElementByUUID(windowUUID)
  for (const index in state.windows) {
    if (state.windows[index].htmlElement === htmlWindow) {
      state.windows[index].isMaximized = isMaximized
    }
  }
}

export const setIsWindowHidden = (windowUUID: string, isHidden: boolean): void => {
  const htmlWindow = getElementByUUID(windowUUID)
  for (const index in state.windows) {
    if (state.windows[index].htmlElement === htmlWindow) {
      state.windows[index].isHidden = isHidden
    }
  }
}
