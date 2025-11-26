import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  async findByEmail(email: string) {
    const user = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }
}
