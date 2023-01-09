import layout from './layouts'
import './styles/index.css'

const main = (): void => {
  const body = document.getElementsByTagName('body')[0]

  layout(body)
}

main()
