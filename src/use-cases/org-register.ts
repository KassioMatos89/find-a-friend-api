import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface OrgRegisterUseCaseRequest {
  name: string
  email: string
  password: string
  cep: string
  address: string
  whatsapp: string
}

interface OrgRegisterUseCaseResponse {
  org: Org
}

export class OrgRegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    password,
    cep,
    address,
    whatsapp,
  }: OrgRegisterUseCaseRequest): Promise<OrgRegisterUseCaseResponse> {
    const userWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash,
      cep,
      address,
      whatsapp,
    })

    return {
      org,
    }
  }
}
