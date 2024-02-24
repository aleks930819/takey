import * as Express from 'express';

import { protect, restrictTo } from '../middlewares';

import { orderValidation } from '../middlewares/validation';

import { orderController } from '../controllers';

const router = Express.Router();

//__________ Orders  __________//
router.get('/', protect, restrictTo('admin'), orderController.getAllOrders);
router.post('/', orderValidation.validateOrder, orderController.createOrder);

//__________ User Orders  __________//
router.get('/my-orders', protect, orderController.getUserOrders);
router.get('/my-orders/:id', protect, orderController.getSingleUserOrder);

export default router;
