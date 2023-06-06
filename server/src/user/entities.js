import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
const prisma = new PrismaClient()
const saltRounds = 10;

export class NewUser {
  constructor(data) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }

  async encryptPassword() {
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);

    this.password = hashedPassword;
  }

  validate() {
    // TODO
  }

  async save() {
    await this.encryptPassword();

    const newUser = await prisma.user.create({
      data: {
        name: this.name,
        email: this.email,
        password: this.password,
      },
    })

    return newUser;
  }
}

export class Me {
  constructor({ token }) {
    this.token = token;
  }

  async checkUserSession() {
    const session = await prisma.session.findUnique({
      where: {
        token: this.token
      }
    })

    const user = await prisma.user.findUnique({
      where: {
        id: session.userId
      }
    })

    return user;
  }
}
