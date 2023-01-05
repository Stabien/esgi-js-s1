import { createElement } from '../helpers/createElement'
import { Attributes } from '../types'

/**
 * Render window
 */
export const window = (label: string): void => {
  const attributes: Attributes = {
    container: {
      class: 'window-container',
    },
    header: {
      class: 'window-header',
    },
    headerTitleContainer: {
      class: 'header-title-container',
    },
    headerButtonsContainer: {
      class: 'header-buttons-container',
    },
  }

  const body = document.getElementsByTagName('body')[0]

  const container = createElement('div', attributes.container)
  const header = createElement('div', attributes.header)

  const headerTitleContainer = createElement('div', attributes.headerTitleContainer)
  const headerButtonsContainer = createElement('div', attributes.headerButtonsContainer)

  headerTitleContainer.innerHTML = label

  headerButtonsContainer.addEventListener('click', () => {
    container.remove()
  })

  header.appendChild(headerTitleContainer)
  header.appendChild(headerButtonsContainer)

  container.appendChild(header)

  body.appendChild(container)
}
