import { PrismaClient } from "@prisma/client";
import Boom from '@hapi/boom'
import yup from 'yup'
import bcrypt from 'bcrypt';
const saltRounds = 10;

const prisma = new PrismaClient()

export class Login {
  constructor(data) {
    this.email = data.email;
    this.password = data.password;
  }

  encryptPassword() {
    // TODO
  }

  async validate() {
    const schema = yup.object({
      email: yup.string().email().required()
    })

    const value = {
      email: this.email
    }

    await schema.validate(value, { strict: true })
  }

  async findUser() {
    const user = await prisma.user.findUnique({
      where: {
        email: this.email,
      }
    });

    return user;
  }

  async tokenize(id) {
    const hash = await bcrypt.hash(String(id), saltRounds)

    return hash;
  }
}

export class Session {
  constructor(data) {
    this.token = data.token;
    this.user = data.user;
  }

  async save() {
    const session = await prisma.session.create({
      data: {
        token: this.token,
        user: {
          connect: { id: this.user.id },
        }
      }
    });

    return session
  }
}
