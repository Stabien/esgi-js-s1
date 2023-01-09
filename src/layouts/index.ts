import { navbar } from '../features/navbar'
import { icon } from '../components/icon'
import { renderTemplate } from '../helpers/createElement'
import { window } from '../components/window'
import { Template } from '../types'

const layout = (parent: HTMLElement): HTMLElement => {
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

  const htmlElement = renderTemplate(template, parent)
  const iconList = htmlElement.getElementsByClassName('icon-list')[0]

  for (let i = 0; i < 10; i++) {
    iconList.appendChild(
      icon('Calculatrice', '/icon_calculator.png', () => {
        window('Calculatrice', '/icon_calculator.png')
      }),
    )
  }

  navbar(htmlElement)
  console.log(htmlElement)

  return htmlElement
}

export default layout
