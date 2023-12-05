import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {

    await prisma.engineerManager.deleteMany({})
    await prisma.user.deleteMany({})
    await prisma.construction.deleteMany({})
    await prisma.record.deleteMany({})
    await prisma.climateCondition.deleteMany({})
    await prisma.activity.deleteMany({})
    await prisma.occurrence.deleteMany({})
    await prisma.materialUsed.deleteMany({})
    await prisma.workforce.deleteMany({})
    await prisma.image.deleteMany({})

    const enginner = await prisma.user.create({
        data: {
            name: 'Yvam Augusto',
            cpf: '000.000.000-00',
            password: 'password',
            role: 'ENGINEER'
        }
    })

    const manager = await prisma.user.create({
        data: {
            name: 'José da Silva',
            cpf: '999.999.999-99',
            password: '12345',
            role: 'MANAGER'
        }
    })

    const engineerManager = await prisma.engineerManager.create({
        data: {
            engineer_id: enginner.id,
            manager_id: manager.id
        }
    })

    const construction = await prisma.construction.create({
        data: {
            name: 'Condomínio Flores',
            address: 'Rua Edgar Cunha, nº 290, Orleans/SC',
            engineer_id: enginner.id,
            manager_id: manager.id
        }
    })
}

main()