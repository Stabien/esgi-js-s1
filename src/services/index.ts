import { SettingsData } from '../types'

const defaultSettings: SettingsData = {
  dateSettings: {
    hideDate: false,
    hideTime: false,
    hideDays: false,
    hideMonths: false,
    hideYears: false,
    hideHours: false,
    hideMinutes: false,
    hideSeconds: false,
  },
  batterySettings: {
    hideBattery: false,
  },
  networkSettings: {
    hideNetworkLatency: false,
    pingRefreshTime: 5,
  },
  vibrationSettings: {
    hideVibration: false,
  },
}

export const querySettingsData = (): SettingsData => {
  const settings = localStorage.getItem('settings')

  if (settings === null) {
    localStorage.setItem('settings', JSON.stringify(defaultSettings))

    return JSON.parse(localStorage.getItem('settings') as string)
  }

  return JSON.parse(settings)
}

export const getNetworkLatency = async (): Promise<number> => {
  const start = new Date()
  await fetch('https://picsum.photos/')
  const end = new Date()

  const latency = end.getTime() - start.getTime()

  return latency
}
