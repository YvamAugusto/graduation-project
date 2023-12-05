import { Request, Response } from 'express';
import { authService } from '../services/authService'

export const login = async (req: Request, res: Response) => {
    const { cpf, password } = req.body;
    if (cpf && password) {
        const jwt = await authService.login(cpf, password);
        if (jwt) {
            res.status(200).json({ access_token: jwt });
        } else {
            res.status(401).json({ message: 'Dados inseridos inválidos' });
        }
    } else {
        res.status(400).json({ message: 'Dados não preenchidos' });
    }
}