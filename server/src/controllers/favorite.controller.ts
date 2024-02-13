import { Request, Response } from 'express';

import { RESPONSE_STATUS } from '../constants';
import { Favorite } from '../models';
import { asnycHandler } from '../middlewares';

/**
 * Retrieves a favorite by its ID.
 *
 * @route GET /api/v1/users/:userId/favorites/:id
 * @access Public
 * @returns A JSON response containing the Favorite.
 */
const getFavorite = asnycHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const favorite = await Favorite.findById(id)
    .populate('restaurants')
    .populate('user');

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
  const { userId } = req.body;

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
 * @route PATCH /api/v1/users/:userId/favorites/:id/remove
 * @access Private
 * @returns A JSON response containing the updated Favorite.
 */
const removeFromTheFavoritesList = asnycHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const reastaurantId = req.body.reastaurantId;

  const checkIfTheCurrentUserIsOwner = await Favorite.findOne({ _id: id, user: req.user._id });

  if (!checkIfTheCurrentUserIsOwner) {
    res.status(403);
    throw new Error('You are not allowed to perform this action.');
  }

  const favorite = await Favorite.findByIdAndUpdate(
    id,
    {
      $pull: { restaurants: reastaurantId }
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
 * Update a favorite by its ID.
 *
 * @route PATCH /api/v1/users/:userId/favorites/:id
 * @access Private
 * @returns A JSON response containing the updated Favorite.
 */
const addToFavoriteList = asnycHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const reastaurantId = req.body.reastaurantId;

  const isRestaurantInFavorite = await Favorite.isRestaurantInFavorite(reastaurantId);
  const checkIfTheCurrentUserIsOwner = await Favorite.findOne({ _id: id, user: req.user._id });

  if (!checkIfTheCurrentUserIsOwner) {
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
    id,
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
