import * as Express from 'express';

import { cuisineController } from '../controllers';

const router = Express.Router();

//__________ Cuisines  __________//
router.get('/', cuisineController.getAllCuisines);
router.post('/', cuisineController.createCuisine);

//__________ Cuisine  __________//
router.get('/:id', cuisineController.getCuisine);
router.delete('/:id', cuisineController.deleteCuisine);
router.patch('/:id', cuisineController.updateCuisine);

export default router;
