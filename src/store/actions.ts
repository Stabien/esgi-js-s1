import { querySettingsData } from '../services'
import { SettingsData } from '../types'
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

export const initializeSettings = async (): Promise<void> => {
  const settings = await querySettingsData()

  state.settings = settings
}

export const setTictactoeScores = (): void => {
  const connection = indexedDB.open('NavigOS', 5)

  connection.onerror = () => {
    throw new Error('IndexedDB connection failed')
  }

  connection.onsuccess = (event) => {
    const db = (event.target as IDBRequest).result as IDBDatabase
    const transaction = db.transaction(['tictactoe'])
    const objectStore = transaction.objectStore('tictactoe')
    const request = objectStore.getAll() as IDBRequest

    request.onsuccess = (): any => {
      state.tictactoeScores = request.result
      console.log(state)
    }

    request.onerror = () => {
      throw new Error((request.error as DOMException).message)
    }
  }
}

export const setSettings = (settings: SettingsData): void => {
  state.settings = settings

  localStorage.setItem('settings', JSON.stringify(settings))
}
