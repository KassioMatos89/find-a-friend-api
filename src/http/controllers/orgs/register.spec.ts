import request from 'supertest'
import { app } from '@/app'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

describe('Org Register e2e', () => {
  beforeEach(() => {
    app.ready()
  })

  afterEach(() => {
    app.close()
  })

  it('should be able to register an org', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'John Doe',
      email: 'john.doe@test.com',
      password: '123456',
      cep: '86040',
      address: '3 N Lake Powell Blvd',
      whatsapp: '11997332693',
    })

    expect(response.statusCode).toEqual(201)
  })
})
