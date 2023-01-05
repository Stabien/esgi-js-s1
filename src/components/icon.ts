import { createElement } from '../helpers/createElement'
import { Attributes } from '../types'

const focusStyle = `
  background-color: rgb(235, 244, 251, 0.7); 
  border-color: rgb(235, 244, 251, 0.7)
`
const defaultStyle = 'background-color: none; border-color: none'

/**
 * Render program icon
 */
export const icon = (label: string, imagePath: string, action: () => unknown): HTMLElement => {
  const attributes: Attributes = {
    container: {
      class: 'icon-container',
    },
    image: {
      src: imagePath,
    },
  }

  const container = createElement('div', attributes.container)
  const title = createElement('h2')
  const image = createElement('img', attributes.image)

  title.innerHTML = label

  container.appendChild(image)
  container.appendChild(title)

  // Apply focus style when clicking on icon.
  // If event click is outside icon, apply default style.
  document.addEventListener('click', (e) => {
    const currentTarget = e.target as HTMLElement
    if (currentTarget.closest('.icon-container') === container) {
      container.setAttribute('style', focusStyle)
    } else {
      container.setAttribute('style', defaultStyle)
    }
  })

  container.addEventListener('dblclick', action)

  return container
}
