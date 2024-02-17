import * as Express from 'express';

import { protect, restrictTo } from '../middlewares';
import { categoryValidation } from '../middlewares/validation';

import { categoryController } from '../controllers';

const router = Express.Router();

//__________ Categories  __________//
router.get('/', categoryController.getAllCategories);
router.post('/', protect, restrictTo('admin'), categoryValidation.validateCategory, categoryController.createCategory);

//__________ Category  __________//
router.get('/:id', categoryController.getCategory);
router.delete('/:id', protect, restrictTo('admin'), categoryController.deleteCategory);
router.patch('/:id', protect, restrictTo('admin'), categoryController.updateCategory);

export default router;
