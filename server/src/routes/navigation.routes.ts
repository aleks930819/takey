import * as Express from 'express';

import { protect, restrictTo } from '../middlewares';
import { navigationValidation } from '../middlewares/validation';

import { navigationController } from '../controllers';

const router = Express.Router();

//__________ Navigations  __________//
router.get('/', navigationController.getNavigations);
router.post(
  '/',
  protect,
  restrictTo('admin'),
  navigationValidation.validateNavigation,
  navigationController.createNavigation,
);

//__________ Navigation  __________//
router.get('/:id', navigationController.getNavigation);
router.delete('/:id', protect, restrictTo('admin'), navigationController.deleteNavigation);
router.patch('/:id', protect, restrictTo('admin'), navigationController.updateNavigation);

export default router;
