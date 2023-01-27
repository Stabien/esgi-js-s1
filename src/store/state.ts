import { createState } from '../helpers/reactivity'

const state = createState({
  windows: [],
  settings: {},
  isMobile: false,
  tictactoeScores: [],
})

export default state
