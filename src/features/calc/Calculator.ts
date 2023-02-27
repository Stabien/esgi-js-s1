import Window from '../../components/Window'
import { renderTemplate } from '../../helpers/render'
import { CalculatorData, Template } from '../../types'
import '../../styles/calculator.css'

const add = (num1: number, num2: number): number => {
  return num1+num2;
}

const minus = (num1: number, num2: number): number => {
  return num1-num2;
}

const multiply = (num1: number, num2: number): number => {
  return num1*num2;
}

const divide = (num1: number, num2: number): number => {
  return num1/num2;
}

const Calc = (e: Event, calc: CalculatorData, /* htmlContainer: HTMLElement,*/ htmlElement: Template[]): number|void => {
  console.log(htmlElement);
  const number1 = htmlElement[0].value;
  const number2 = htmlElement[2].value;
  const operator = htmlElement[1].value;
  
  switch (operator) {
    case "+":
      return add(number1, number2);
    case "-":
      return minus(number1, number2);
    case "*":
      return multiply(number1, number2);
    case "/":
      return divide(number1, number2);
    default: 
      return console.log("No valid operator given");
  }
}

const renderGridTemplate = (data: CalculatorData): Template[] => {
  const template: Template[] = []

  const number1: Template = {
    tagName: 'input',
    type: 'text',
    class: 'calculator-components',
    placeholder: 'Nombre 1'
  }
  template.push(number1)

  const operator: Template = {
    tagName: 'input',
    type: 'text',
    class: 'calculator-components',
    placeholder: '+, -, *, /'
  }
  template.push(operator)

  const number2: Template = {
    tagName: 'input',
    type: 'text',
    class: 'calculator-components',
    placeholder: 'Nombre 2'
  }
  template.push(number2)

  return template
}

const Calculator = (): HTMLElement => {
  const data: CalculatorData = {
    number1: 0,
    operator: '',
    number2: 0
  }

  const htmlWindow = Window('Calculatrice', '/icon_calculator.png', { width: 600, height: 600 })
  const gridTemplate = renderGridTemplate(data)

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
            class: 'calculator-title'
          },
        ],
      },
      {
        tagName: 'div',
        class: 'calculator-grid',
        children: gridTemplate,
      },
      {
        tagName: 'button',
        class: 'calculator-button',
        text: '=',
        click: (e) => Calc(e, data, template),
      },
    ],
  }

  const htmlElement = renderTemplate(template) as HTMLElement
  const parent = htmlWindow.getElementsByClassName('window-content')[0]

  parent.appendChild(htmlElement)

  return htmlWindow
}

export default Calculator
