import * as Express from 'express';

import { restaurantController } from '../controllers';

import reviewRouter from './review.routes';
import { protect, restrictTo } from '../middlewares';

const router = Express.Router();

//__________ REVIEWS  __________//
router.use('/:restaurantId/reviews', reviewRouter);
//__________ Restaurants  __________//
router.get('/', restaurantController.getAllRestaurants);
router.post('/', protect, restrictTo('admin'), restaurantController.createRestaurant);

//__________ Restaurant  __________//
router.get('/:id', restaurantController.getRestaurant);
router.delete('/:id', protect, restrictTo('admin'), restaurantController.deleteRestaurant);
router.patch('/:id', protect, restrictTo('admin'), restaurantController.updateRestaurant);

export default router;
