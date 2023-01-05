import { createElement } from '../helpers/createElement'
import { Attributes } from '../types'

export const icon = (label: string, imagePath: string, onClick: () => unknown): HTMLElement => {
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

  container.addEventListener('click', onClick)

  return container
}
