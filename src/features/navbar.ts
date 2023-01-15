import { Template, WindowData } from '../types'
import '../styles/navbar.css'
import { renderTemplate } from '../helpers/render'
import state from '../store/state'
import { displayWindow, setDisplayWindow } from '../helpers/window'
import { getIsWindowFocused } from '../store/getters'
import { setIsWindowFocused } from '../store/actions'

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
  const windowIconTemplate: Template[] = [
    {
      tagName: 'div',
      class: 'navbar-window-icon',
      click: () => onIconClick(window.uuid),
      children: [
        {
          tagName: 'img',
          src: window.iconPath,
        },
      ],
    },
  ]

  const htmlElement = renderTemplate(windowIconTemplate) as HTMLElement

  if (window.isFocused === true) {
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
 * @param parent - HTML parent to append the element to
 */
const setWindowsIcon = (windows: WindowData[], parent: HTMLElement): void => {
  parent.innerHTML = ''

  for (const window of windows) {
    const htmlWindowIcon = createHtmlWindowIcon(window)
    parent.appendChild(htmlWindowIcon)
  }
}

const Navbar = (): HTMLElement => {
  const template: Template[] = [
    {
      tagName: 'nav',
      class: 'navbar-container',
      children: [
        {
          tagName: 'div',
          class: 'navbar-windows-icon-container',
        },
      ],
    },
  ]

  const htmlElement = renderTemplate(template) as HTMLElement
  let windows: WindowData[] = state.windows

  document.addEventListener('onStateChange', () => {
    const htmlParent = htmlElement.getElementsByClassName(
      'navbar-windows-icon-container',
    )[0] as HTMLElement

    windows = state.windows
    setWindowsIcon(windows, htmlParent)
  })

  return htmlElement
}

export default Navbar
