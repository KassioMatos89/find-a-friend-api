import { OrgRegisterUseCase } from '../org-register'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeOrgRegisterUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const registerUseCase = new OrgRegisterUseCase(prismaOrgsRepository)

  return registerUseCase
}
