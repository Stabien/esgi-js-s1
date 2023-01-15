import { renderTemplate } from '../helpers/render'
import { removeWindow, resizeWindow, setDisplayWindow } from '../helpers/window'
import { Template, WindowData } from '../types'
import '../styles/window.css'
import { setWindows } from '../store/actions'
import state from '../store/state'
import { getIsWindowMaximized } from '../store/getters'
import { generateUUID } from '../utils'

/**
 * Render window
 */
const Window = (label: string, iconPath: string): HTMLElement => {
  const uuid = generateUUID()
  const template: Template[] = [
    {
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
                  children: [
                    {
                      tagName: 'img',
                      class: 'window-icon-hide',
                      src: '/icon_hide.png',
                      alt: 'icon-hide',
                    },
                  ],
                },
                {
                  tagName: 'button',
                  class: 'window-button-resize',
                  click: () => resizeWindow(uuid),
                  children: [
                    {
                      tagName: 'img',
                      class: 'window-icon-maximize',
                      src: '/icon_maximize.png',
                      alt: 'icon-maximize',
                    },
                    {
                      tagName: 'img',
                      class: 'window-icon-minimize',
                      src: '/icon_minimize.png',
                      alt: 'icon-minimize',
                    },
                  ],
                },
                {
                  tagName: 'button',
                  class: 'window-button-close',
                  click: () => removeWindow(windows, uuid),
                  children: [
                    {
                      tagName: 'img',
                      class: 'window-icon-close',
                      src: '/icon_close.png',
                      alt: 'icon-close',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ]
  const htmlElement = renderTemplate(template) as HTMLElement
  const isMaximized = getIsWindowMaximized(uuid)
  const isHidden = getIsWindowMaximized(uuid)

  const windows: WindowData[] = state.windows
  const windowData: WindowData = {
    uuid,
    iconPath,
    isMaximized,
    isHidden,
  }

  setWindows([...windows, windowData])

  return htmlElement
}

export default Window
