import state from './state'

export const setWindows = (value: any[]): void => {
  state.windows = value
}

export const setIsWindowMaximized = (windowUUID: string, isMaximized: boolean): void => {
  for (const index in state.windows) {
    if (state.windows[index].uuid === windowUUID) {
      state.windows[index].isMaximized = isMaximized
    }
  }
}

export const setIsWindowHidden = (windowUUID: string, isHidden: boolean): void => {
  for (const index in state.windows) {
    if (state.windows[index].uuid === windowUUID) {
      state.windows[index].isHidden = isHidden
    }
  }
}
