import { Login, Session } from './entities.js';

export async function login(req, res, next) {
  const login = new Login(req.body)

  try {
    await login.validate()
    const user = await login.findUser()

    const token = await login.tokenize(user.id)

    res.cookie('session', token, {
      maxAge: 3600000, // Cookie expiration time in milliseconds
      httpOnly: true, // Restrict cookie access to HTTP(S) only
      secure: true, // Serve the cookie only over HTTPS
    })

    const session = new Session({ token, user })
    await session.save()

    res.json({ user });
  } catch (error) {
    next(error)
  }
}
