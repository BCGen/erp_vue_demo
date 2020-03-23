import { auth } from './auth'
import { notify } from './notify'

export const page = {
  mixins: [auth, notify]
}
