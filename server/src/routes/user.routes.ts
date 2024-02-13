import * as Express from 'express';

import { userController } from '../controllers';
import authController from '../controllers/auth.controller';
import { protect, restrictTo } from '../middlewares';
import { favoriteRouter } from '.';

const router = Express.Router();

//__________ Favorites  __________//
router.use('/:userId/favorites', favoriteRouter);
//__________ Auth  __________//
router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/me', protect, authController.getMe);
router.patch('/me', protect, authController.updateMe);
router.delete('/me', protect, authController.deleteMe);
//__________ PROTECT ALL ROUTES AFTER THIS MIDDLEWARE __________//
router.use(protect, restrictTo('admin'));
//__________ Users  __________//
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
//__________ User  __________//
router.get('/:id', userController.getUser);
router.delete('/:id', userController.deleteUser);
router.patch('/:id', userController.updateUser);

export default router;
