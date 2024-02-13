import { Request, Response } from 'express';

import { RESPONSE_STATUS } from '../constants';
import { Favorite } from '../models';
import { asnycHandler } from '../middlewares';

/**
 * Retrieves all favorites lists from the database.
 *
 * @route GET /api/v1/users/:userId/favorites
 * @access Public
 * @returns A JSON response containing the favorites list.
 */
const getAllFavoritesLists = asnycHandler(async (req: Request, res: Response) => {
  const favorites = await Favorite.find();

  if (!favorites) {
    res.status(404);
    throw new Error('No favorites found');
  }

  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    results: favorites.length,
    data: {
      favorites
    }
  });
});
/**
 * Retrieves a favorite by its ID.
 *
 * @route GET /api/v1/users/:userId/favorites/:id
 * @access Public
 * @returns A JSON response containing the Favorite.
 */
const getFavorite = asnycHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const favorite = await Favorite.findById(id);
  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      Favorite
    }
  });
});
/**
 * Creates a new Favorite.
 *
 * @route POST /api/v1/users/:userId/favorites
 * @access Private
 * @returns A JSON response containing the new Favorite.
 */
const createFavorite = asnycHandler(async (req: Request, res: Response) => {
  const { name, location } = req.body;
  const favorite = await Favorite.create({ name, location });
  res.status(201).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      Favorite
    }
  });
});

/**
 * Delete a favorite by its ID.
 *
 * @route DELETE /api/v1/users/:userId/favorites/:id
 * @access Private
 * @returns A JSON response containing the updated Favorite.
 */
const deleteFavorite = asnycHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const favorite = await Favorite.findByIdAndDelete(id);
  res.status(204).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: null
  });
});

/**
 * Update a favorite by its ID.
 *
 * @route PATCH /api/v1/users/:userId/favorites/:id
 * @access Private
 * @returns A JSON response containing the updated Favorite.
 */
const updateCity = asnycHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const favorite = await Favorite.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      Favorite
    }
  });
});

const cityController = {
  getAllFavoritesLists
};

export default cityController;
