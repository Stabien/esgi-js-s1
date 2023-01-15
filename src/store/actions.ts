import state from './state'

export const setWindows = (value: any[]): void => {
  state.windows = value
}

export const setIsWindowMaximized = (windowUUID: string, isMaximized: boolean): void => {
  const { windows } = state

  for (const index in state.windows) {
    if (state.windows[index].uuid === windowUUID) {
      state.windows[index].isMaximized = isMaximized
    }
  }

  // Reassign state.windows to use reactivity
  state.windows = windows
}

export const setIsWindowHidden = (windowUUID: string, isHidden: boolean): void => {
  const { windows } = state

  for (const index in state.windows) {
    if (state.windows[index].uuid === windowUUID) {
      state.windows[index].isHidden = isHidden
    }
  }

  // Reassign state.windows to use reactivity
  state.windows = windows
}

export const setIsWindowFocused = (windowUUID: string, isFocused: boolean): void => {
  const { windows } = state

  for (const index in windows) {
    if (windows[index].uuid === windowUUID) {
      windows[index].isFocused = isFocused
    } else {
      windows[index].isFocused = false
    }
  }

  // Reassign state.windows to use reactivity
  state.windows = windows
}
