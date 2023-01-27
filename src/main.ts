import initDB from './database'
import Layout from './layouts'
import { initializeSettings } from './store/actions'
import './styles/index.css'

const app = async (): Promise<void> => {
  initDB()
  await initializeSettings()

  const body = document.getElementsByTagName('body')[0]
  const layout = Layout()

  body.append(layout)
}

app().catch((e) => console.log(e))
