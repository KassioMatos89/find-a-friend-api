# App 

Find A Friend app.

## RF (Funcionalidades da aplicação)

- [] Deve ser possível cadastrar um pet
- [] Deve ser possível listar todos os pets disponíveis para adoção em uma determinada cidade.
- [] Deve ser possível filtrar pets com base em suas características (como idade, porte, etc.).
- [] Deve ser possível visualizar detalhes de um pet específico.
- [] Deve ser possível cadastrar uma ORG (Organização).
- [] Deve ser possível fazer login de uma ORG no sistema.

## RN (Regras de negócio)

- [] A informação da cidade é obrigatória para listar os pets.
- [] Uma ORG deve, obrigatóriamente, ter um endereço e um número de WhatsApp.
- [] Todo pet cadastrado precisa estar vinculado a uma ORG.
- [] O contado do usuário interessado em adotar um pet será feito diretamente com a ORG via WhatsApp.
- [] Todos os filtros de características do pet, com exceção da cidade, são opcionais.
- [] Para que uma ORG tenha acesso administrativo à aplicação, ela deve estar logada.