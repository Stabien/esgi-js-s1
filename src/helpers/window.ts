import { setIsWindowMaximized, setWindows } from '../store/actions'
import { getIsWindowMaximized } from '../store/getters'
import { WindowData } from '../types'

export const resizeWindow = (htmlElement: HTMLElement): void => {
  const maximizedStyle = 'width: 100vw; height: 100vh;'
  const defaultStyle = 'width: 400px; height: 400px;'

  const maximizeIcon = htmlElement.getElementsByClassName('window-icon-maximize')[0]
  const minimizeIcon = htmlElement.getElementsByClassName('window-icon-minimize')[0]
  const isMaximized = getIsWindowMaximized(htmlElement)

  if (isMaximized) {
    htmlElement.setAttribute('style', defaultStyle)
    maximizeIcon.setAttribute('style', 'display: block')
    minimizeIcon.setAttribute('style', 'display: none')
  } else {
    htmlElement.setAttribute('style', maximizedStyle)
    maximizeIcon.setAttribute('style', 'display: none')
    minimizeIcon.setAttribute('style', 'display: block')
  }

  setIsWindowMaximized(htmlElement, !isMaximized)
}

export const removeWindow = (windows: WindowData[], htmlElement: HTMLElement): void => {
  htmlElement.remove()
  windows = windows.filter((window) => window.htmlElement !== htmlElement)
  setWindows(windows)
}
