import Boom from '@hapi/boom'
import { Me } from '../src/user/entities.js'

export async function needAuthentication(req, res, next) {
  const session = req.cookies.session;

  try {
    const me = new Me({ token: session })
    const user = await me.checkUserSession()
    req.user = user;
  } catch {
    next(Boom.unauthorized())
  }

  next()
}
