import { SettingsData } from '../types'

export const querySettingsData = async (): Promise<SettingsData> => {
  const response = await fetch('/src/features/settings/data.json')
  const data = await response.json()

  return data
}
