import { Request, Response } from 'express'
import jwt from "jsonwebtoken";
import { userService } from '../services/userService'

const secretKey = "JRy&umI117>m!02N<e"

export const findUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await userService.findUser(id);
    if (user) {
        res.status(200).json({ message: 'Usuário encontrado', user: user });
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
}

export const findUsersByEngineer = async (req: Request, res: Response) => {
    let bearerToken = req.headers.authorization;
    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
        throw new Error();
    }
    const [, token] = bearerToken.split(' ');
    const decoded = jwt.verify(token, secretKey) as any;
    const users = await userService.findUsersByEngineer(decoded.id);
    if (users) {
        res.status(200).json({ message: 'Usuários encontrados', users: users });
    } else {
        res.status(404).json({ message: 'Usuários não encontrados' });
    }
}

export const createUser = async (req: Request, res: Response) => {
    let bearerToken = req.headers.authorization;
    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
        throw new Error();
    }
    const [, token] = bearerToken.split(' ');
    const decoded = jwt.verify(token, secretKey) as any;
    const { name, cpf, password } = req.body;
    if (name && cpf && password) {
        const createdUser = await userService.createUser({ name, cpf, password });
        await userService.createRelationEngineerManager(decoded.id, createdUser.id);
        res.status(201).json({ message: 'Usuário criado com sucesso' });
    } else {
        res.status(400).json({ message: 'Dados não preenchidos' });
    }
}