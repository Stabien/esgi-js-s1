import { renderTemplate } from '../helpers/render'
import { removeWindow, resizeWindow, setDisplayWindow } from '../helpers/window'
import { Template, WindowData, WindowSize } from '../types'
import '../styles/window.css'
import { setIsWindowFocused, setWindows } from '../store/actions'
import state from '../store/state'
import { getIsWindowHidden, getIsWindowMaximized } from '../store/getters'
import { generateUUID } from '../utils'

/**
 * Render window
 */
const Window = (label: string, iconPath: string, size: WindowSize): HTMLElement => {
  const uuid = generateUUID()
  const template: Template = {
    tagName: 'div',
    class: 'window-container',
    'data-uuid': uuid,
    children: [
      {
        tagName: 'div',
        class: 'window-header',
        children: [
          {
            tagName: 'div',
            class: 'window-header-title-container',
            children: [
              { tagName: 'img', class: 'window-header-icon', src: iconPath },
              { tagName: 'h2', class: 'window-header-title', text: label },
            ],
          },
          {
            tagName: 'div',
            class: 'window-header-buttons-container',
            children: [
              {
                tagName: 'button',
                class: 'window-button-hide',
                click: () => setDisplayWindow(uuid),
                children: {
                  tagName: 'img',
                  class: 'window-icon-hide',
                  src: '/icon_hide.png',
                  alt: 'icon-hide',
                },
              },
              {
                tagName: 'button',
                class: 'window-button-close',
                click: () => removeWindow(windows, uuid),
                children: {
                  tagName: 'img',
                  class: 'window-icon-close',
                  src: '/icon_close.png',
                  alt: 'icon-close',
                },
              },
            ],
          },
        ],
      },
      { tagName: 'div', class: 'window-content' },
    ],
  }

  const htmlElement = renderTemplate(template) as HTMLElement
  const htmlWindowContent = htmlElement.getElementsByClassName('window-content')[0] as HTMLElement
  const isMaximized = getIsWindowMaximized(uuid)
  const isHidden = getIsWindowHidden(uuid)

  let windows: WindowData[] = state.windows
  const windowData: WindowData = {
    uuid,
    iconPath,
    isMaximized,
    isHidden,
    isFocused: true,
  }

  htmlElement.style.width = `${size.width}px`
  htmlWindowContent.style.height = `${size.height}px`

  document.addEventListener('onStateChange', () => {
    windows = state.windows
  })

  setWindows([...windows, windowData])
  setIsWindowFocused(uuid, true)

  return htmlElement
}

export default Window
