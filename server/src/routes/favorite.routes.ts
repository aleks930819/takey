import * as Express from 'express';

import { favoriteController } from '../controllers';
import { protect } from '../middlewares';

const router = Express.Router();

//__________ Favorites  __________//
router.post('/', protect, favoriteController.createFavoriteList);
//__________ Favorite  __________//
router.get('/', protect, favoriteController.getFavorite);
router.post('/add', protect, favoriteController.addToFavoriteList);
router.delete('/remove/:restaurantId', protect, favoriteController.removeFromTheFavoritesList);
// _________ Check  __________//
router.get('/check/:restaurantId', protect, favoriteController.checkIfRestaurantIsInFavorites);

export default router;
