import Window from '../../components/window'
import { renderTemplate } from '../../helpers/render'
import { Template } from '../../types'
import '../../styles/calculator.css'

const add = (num1: number, num2: number): number => {
  return num1 + num2
}

const minus = (num1: number, num2: number): number => {
  return num1 - num2
}

const multiply = (num1: number, num2: number): number => {
  return num1 * num2
}

const divide = (num1: number, num2: number): number => {
  return num1 / num2
}

const calc = (htmlElement: HTMLElement): void => {
  const htmlInputs = htmlElement.getElementsByClassName(
    'calculator-components',
  ) as HTMLCollectionOf<HTMLInputElement>
  const htmlResult = htmlElement.getElementsByClassName('calculator-result')[0] as HTMLInputElement
  const number1 = parseInt(htmlInputs[0].value)
  const number2 = parseInt(htmlInputs[2].value)
  const operator = htmlInputs[1].value
  let res = 0

  if (operator === '+') res = add(number1, number2)
  else if (operator === '-') res = minus(number1, number2)
  else if (operator === '*') res = multiply(number1, number2)
  else if (operator === '/') {
    if (number2 === 0) window.alert("Can't divide by 0")
    else res = divide(number1, number2)
  } else window.alert('No valid operator given')

  htmlResult.value = res.toString()
}

const renderGridTemplate = (): Template[] => {
  const template: Template[] = []

  const number1: Template = {
    tagName: 'input',
    type: 'text',
    class: 'calculator-components',
    placeholder: 'Nombre 1',
    'data-index': 1,
  }
  template.push(number1)

  const operator: Template = {
    tagName: 'select',
    type: 'text',
    class: 'calculator-components',
    placeholder: '+, -, *, /',
    'data-index': 2,
    children: [
      {
        tagName: 'option',
        value: '',
        text: 'Operateur',
      },
      {
        tagName: 'option',
        value: '+',
        text: '+',
      },
      {
        tagName: 'option',
        value: '-',
        text: '-',
      },
      {
        tagName: 'option',
        value: '*',
        text: '*',
      },
      {
        tagName: 'option',
        value: '/',
        text: '/',
      },
    ],
  }
  template.push(operator)

  const number2: Template = {
    tagName: 'input',
    type: 'text',
    class: 'calculator-components',
    placeholder: 'Nombre 2',
    'data-index': 3,
  }
  template.push(number2)

  const equalButton: Template = {
    tagName: 'button',
    class: 'calculator-button',
    text: '=',
  }
  template.push(equalButton)

  return template
}

const Calculator = (): HTMLElement => {
  const htmlWindow = Window('Calculatrice', 'icon_calculator.png', { width: 600, height: 600 })
  const gridTemplate = renderGridTemplate()

  const template: Template = {
    tagName: 'div',
    class: 'calculator-container',
    children: [
      {
        tagName: 'div',
        class: 'calculator-header',
        children: [
          {
            tagName: 'h1',
            text: 'Calculatrice',
            class: 'calculator-title',
          },
        ],
      },
      {
        tagName: 'div',
        class: 'calculator-grid',
        children: gridTemplate,
      },
      {
        tagName: 'input',
        readonly: 'readonly',
        class: 'calculator-result',
      },
    ],
  }

  const htmlElement = renderTemplate(template) as HTMLElement
  const parent = htmlWindow.getElementsByClassName('window-content')[0]
  const htmlButton = htmlElement.getElementsByClassName('calculator-button')[0]
  htmlButton.addEventListener('click', () => calc(htmlElement))

  parent.appendChild(htmlElement)

  return htmlWindow
}

export default Calculator
