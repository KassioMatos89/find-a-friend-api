import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeOrgRegisterUseCase } from '@/use-cases/factories/make-org-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    cep: z.string().min(5).max(9),
    address: z.string().max(255),
    whatsapp: z.string().max(11),
  })

  const { name, email, password, cep, address, whatsapp } =
    registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeOrgRegisterUseCase()

    await registerUseCase.execute({
      name,
      email,
      password,
      cep,
      address,
      whatsapp,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
