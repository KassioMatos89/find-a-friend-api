import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserRegisterUseCase } from './user-register'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: UserRegisterUseCase

describe('User Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UserRegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@test.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password on registration', async () => {
    const password = '123456'

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@test.com',
      password,
    })

    const isPasswordCorrectlyHashed = await compare(
      password,
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register an email already registered', async () => {
    const email = 'john.doe@test.com'
    const password = '123456'

    await sut.execute({
      name: 'John Doe',
      email,
      password,
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password,
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
