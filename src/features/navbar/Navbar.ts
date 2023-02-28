import { Template, WindowData } from '../../types'
import '../../styles/navbar.css'
import { renderTemplate } from '../../helpers/render'
import state from '../../store/state'
import { displayWindow, setDisplayWindow } from '../../helpers/window'
import { getIsWindowFocused, getNavbarTime, getNavbarDate, getSettings } from '../../store/getters'
import { setIsWindowFocused } from '../../store/actions'
import { getNetworkLatency } from '../../services'

const onIconClick = (windowUUID: string): void => {
  const isFocused = getIsWindowFocused(windowUUID)

  if (isFocused) {
    setDisplayWindow(windowUUID)
  } else {
    displayWindow(windowUUID)
    setIsWindowFocused(windowUUID, true)
  }
}

/**
 * Create window icon template object
 *
 * @param iconPath - Path of the window icon
 */
const createHtmlWindowIcon = (window: WindowData): HTMLElement => {
  const windowIconTemplate: Template = {
    tagName: 'div',
    class: 'navbar-window-icon',
    click: () => onIconClick(window.uuid),
    children: {
      tagName: 'img',
      src: window.iconPath,
    },
  }

  const htmlElement = renderTemplate(windowIconTemplate) as HTMLElement

  if (window.isFocused) {
    htmlElement.style.background = '#5F5F5F'
    htmlElement.style.padding = '10px 14px'
    htmlElement.style.margin = '0px 1px'
  }
  return htmlElement
}

/**
 * For each window, render window template and append it into array of template.
 * Then render it and append it to parent element.
 *
 * @param windows - Array of all open windows
 * @param parent - HTML parent to which to attach the elements
 */
const setWindowsIcon = (windows: WindowData[], parent: HTMLElement): void => {
  parent.innerHTML = ''

  for (const window of windows) {
    const htmlWindowIcon = createHtmlWindowIcon(window)
    parent.appendChild(htmlWindowIcon)
  }
}

const Navbar = (): HTMLElement => {
  const template: Template = {
    tagName: 'nav',
    class: 'navbar-container',
    children: [
      {
        tagName: 'div',
        class: 'navbar-windows-icon-container',
      },
      {
        tagName: 'div',
        class: 'navbar-general-data',
        children: [
          {
            tagName: 'div',
            class: 'navbar-battery',
            children: [
              {
                tagName: 'div',
                class: 'navbar-battery-progress-bar-container',
                children: {
                  tagName: 'div',
                  class: 'navbar-battery-progress-bar',
                },
              },
              {
                tagName: 'div',
                class: 'navbar-battery-text',
              },
            ],
          },
          {
            tagName: 'div',
            class: 'navbar-network',
            children: [
              {
                tagName: 'img',
                class: 'navbar-network-icon',
                src: 'icon_network.png',
                alt: 'network-icon',
              },
              {
                tagName: 'span',
                class: 'navbar-network-latency',
              },
            ],
          },
          {
            tagName: 'div',
            class: 'navbar-datetime-container',
            children: [
              {
                tagName: 'span',
                class: 'navbar-time',
                text: getNavbarTime(),
              },
              {
                tagName: 'span',
                class: 'navbar-date',
                text: getNavbarDate(),
              },
            ],
          },
        ],
      },
    ],
  }

  const htmlElement = renderTemplate(template) as HTMLElement

  const htmlTime = htmlElement.getElementsByClassName('navbar-time')[0] as HTMLElement
  const htmlDate = htmlElement.getElementsByClassName('navbar-date')[0] as HTMLElement

  const htmlNetwork = htmlElement.getElementsByClassName('navbar-network')[0] as HTMLElement
  const htmlNetworkLatency = htmlElement.getElementsByClassName(
    'navbar-network-latency',
  )[0] as HTMLElement

  const htmlBattery = htmlElement.getElementsByClassName('navbar-battery')[0] as HTMLElement
  const htmlBatteryProgressBar = htmlBattery.getElementsByClassName(
    'navbar-battery-progress-bar',
  )[0] as HTMLElement
  const htmlBatteryText = htmlBattery.getElementsByClassName('navbar-battery-text')[0]

  let windows: WindowData[] = state.windows
  let settings = getSettings()

  // Update windows icon and settings on state change
  document.addEventListener('onStateChange', () => {
    const htmlParent = htmlElement.getElementsByClassName(
      'navbar-windows-icon-container',
    )[0] as HTMLElement

    windows = state.windows
    setWindowsIcon(windows, htmlParent)

    settings = getSettings()

    if (settings.batterySettings.hideBattery) {
      htmlBattery.style.display = 'none'
    } else {
      htmlBattery.style.display = 'block'
    }

    if (settings.networkSettings.hideNetworkLatency) {
      htmlNetwork.style.display = 'none'
    } else {
      htmlNetwork.style.display = 'block'
    }

    if (settings.dateSettings.hideDate) {
      htmlDate.style.display = 'none'
    } else {
      htmlDate.style.display = 'block'
    }

    if (settings.dateSettings.hideTime) {
      htmlTime.style.display = 'none'
    } else {
      htmlTime.style.display = 'block'
    }
  })

  // Refresh date every seconds
  setInterval(() => {
    htmlTime.innerHTML = getNavbarTime()
    htmlDate.innerHTML = getNavbarDate()
  }, 1000)

  // Refresh network latency
  getNetworkLatency()
    .then((networkLatency) => {
      if (!settings.networkSettings.hideNetworkLatency) {
        htmlNetworkLatency.innerHTML = `${networkLatency.toString()}ms`

        setInterval(async () => {
          try {
            const networkLatency = await getNetworkLatency()
            htmlNetworkLatency.innerHTML = `${networkLatency.toString()}ms`
          } catch (e) {
            throw new Error(e as string)
          }
        }, 5000)
      }
    })
    .catch((e) => {
      throw new Error(e)
    })

  // @ts-expect-errors Typescript does not recognize getBattery prototype on navigator object
  if (navigator.getBattery !== undefined) {
    // Get battery level and refresh on battery level change
    navigator // @ts-expect-errors Typescript does not recognize getBattery prototype on navigator object
      .getBattery() // @ts-expect-errors Typescript does not recognize BatteryManager on navigator object
      .then((battery: BatteryManager) => {
        if (!settings.batterySettings.hideBattery) {
          const batteryLevel = `${Math.round(battery.level * 100).toString()}%`

          htmlBatteryText.innerHTML = batteryLevel
          htmlBatteryProgressBar.style.width = batteryLevel

          battery.addEventListener('levelchange', () => {
            const batteryLevel = `${Math.round(battery.level * 100).toString()}%`

            htmlBatteryText.innerHTML = batteryLevel
            htmlBatteryProgressBar.style.width = batteryLevel
          })
        }
      })
      .catch((e: string) => {
        throw new Error(e)
      })
  }
  return htmlElement
}

export default Navbar
