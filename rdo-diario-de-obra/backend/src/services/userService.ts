import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

interface ICreateUser {
    name: string;
    cpf: string;
    password: string;
}

export const userService = {

    findUser: async (id: string) => {
        return await prisma.user.findUnique({
            where: {
                id
            }
        })
    },

    findUsersByEngineer: async (engineer_id: string) => {

        const engineerManagers = await prisma.engineerManager.findMany({
            where: {
                engineer_id
            }
        })
        const userIds = engineerManagers.map(engineerManager => engineerManager.manager_id)
        userIds.push(engineer_id)
        console.log(userIds)
        return await prisma.user.findMany({
            where: {
                id: {
                    in: userIds,
                }
            },
            select: {
                id: true,
                name: true
            }
        })
    },

    createUser: async ({ name, cpf, password }: ICreateUser) => {
        return await prisma.user.create({
            data: {
                name,
                cpf,
                password,
                role: 'MANAGER'
            }
        })
    },

    createRelationEngineerManager: async (engineer_id: string, manager_id: string) => {
        return await prisma.engineerManager.create({
            data: {
                engineer_id,
                manager_id
            }
        })
    }
}
