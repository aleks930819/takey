import * as Express from 'express';

import { protect, restrictTo } from '../middlewares';
import { authValidation } from '../middlewares/validation';

import favoriteRouter from './favorite.routes';
import { userController } from '../controllers';
import authController from '../controllers/auth.controller';

const router = Express.Router();

//__________ Favorites  __________//
router.use('/:userId/favorites', favoriteRouter);
//__________ Auth  __________//
router.post('/login', authValidation.validateLogin, authController.login);
router.post('/register', authValidation.validateRegister, authController.register);
router.get('/me', protect, authController.getMe);
router.patch('/me', protect, authController.updateMe);
router.delete('/me', protect, authController.deleteMe);
router.post('/auth/refresh-token', authController.refreshAuthToken);
router.post('/reset-password', userController.sednResetPasswordToken);
router.post('/set-new-password', userController.setNewPassword);
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
