import * as Express from 'express';

import { restaurantController } from '../controllers';

const router = Express.Router();

//__________ Restaurants  __________//
router.get('/', restaurantController.getAllRestaurants);
router.post('/', restaurantController.createRestaurant);

//__________ Restaurant  __________//
router.get('/:id', restaurantController.getRestaurant);
router.delete('/:id', restaurantController.deleteRestaurant);
router.patch('/:id', restaurantController.updateRestaurant);

export default router;
