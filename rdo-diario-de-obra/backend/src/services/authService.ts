import { PrismaClient } from '@prisma/client'
import jwtService from './jwtService'

const prisma = new PrismaClient()

export const authService = {

    login: async (cpf: string, password: string) => {
        const user = await prisma.user.findFirst({
            where: {
                cpf: cpf,
                password: password
            }
        })
        if (user) {
            return jwtService.generateToken({ id: user.id, /*name: user.name, cpf: user.cpf,*/ role: user.role })
        } else {
            return null
        }
    }
}