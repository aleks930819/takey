import * as Express from 'express';

import { protect, restrictTo } from '../middlewares';
import { categoryValidation } from '../middlewares/validation';

import { categoryController } from '../controllers';
import menuItemRouter from './menu-item.routes';

const router = Express.Router();

//__________ Menu Items  __________//
router.use('/:categoryId/menu-items', menuItemRouter);

//__________ Categories  __________//
router.get('/', categoryController.getAllCategories);
router.post('/', protect, restrictTo('admin'), categoryValidation.validateCategory, categoryController.createCategory);

//__________ Category  __________//
router.get('/:categoryId', categoryController.getCategory);
router.delete('/:categoryId', protect, restrictTo('admin'), categoryController.deleteCategory);
router.patch('/:categoryId', protect, restrictTo('admin'), categoryController.updateCategory);

export default router;
