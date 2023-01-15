import { Template, WindowData } from '../types'
import '../styles/navbar.css'
import { renderTemplate } from '../helpers/render'
import state from '../store/state'
import { setDisplayWindow } from '../helpers/window'

/**
 * Create window icon template object
 *
 * @param iconPath - Path of the window icon
 */
const createWindowIconTemplate = (iconPath: string, windowUUID: string): Template => {
  const windowIconTemplate: Template = {
    tagName: 'div',
    class: 'navbar-window-icon',
    click: () => setDisplayWindow(windowUUID),
    children: [
      {
        tagName: 'img',
        src: iconPath,
      },
    ],
  }
  return windowIconTemplate
}

/**
 * For each window, render window template and append it into array of template.
 * Then render it and append it to parent element.
 *
 * @param windows - Array of all open windows
 * @param parent - HTML parent to append the element to
 */
const setWindowsIcon = (windows: WindowData[], parent: HTMLElement): void => {
  const windowIconTemplateList = []

  for (const window of windows) {
    const windowIconTemplate = createWindowIconTemplate(window.iconPath, window.uuid)
    windowIconTemplateList.push(windowIconTemplate)
  }

  parent.innerHTML = ''

  if (windowIconTemplateList.length > 0) {
    const htmlElement: HTMLElement | DocumentFragment = renderTemplate(windowIconTemplateList)
    parent.appendChild(htmlElement)
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
