import * as Express from 'express';

import { protect, restrictTo } from '../middlewares';

import { menuItemValidation } from '../middlewares/validation';

import { menuItemController } from '../controllers';

// Merge params from category router to access category id
const router = Express.Router({ mergeParams: true });

//__________ Menu Items  __________//
router.get('/', menuItemController.getAllMenuItems);
router.post('/', protect, restrictTo('admin'), menuItemValidation.validateMenuItem, menuItemController.createMenuItem);

//__________ Menu Item  __________//
router.get('/:menuItemId', menuItemController.getMenuItem);
router.delete('/:menuItemId', protect, restrictTo('admin'), menuItemController.deleteMenuItem);
router.patch('/:menuItemId', protect, restrictTo('admin'), menuItemController.updateMenuItem);

export default router;
