import * as Express from 'express';

import { protect, restrictTo } from '../middlewares';
import { staticPageValidation } from '../middlewares/validation';

import { staticPageController } from '../controllers';

const router = Express.Router();

//__________ Static Pages  __________//
router.get('/', staticPageController.getAllStaticPages);
router.post(
  '/',
  protect,
  restrictTo('admin'),
  staticPageValidation.validateStaticPage,
  staticPageController.createStaticPage,
);

//__________ Static Page  __________//
router.get('/:id', staticPageController.getStaticPage);
router.delete('/:id', protect, restrictTo('admin'), staticPageController.deleteStaticPage);
router.patch('/:id', protect, restrictTo('admin'), staticPageController.updateStaticPage);

export default router;
