import { renderTemplate } from '../helpers/createElement'
import { Template } from '../types'
import '../styles/window.css'

/**
 * Render window
 */
export const window = (label: string, iconPath: string): void => {
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
              click: () => container.remove(),
            },
          ],
        },
      ],
    },
  ]

  const body = document.getElementsByTagName('body')[0]
  const container = renderTemplate(template, body)
}
