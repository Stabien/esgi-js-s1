import { AnyObject } from '../types'
import { createState } from './hooks'

const state = createState({
  windows: [],
}) as AnyObject

export default state
