import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export class NewUser {
  constructor(data) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }

  encryptPassword() {
    // TODO
  }

  validate() {
    // TODO
  }

  async save() {
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
