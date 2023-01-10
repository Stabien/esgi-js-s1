import Navbar from '../features/Navbar'
import Icon from '../components/Icon'
import { renderTemplate } from '../helpers'
import Window from '../components/Window'
import { Template } from '../types'

const layout = (): HTMLElement => {
  const template: Template[] = [
    {
      tagName: 'main',
      children: [
        {
          tagName: 'div',
          children: [
            {
              tagName: 'div',
              class: 'icon-list',
            },
          ],
        },
        {
          tagName: 'img',
          class: 'background',
          src: '/background.jpg',
          alt: 'background',
        },
      ],
    },
  ]

  const htmlElement = renderTemplate(template) as HTMLElement
  const iconList = htmlElement.getElementsByClassName('icon-list')[0]
  const body = document.getElementsByTagName('body')[0]

  const navbar = Navbar()

  for (let i = 0; i < 10; i++) {
    iconList.appendChild(
      Icon('Calculatrice', '/icon_calculator.png', () => {
        body.appendChild(Window('Calculatrice', '/icon_calculator.png'))
      }),
    )
  }

  htmlElement.append(navbar)

  return htmlElement
}

export default layout
