import { Request, Response } from 'express';

import { RESPONSE_STATUS } from '../constants';
import { handleImageUpload } from '../utils/uploads';
import { Restaurant } from '../models';
import { asnycHandler } from '../middlewares';
import { ApiFeatures } from '../utils';

/**
 * Retrieves all restaurants from the database.
 *
 * @route GET /api/v1/restaurants
 * @access Public
 * @returns A JSON response containing the list of restaurants.
 */
const getAllRestaurants = asnycHandler(async (req: Request, res: Response) => {
  const features = new ApiFeatures(Restaurant.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();

  const restaurants = await features.query;

  const restaurantsWithOpenStatus = restaurants.map((restaurant: any) => {
    return {
      ...restaurant.toObject(),
      isOpen: restaurant.isOpen()
    };
  });

  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    results: restaurants.length,
    data: {
      restaurants: restaurantsWithOpenStatus
    }
  });
});
/**
 * Retrieves a restaurant by its ID.
 *
 * @route GET /api/v1/restaurants/:id
 * @access Public
 * @returns A JSON response containing the rRestaurant.
 */
const getRestaurant = asnycHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const restaurant = await Restaurant.findById(id);

  const restaurantWithOpenStatus = {
    ...restaurant.toObject(),
    isOpen: restaurant.isOpen()
  };

  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      restaurant: restaurantWithOpenStatus
    }
  });
});
/**
 * Creates a new Restaurant.
 *
 * @route POST /api/v1/restaurants
 * @access Private
 * @returns A JSON response containing the new rRestaurant.
 */
const createRestaurant = asnycHandler(async (req: Request, res: Response) => {
  const image = await handleImageUpload(req, res);

  const location = req.body.location.split(',');

  req.body.location = location.map((loc: string) => parseFloat(loc));

  req.body.image = image;

  const restaurant = await Restaurant.create(req.body);
  res.status(201).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      restaurant
    }
  });
});

/**
 * Delete a Restaurant by its ID.
 *
 * @route DELETE /api/v1/restaurants/:id
 * @access Private
 * @returns A JSON response containing the updated rRestaurant.
 */
const deleteRestaurant = asnycHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  await Restaurant.findByIdAndDelete(id);
  res.status(204).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: null
  });
});

/**
 * Update a Restaurant by its ID.
 *
 * @route PATCH /api/v1/restaurants/:id
 * @access Private
 * @returns A JSON response containing the updated rRestaurant.
 */
const updateRestaurant = asnycHandler(async (req: Request, res: Response) => {
  const id = req.params.id;

  if (req.files) {
    const image = await handleImageUpload(req, res);
    req.body.imageCover = image;
  }

  const restaurant = await Restaurant.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      restaurant
    }
  });
});

const RestaurantController = {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  deleteRestaurant,
  updateRestaurant
};

export default RestaurantController;
