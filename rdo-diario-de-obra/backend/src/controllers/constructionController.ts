import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { constructionService } from "../services/constructionService";

const secretKey = "JRy&umI117>m!02N<e"

export const getConstructions = async (req: Request, res: Response) => {
    let bearerToken = req.headers.authorization;
    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
        throw new Error();
    }
    const [, token] = bearerToken.split(' ');
    const decoded = jwt.verify(token, secretKey) as any;
    if (decoded.role === 'MANAGER') {
        const constructions = await constructionService.getConstructionsByManager(decoded.id);
        res.json(constructions);
    } else if (decoded.role === 'ENGINEER') {
        const constructions = await constructionService.getConstructionsByEngineer(decoded.id);
        res.json(constructions);
    } else {
        res.status(401).json({ message: 'Não autorizado' });
    }
}

export const createConstruction = async (req: Request, res: Response) => {
    let bearerToken = req.headers.authorization;
    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
        throw new Error();
    }
    const [, token] = bearerToken.split(' ');
    const decoded = jwt.verify(token, secretKey) as any;
    let engineer_id = decoded.id;
    const { name, address, manager_id } = req.body;
    console.log(name, address, manager_id);
    if (name && address && manager_id) {
        const construction = await constructionService.createConstruction({ name, address, engineer_id, manager_id });
        res.status(201).json({ message: 'Obra criada com sucesso', construction: construction });
    } else {
        res.status(400).json({ message: 'Dados não preenchidos' });
    }
}