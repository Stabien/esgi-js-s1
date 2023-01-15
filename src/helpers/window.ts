import { setIsWindowMaximized, setWindows, setIsWindowHidden } from '../store/actions'
import { getElementByUUID, getIsWindowHidden, getIsWindowMaximized } from '../store/getters'
import { WindowData } from '../types'

export const resizeWindow = (windowUUID: string): void => {
  const htmlWindow = getElementByUUID(windowUUID)

  const maximizedStyle = 'width: 100vw; height: 100vh;'
  const defaultStyle = 'width: 400px; height: 400px;'

  const maximizeIcon = htmlWindow.getElementsByClassName('window-icon-maximize')[0]
  const minimizeIcon = htmlWindow.getElementsByClassName('window-icon-minimize')[0]
  const isMaximized = getIsWindowMaximized(windowUUID)

  if (isMaximized) {
    htmlWindow.setAttribute('style', defaultStyle)
    maximizeIcon.setAttribute('style', 'display: block')
    minimizeIcon.setAttribute('style', 'display: none')
  } else {
    htmlWindow.setAttribute('style', maximizedStyle)
    maximizeIcon.setAttribute('style', 'display: none')
    minimizeIcon.setAttribute('style', 'display: block')
  }

  setIsWindowMaximized(windowUUID, !isMaximized)
}

export const removeWindow = (windows: WindowData[], windowUUID: string): void => {
  const htmlWindow = getElementByUUID(windowUUID)

  htmlWindow.remove()
  windows = windows.filter((window) => window.uuid !== windowUUID)
  setWindows(windows)
}

export const setDisplayWindow = (elementUUID: string): void => {
  const isHidden = getIsWindowHidden(elementUUID)
  const htmlWindow = getElementByUUID(elementUUID)

  if (isHidden) {
    htmlWindow.setAttribute('style', 'display: block')
  } else {
    htmlWindow.setAttribute('style', 'display: none')
  }

  setIsWindowHidden(elementUUID, !isHidden)
}
