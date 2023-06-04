import { NewUser, Me } from './entities.js';

export async function create(req, res, next) {
  const user = new NewUser(req.body)

  try {
    user.validate()
    const newUser = await user.save()
    res.json(newUser)
  } catch (error) {
    next(error)
  }
}

export async function me(req, res) {
  res.json(req.user)
}
