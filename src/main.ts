import { navbar } from './features/navbar'
import { icon } from './components/icon'
import { createElement } from './helpers/createElement'
import { window } from './components/window'

const main = (): void => {
  const mainElement = document.getElementsByTagName('main')[0]
  const iconList = createElement('div', { class: 'icon-list' })

  mainElement.appendChild(iconList)

  for (let i = 0; i < 10; i++) {
    iconList.appendChild(
      icon('Calculatrice', '/icon_calculator.png', () => {
        window('Calculatrice', '/icon_calculator.png')
      }),
    )
  }

  navbar(mainElement)
}

main()
