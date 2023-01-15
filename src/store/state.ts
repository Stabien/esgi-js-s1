import { State } from '../types'
import { createState } from '../helpers/reactivity'

const state = createState({
  windows: [],
  isMobile: false,
}) as State

export default state
