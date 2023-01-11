import { renderTemplate } from '../helpers'
import { Template } from '../types'
import '../styles/window.css'

/**
 * Render window
 */
const Window = (label: string, iconPath: string): HTMLElement => {
  let isMaximized = false

  const maximizedStyle = 'width: 100vw; height: 100vh;'
  const defaultStyle = 'width: 400px; height: 400px;'

  const resize = (): void => {
    const maximizeIcon = document.getElementsByClassName('window-icon-maximize')[0]
    const minimizeIcon = document.getElementsByClassName('window-icon-minimize')[0]

    if (isMaximized) {
      htmlElement.setAttribute('style', defaultStyle)
      maximizeIcon.setAttribute('style', 'display: block')
      minimizeIcon.setAttribute('style', 'display: none')
    } else {
      htmlElement.setAttribute('style', maximizedStyle)
      maximizeIcon.setAttribute('style', 'display: none')
      minimizeIcon.setAttribute('style', 'display: block')
    }
    isMaximized = !isMaximized
  }

  const template: Template[] = [
    {
      tagName: 'div',
      class: 'window-container',
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
                  click: resize,
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
                  click: () => htmlElement.remove(),
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

  return htmlElement
}

export default Window
