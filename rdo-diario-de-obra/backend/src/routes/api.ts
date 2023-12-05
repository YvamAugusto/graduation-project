import { Router } from 'express';

import * as authController from '../controllers/authController';
import * as userController from '../controllers/userController';
import * as constructionController from '../controllers/constructionController';
import * as registerController from '../controllers/registerController';

const router = Router();

router.post('/login', authController.login);

router.get('/users', userController.findUsersByEngineer);
router.post('/users', userController.createUser);

router.get('/constructions', constructionController.getConstructions);
router.post('/constructions', constructionController.createConstruction);

router.get('/register', registerController.getRegisters);
router.get('/register/:id', registerController.getRegister);
router.post('register/', registerController.createRegister);

export default router;