import Layout from './layouts'
import { getNetworkLatency } from './services'
import { initializeSettings } from './store/actions'
import './styles/index.css'

const app = async (): Promise<void> => {
  await initializeSettings()

  const body = document.getElementsByTagName('body')[0]
  const layout = Layout()

  body.append(layout)
}

app().catch((e) => console.log(e))

getNetworkLatency()
  .then((latency) => console.log(latency))
  .catch((e) => console.log(e))
