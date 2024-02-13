import { Request, Response } from 'express';

import { RESPONSE_STATUS } from '../constants';
import { Favorite } from '../models';
import { asnycHandler } from '../middlewares';

/**
 * Retrieves a favorite of a user by the user ID.
 *
 * @route GET /api/v1/users/:userId/favorites
 * @access Public
 * @returns A JSON response containing the Favorite.
 */
const getFavorite = asnycHandler(async (req: Request, res: Response) => {
  const userId = req.body.userId;

  const favorite = await Favorite.findOne({ user: userId || req.user._id }).populate('restaurants');

  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      favorite
    }
  });
});
/**
 * Creates a new favorite list.
 *
 * @route POST /api/v1/users/:userId/favorites
 * @access Private
 * @returns A JSON response containing the new Favorite.
 */
const createFavoriteList = asnycHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const favorite = await Favorite.create({
    user: userId || req.user._id
  });

  res.status(201).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      favorite
    }
  });
});
/**
 * Delete from favorite list by its ID.
 *
 * @route DELETE /api/v1/users/:userId/favorites/remove/:restaurantId
 * @access Private
 * @returns A JSON response containing the updated Favorite.
 */
const removeFromTheFavoritesList = asnycHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const restaurantId = req.params.restaurantId;

  const favoriteslist = await Favorite.findOne({ user: userId || req.user._id });

  if (!favoriteslist) {
    res.status(403);
    throw new Error('You are not allowed to perform this action.');
  }

  const newFavoritelist = await Favorite.findByIdAndUpdate(
    favoriteslist._id,
    {
      $pull: { restaurants: restaurantId }
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      newFavoritelist
    }
  });
});

/**
 * Adds a restaurant to the user's favorite list.
 *
 * @route POST /api/v1/users/:userId/favorites/add
 * @access Private
 * @returns A JSON response containing the updated Favorite.
 */
const addToFavoriteList = asnycHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const reastaurantId = req.body.reastaurantId;

  const isRestaurantInFavorite = await Favorite.isRestaurantInFavorite(reastaurantId);

  const favoritesList = await Favorite.findOne({ user: userId || req.user._id });

  if (!favoritesList) {
    res.status(403);
    throw new Error('You are not allowed to perform this action.');
  }

  if (isRestaurantInFavorite) {
    res.status(400);
    throw new Error('Restaurant already in the list');
  }

  if (!reastaurantId) {
    res.status(400);
    throw new Error('Restaurant ID is required');
  }

  const favorite = await Favorite.findByIdAndUpdate(
    favoritesList._id,
    {
      $push: { restaurants: reastaurantId }
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      favorite
    }
  });
});

/**
 * Check if a restaurant is in the favorites list.
 *
 * @route GET /api/v1/users/:userId/favorites/check/:restaurantId
 * @access Private
 * @returns A JSON response indicating whether the restaurant is in the favorites list.
 */
const checkIfRestaurantIsInFavorites = asnycHandler(async (req: Request, res: Response) => {
  const restaurantId = req.params.restaurantId;

  const isRestaurantInFavorite = await Favorite.isRestaurantInFavorite(restaurantId);

  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      isRestaurantInFavorite: !!isRestaurantInFavorite
    }
  });
});

const favoriteController = {
  createFavoriteList,
  getFavorite,
  addToFavoriteList,
  checkIfRestaurantIsInFavorites,
  removeFromTheFavoritesList
};

export default favoriteController;
