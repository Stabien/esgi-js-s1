import { renderTemplate } from '../helpers/createElement'
import { Template } from '../types'
import '../styles/icon.css'

const focusStyle = `
  background-color: rgb(235, 244, 251, 0.7); 
  border-color: rgb(235, 244, 251, 0.7)
`
const defaultStyle = 'background-color: none; border-color: none'

/**
 * Render program icon
 */
export const icon = (label: string, imagePath: string, action: () => unknown): HTMLElement => {
  const dblclickContainer = (): void => {
    action()
    container.setAttribute('style', defaultStyle)
  }

  const template: Template[] = [
    {
      tagName: 'div',
      class: 'icon-container',
      dblclick: dblclickContainer,
      children: [
        {
          tagName: 'img',
          src: imagePath,
        },
        {
          tagName: 'h2',
          text: label,
        },
      ],
    },
  ]

  const container = renderTemplate(template)
  // Apply focus style when clicking on icon.
  // If event click is outside icon, apply default style.
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (target.closest('.icon-container') === container) {
      container.setAttribute('style', focusStyle)
    } else {
      container.setAttribute('style', defaultStyle)
    }
  })
  return container
}
