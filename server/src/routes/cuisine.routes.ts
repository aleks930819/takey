import * as Express from 'express';

import { cuisineController } from '../controllers';
import { protect, restrictTo } from '../middlewares';

const router = Express.Router();

//__________ Cuisines  __________//
router.get('/', cuisineController.getAllCuisines);
router.post('/', protect, restrictTo('admin'), cuisineController.createCuisine);

//__________ Cuisine  __________//
router.get('/:id', cuisineController.getCuisine);
router.delete('/:id', protect, restrictTo('admin'), cuisineController.deleteCuisine);
router.patch('/:id', protect, restrictTo('admin'), cuisineController.updateCuisine);

export default router;
