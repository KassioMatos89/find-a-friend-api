import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgRegisterUseCase } from './org-register'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: OrgRegisterUseCase

describe('Org Register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new OrgRegisterUseCase(orgsRepository)
  })

  it('should be able to register', async () => {
    const { org } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@test.com',
      password: '123456',
      cep: '86040',
      address: '	3 N Lake Powell Blvd',
      whatsapp: '(866) 733-2693',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash user password on registration', async () => {
    const password = '123456'

    const { org } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@test.com',
      password: '123456',
      cep: '86040',
      address: '	3 N Lake Powell Blvd',
      whatsapp: '(866) 733-2693',
    })

    const isPasswordCorrectlyHashed = await compare(password, org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register an email already registered', async () => {
    const email = 'john.doe@test.com'
    const password = '123456'

    await sut.execute({
      name: 'John Doe',
      email,
      password,
      cep: '86040',
      address: '	3 N Lake Powell Blvd',
      whatsapp: '(866) 733-2693',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password,
        cep: '86040',
        address: '	3 N Lake Powell Blvd',
        whatsapp: '(866) 733-2693',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
