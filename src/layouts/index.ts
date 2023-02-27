import Navbar from '../features/navbar/Navbar'
import Icon from '../components/icon'
import { renderTemplate } from '../helpers/render'
import { Template } from '../types'
import Tictactoe from '../features/tictactoe/Tictactoe'
import Clock from '../features/clock/Clock'
import Settings from '../features/settings/Settings'
import Calculatrice from '../features/calc/Calculator'

const Layout = (): HTMLElement => {
  const template: Template = {
    tagName: 'main',
    children: [
      {
        tagName: 'div',
        class: 'main-content',
        children: {
          tagName: 'div',
          class: 'icon-list',
        },
      },
      {
        tagName: 'img',
        class: 'background',
        src: 'background.jpg',
        alt: 'background',
      },
    ],
  }

  const htmlElement = renderTemplate(template) as HTMLElement
  const iconList = htmlElement.getElementsByClassName('icon-list')[0]
  const mainContent = htmlElement.getElementsByClassName('main-content')[0]

  const navbar = Navbar()

  iconList.appendChild(
    Icon('TicTacToe', 'icon_tictactoe.png', () => {
      mainContent.appendChild(Tictactoe())
    }),
  )

  iconList.appendChild(
    Icon('Horloge', 'icon_clock.png', () => {
      mainContent.appendChild(Clock())
    }),
  )

  iconList.appendChild(
    Icon('Paramètres', 'icon_settings.png', () => {
      mainContent.appendChild(Settings())
    }),
  )

  iconList.appendChild(
    Icon('Calculatrice', 'icon_calculator.png', () => {
      mainContent.appendChild(Calculatrice())
    }),
  )

  htmlElement.append(navbar)

  return htmlElement
}

export default Layout
