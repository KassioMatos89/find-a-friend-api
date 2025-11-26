export class OrgAlreadyExistsError extends Error {
  constructor() {
    super('Org e-mail already exists.')
  }
}
