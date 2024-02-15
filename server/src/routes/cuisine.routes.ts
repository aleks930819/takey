import * as Express from 'express';

import { protect, restrictTo } from '../middlewares';
import { cuisineValidation } from '../middlewares/validation';

import { cuisineController } from '../controllers';

const router = Express.Router();

//__________ Cuisines  __________//
router.get('/', cuisineController.getAllCuisines);
router.post('/', protect, restrictTo('admin'), cuisineValidation.validateCuisine, cuisineController.createCuisine);

//__________ Cuisine  __________//
router.get('/:id', cuisineController.getCuisine);
router.delete('/:id', protect, restrictTo('admin'), cuisineController.deleteCuisine);
router.patch('/:id', protect, restrictTo('admin'), cuisineController.updateCuisine);

export default router;
