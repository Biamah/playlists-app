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

  async encryptPassword() {
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);

    this.password = hashedPassword;
  }

  async validate() {
    const schema = yup.object({
      email: yup.string().email().required(),
      password: yup.string().min(8).required()
    })

    const value = {
      email: this.email,
      password: this.password
    }

    await schema.validate(value, { strict: true });
    await this.encryptPassword();
  }

  async findUser() {
    const user = await prisma.user.findUnique({
      where: {
        email: this.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
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
