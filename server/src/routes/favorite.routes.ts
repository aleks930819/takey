import * as Express from 'express';

import { favoriteController } from '../controllers';
import { protect } from '../middlewares';

const router = Express.Router();

//__________ Favorites  __________//
router.post('/', protect, favoriteController.createFavoriteList);
//__________ Favorite  __________//
router.get('/:id', protect, favoriteController.getFavorite);
router.patch('/:id', protect, favoriteController.addToFavoriteList);
router.patch('/:id/remove', protect, favoriteController.removeFromTheFavoritesList);
// _________ Check  __________//
router.get('/check/:restaurantId', protect, favoriteController.checkIfRestaurantIsInFavorites);

export default router;
