import { renderTemplate } from '../helpers/createElement'
import { Template } from '../types'

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
              click: (e) => {
                const target = e.currentTarget as EventTarget as HTMLElement
                const container = target.closest('.window-container') as HTMLElement

                container.remove()
              },
            },
          ],
        },
      ],
    },
  ]

  const body = document.getElementsByTagName('body')[0]

  renderTemplate(template, body)
}
