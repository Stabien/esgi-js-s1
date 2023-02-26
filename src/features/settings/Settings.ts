import { Template, SettingsData } from '../../types'
import '../../styles/navbar.css'
import { renderTemplate } from '../../helpers/render'
import Window from '../../components/Window'
import '../../styles/settings.css'
import { setSettings } from '../../store/actions'
import { getSettings } from '../../store/getters'

const updateSettings = (htmlSettings: HTMLElement): SettingsData => {
  const settings: SettingsData = {
    dateSettings: {
      hideDate: (
        htmlSettings.getElementsByClassName('settings-date-display')[0] as HTMLInputElement
      ).checked as unknown as boolean,
      hideTime: (
        htmlSettings.getElementsByClassName('settings-time-display')[0] as HTMLInputElement
      ).checked as unknown as boolean,
      hideDays: (
        htmlSettings.getElementsByClassName('settings-days-display')[0] as HTMLInputElement
      ).checked as unknown as boolean,
      hideMonths: (
        htmlSettings.getElementsByClassName('settings-months-display')[0] as HTMLInputElement
      ).checked as unknown as boolean,
      hideYears: (
        htmlSettings.getElementsByClassName('settings-years-display')[0] as HTMLInputElement
      ).checked as unknown as boolean,
      hideHours: (
        htmlSettings.getElementsByClassName('settings-hours-display')[0] as HTMLInputElement
      ).checked as unknown as boolean,
      hideMinutes: (
        htmlSettings.getElementsByClassName('settings-minutes-display')[0] as HTMLInputElement
      ).checked as unknown as boolean,
      hideSeconds: (
        htmlSettings.getElementsByClassName('settings-seconds-display')[0] as HTMLInputElement
      ).checked as unknown as boolean,
    },
    batterySettings: {
      hideBattery: (
        htmlSettings.getElementsByClassName('settings-battery-display')[0] as HTMLInputElement
      ).checked as unknown as boolean,
    },
    networkSettings: {
      hideNetworkLatency: (
        htmlSettings.getElementsByClassName(
          'settings-network-latency-display',
        )[0] as HTMLInputElement
      ).checked as unknown as boolean,
      pingRefreshTime: (
        htmlSettings.getElementsByClassName(
          'settings-network-latency-display',
        )[0] as HTMLInputElement
      ).checked as unknown as number,
    },
    vibrationSettings: {
      hideVibration: (
        htmlSettings.getElementsByClassName('settings-vibration-display')[0] as HTMLInputElement
      ).checked as unknown as boolean,
    },
  }

  return settings
}

const Settings = (): HTMLElement => {
  const template: Template = {
    tagName: 'div',
    class: 'settings-container',
    children: [
      {
        tagName: 'div',
        class: 'settings-date-container',
        children: [
          {
            tagName: 'h2',
            class: 'settings-date-title',
            text: 'Date',
          },
          {
            tagName: 'div',
            class: 'settings-input-container',
            children: [
              {
                tagName: 'label',
                for: 'settings-date-display',
                text: 'Masquer la date',
              },
              {
                tagName: 'input',
                name: 'settings-date-display',
                class: 'settings-date-display',
                type: 'checkbox',
              },
            ],
          },
          {
            tagName: 'div',
            class: 'settings-input-container',
            children: [
              {
                tagName: 'label',
                for: 'settings-time-display',
                text: "Masquer l'heure",
              },
              {
                tagName: 'input',
                name: 'settings-time-display',
                class: 'settings-time-display',
                type: 'checkbox',
              },
            ],
          },
          {
            tagName: 'div',
            class: 'settings-input-container',
            children: [
              {
                tagName: 'label',
                for: 'settings-days-display',
                text: 'Masquer les jours',
              },
              {
                tagName: 'input',
                name: 'settings-days-display',
                class: 'settings-days-display',
                type: 'checkbox',
              },
            ],
          },
          {
            tagName: 'div',
            class: 'settings-input-container',
            children: [
              {
                tagName: 'label',
                for: 'settings-months-display',
                text: 'Masquer les mois',
              },
              {
                tagName: 'input',
                name: 'settings-months-display',
                class: 'settings-months-display',
                type: 'checkbox',
              },
            ],
          },
          {
            tagName: 'div',
            class: 'settings-input-container',
            children: [
              {
                tagName: 'label',
                for: 'settings-years-display',
                text: 'Masquer les années',
              },
              {
                tagName: 'input',
                name: 'settings-years-display',
                class: 'settings-years-display',
                type: 'checkbox',
              },
            ],
          },
          {
            tagName: 'div',
            class: 'settings-input-container',
            children: [
              {
                tagName: 'label',
                for: 'settings-hours-display',
                text: 'Masquer les heures',
              },
              {
                tagName: 'input',
                name: 'settings-hours-display',
                class: 'settings-hours-display',
                type: 'checkbox',
              },
            ],
          },
          {
            tagName: 'div',
            class: 'settings-input-container',
            children: [
              {
                tagName: 'label',
                for: 'settings-minutes-display',
                text: 'Masquer les minutes',
              },
              {
                tagName: 'input',
                name: 'settings-minutes-display',
                class: 'settings-minutes-display',
                type: 'checkbox',
              },
            ],
          },
          {
            tagName: 'div',
            class: 'settings-input-container',
            children: [
              {
                tagName: 'label',
                for: 'settings-seconds-display',
                text: 'Masquer les secondes',
              },
              {
                tagName: 'input',
                name: 'settings-seconds-display',
                class: 'settings-seconds-display',
                type: 'checkbox',
              },
            ],
          },
        ],
      },
      {
        tagName: 'div',
        class: 'settings-battery-container',
        children: [
          {
            tagName: 'h2',
            class: 'settings-battery-title',
            text: 'Batterie',
          },
          {
            tagName: 'div',
            class: 'settings-input-container',
            children: [
              {
                tagName: 'label',
                for: 'settings-battery-display',
                text: 'Masquer la batterie',
              },
              {
                tagName: 'input',
                name: 'settings-battery-display',
                class: 'settings-battery-display',
                type: 'checkbox',
              },
            ],
          },
        ],
      },
      {
        tagName: 'div',
        class: 'settings-network-container',
        children: [
          {
            tagName: 'h2',
            class: 'settings-network-title',
            text: 'Réseau',
          },
          {
            tagName: 'div',
            class: 'settings-input-container',
            children: [
              {
                tagName: 'label',
                for: 'settings-network-latency-display',
                text: 'Masquer la latence réseau',
              },
              {
                tagName: 'input',
                name: 'settings-network-latency-display',
                class: 'settings-network-latency-display',
                type: 'checkbox',
              },
            ],
          },
        ],
      },
      {
        tagName: 'div',
        class: 'settings-vibration-container',
        children: [
          {
            tagName: 'h2',
            class: 'settings-vibration-title',
            text: 'Vibration',
          },
          {
            tagName: 'div',
            class: 'settings-input-container',
            children: [
              {
                tagName: 'label',
                for: 'settings-vibration-display',
                text: 'Masquer la vibration',
              },
              {
                tagName: 'input',
                name: 'settings-vibration-display',
                class: 'settings-vibration-display',
                type: 'checkbox',
              },
            ],
          },
        ],
      },
      {
        tagName: 'input',
        type: 'submit',
        class: 'settings-save-button',
        value: 'Enregistrer',
      },
    ],
  }

  let settings = getSettings()

  const htmlWindow = Window('Paramètres', '/icon_settings.png', { width: 600, height: 600 })
  const htmlElement = renderTemplate(template) as HTMLElement
  const parent = htmlWindow.getElementsByClassName('window-content')[0]

  const saveButton = htmlElement.getElementsByClassName('settings-save-button')[0]

  const htmlDisplayDate = htmlElement.getElementsByClassName(
    'settings-date-display',
  )[0] as HTMLInputElement
  const htmlDisplayTime = htmlElement.getElementsByClassName(
    'settings-time-display',
  )[0] as HTMLInputElement
  const htmlDisplayDays = htmlElement.getElementsByClassName(
    'settings-days-display',
  )[0] as HTMLInputElement
  const htmlDisplayMonths = htmlElement.getElementsByClassName(
    'settings-months-display',
  )[0] as HTMLInputElement
  const htmlDisplayYears = htmlElement.getElementsByClassName(
    'settings-years-display',
  )[0] as HTMLInputElement
  const htmlDisplayHours = htmlElement.getElementsByClassName(
    'settings-hours-display',
  )[0] as HTMLInputElement
  const htmlDisplayMinutes = htmlElement.getElementsByClassName(
    'settings-minutes-display',
  )[0] as HTMLInputElement
  const htmlDisplaySeconds = htmlElement.getElementsByClassName(
    'settings-seconds-display',
  )[0] as HTMLInputElement
  const htmlDisplayBattery = htmlElement.getElementsByClassName(
    'settings-battery-display',
  )[0] as HTMLInputElement
  const htmlDisplayNetwork = htmlElement.getElementsByClassName(
    'settings-network-latency-display',
  )[0] as HTMLInputElement
  const htmlDisplayVibration = htmlElement.getElementsByClassName(
    'settings-vibration-display',
  )[0] as HTMLInputElement

  htmlDisplayDate.checked = settings.dateSettings.hideDate
  htmlDisplayTime.checked = settings.dateSettings.hideTime
  htmlDisplayDays.checked = settings.dateSettings.hideDays
  htmlDisplayMonths.checked = settings.dateSettings.hideMonths
  htmlDisplayYears.checked = settings.dateSettings.hideYears
  htmlDisplayHours.checked = settings.dateSettings.hideHours
  htmlDisplayMinutes.checked = settings.dateSettings.hideMinutes
  htmlDisplaySeconds.checked = settings.dateSettings.hideSeconds

  htmlDisplayBattery.checked = settings.batterySettings.hideBattery

  htmlDisplayNetwork.checked = settings.networkSettings.hideNetworkLatency

  htmlDisplayVibration.checked = settings.vibrationSettings.hideVibration

  saveButton.addEventListener('click', () => {
    settings = updateSettings(htmlElement)
    setSettings(settings)
  })

  parent.appendChild(htmlElement)

  return htmlWindow
}

export default Settings
