import { navbar } from './features/navbar'

const main = (): void => {
  const mainElement = document.getElementsByTagName('main')[0]
  navbar(mainElement)
}

main()
