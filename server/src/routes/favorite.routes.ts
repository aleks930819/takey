import * as Express from 'express';

import { favoriteController } from '../controllers';
import { protect } from '../middlewares';

const router = Express.Router();

//__________ Favorites  __________//
router.get('/', protect, favoriteController.getAllFavoritesLists);
// router.post('/', protect, favoriteController.createCuisine);

//__________ Favorite  __________//
// router.get('/:id', protect, favoriteController.getCuisine);
// router.delete('/:id', protect, favoriteController.deleteCuisine);
// router.patch('/:id', protect, favoriteController.updateCuisine);

export default router;
