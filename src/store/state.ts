import { State } from '../types'
import { createState } from './hooks'

const state = createState({
  windows: [],
  isMobile: false,
}) as State

export default state
