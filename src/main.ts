import Layout from './layouts'
import './styles/index.css'

const app = (): void => {
  const body = document.getElementsByTagName('body')[0]
  const layout = Layout()

  body.append(layout)
}

app()
