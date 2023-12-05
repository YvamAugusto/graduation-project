import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ICreateConstruction {
    name: string;
    address: string;
    engineer_id: string;
    manager_id: string;
}

export const constructionService = {

    getConstructionsByManager: async (id: string) => {
        return await prisma.construction.findMany({
            where: {
                manager_id: id
            },
            include: {
                manager: {
                    select: {
                        name: true
                    }
                }
            }
        });
    },

    getConstructionsByEngineer: async (id: string) => {
        return await prisma.construction.findMany({
            where: {
                engineer_id: id
            },
            include: {
                manager: {
                    select: {
                        name: true
                    }
                }
            }
        });
    },

    createConstruction: async ({ name, address, engineer_id, manager_id }: ICreateConstruction) => {
        return await prisma.construction.create({
            data: {
                name,
                address,
                engineer_id,
                manager_id
            }
        })
    }
}