import * as Express from 'express';

import { favoriteController } from '../controllers';
import { protect } from '../middlewares';

const router = Express.Router();

//__________ Favorites  __________//
router.get('/', protect, favoriteController.getAllFavoritesLists);
router.post('/', protect, favoriteController.createFavoriteList);

//__________ Favorite  __________//
router.get('/:id', protect, favoriteController.getFavorite);
router.patch('/:id', protect, favoriteController.addToFavoriteList);
router.delete('/:id', protect, favoriteController.deleteFromFavoriteList);

export default router;
