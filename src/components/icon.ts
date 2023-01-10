import { renderTemplate } from '../helpers'
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
const Icon = (label: string, imagePath: string, action: () => unknown): HTMLElement => {
  const dblclickContainer = (): void => {
    action()
    htmlElement.setAttribute('style', defaultStyle)
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

  const htmlElement = renderTemplate(template) as HTMLElement

  // Apply focus style when clicking on icon.
  // If event click is outside icon, apply default style.
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (target.closest('.icon-container') === htmlElement) {
      htmlElement.setAttribute('style', focusStyle)
    } else {
      htmlElement.setAttribute('style', defaultStyle)
    }
  })
  return htmlElement
}

export default Icon
