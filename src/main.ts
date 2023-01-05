import { navbar } from './features/navbar'
import { icon } from './components/icon'
import { createElement } from './helpers/createElement'

const main = (): void => {
  const mainElement = document.getElementsByTagName('main')[0]
  const iconList = createElement('div', { class: 'icon-list' })
  const calculatorIcon = icon('Calculatrice', '/icon_calculator.png', () => {
    console.log('test')
  })

  mainElement.appendChild(iconList)
  iconList.appendChild(calculatorIcon)

  for (let i = 0; i < 10; i++) {
    iconList.appendChild(
      icon('Calculatrice', '/icon_calculator.png', () => {
        console.log('test')
      }),
    )
  }

  navbar(mainElement)
}

main()
