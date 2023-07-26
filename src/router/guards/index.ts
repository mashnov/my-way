import type { Guard } from '@/helpers/types/router'
// import { Names } from '@/helpers/enum/router'

import { requiresUnauthorized, requiresAuthorized } from './auth'

const guards = (options: Guard) => {
  const requiresUnauthorizedResult = requiresUnauthorized(options)
  const requiresAuthorizedResult = requiresAuthorized(options)
  if (!requiresUnauthorizedResult) {
    // todo
    // options.next({ name: Router.PROFILE })
  } else if (!requiresAuthorizedResult) {
    // options.next({ name: Router.LOGIN })
    // options.next({ name: Names.PROFILE })
  } else {
    // options.next()
  }
  options.next()
}

export default guards
