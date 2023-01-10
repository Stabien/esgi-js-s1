import { renderTemplate } from '../helpers'
import { Template } from '../types'
import '../styles/window.css'

/**
 * Render window
 */
const Window = (label: string, iconPath: string): HTMLElement => {
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
                {
                  tagName: 'img',
                  class: 'window-header-icon',
                  src: iconPath,
                },
                {
                  tagName: 'h2',
                  class: 'window-header-title',
                  text: label,
                },
              ],
            },
            {
              tagName: 'div',
              class: 'window-header-buttons-container',
              text: 'x',
              click: () => htmlElement.remove(),
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
