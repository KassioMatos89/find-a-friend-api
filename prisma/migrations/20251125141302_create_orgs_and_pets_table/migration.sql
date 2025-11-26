-- CreateEnum
CREATE TYPE "Stage" AS ENUM ('Filhote', 'Adulto');

-- CreateEnum
CREATE TYPE "PET_SIZE" AS ENUM ('Pequenino', 'Médio', 'Grande');

-- CreateEnum
CREATE TYPE "Energy" AS ENUM ('Baixa', 'Moderada', 'Alta');

-- CreateEnum
CREATE TYPE "Independence" AS ENUM ('Baixa', 'Moderada', 'Alta');

-- CreateEnum
CREATE TYPE "Environment" AS ENUM ('Pequeno', 'Moderado', 'Amplo');

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "life_stage" "Stage" NOT NULL DEFAULT 'Filhote',
    "size" "PET_SIZE" NOT NULL DEFAULT 'Pequenino',
    "energy_level" "Energy" NOT NULL DEFAULT 'Moderada',
    "independence_level" "Independence" NOT NULL DEFAULT 'Moderada',
    "environment" "Environment" NOT NULL DEFAULT 'Moderado',
    "city" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
