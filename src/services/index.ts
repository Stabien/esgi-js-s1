import { SettingsData } from '../types'

export const querySettingsData = async (): Promise<SettingsData> => {
  const response = await fetch('/src/features/settings/data.json')
  const data = await response.json()

  return data
}

export const getNetworkLatency = async (): Promise<number> => {
  const start = new Date()
  await fetch('https://picsum.photos/')
  const end = new Date()

  const latency = end.getTime() - start.getTime()

  return latency
}
