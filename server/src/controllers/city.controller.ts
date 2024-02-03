import { Request, Response } from 'express';

import { RESPONSE_STATUS } from '../constants';
import { City } from '../models';
import { asnycHandler } from '../middlewares';

/**
 * Retrieves all cities from the database.
 *
 * @route GET /api/v1/cities
 * @access Public
 * @returns A JSON response containing the list of cities.
 */
const getAllCities = asnycHandler(async (req: Request, res: Response) => {
  const cities = await City.find();
  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    results: cities.length,
    data: {
      cities
    }
  });
});
/**
 * Retrieves a city by its ID.
 *
 * @route GET /api/v1/cities/:id
 * @access Public
 * @returns A JSON response containing the city.
 */
const getCity = asnycHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const city = await City.findById(id);
  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      city
    }
  });
});
/**
 * Creates a new city.
 *
 * @route POST /api/v1/cities
 * @access Private
 * @returns A JSON response containing the new city.
 */
const createCity = asnycHandler(async (req: Request, res: Response) => {
  const { name, location } = req.body;
  const city = await City.create({ name, location });
  res.status(201).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      city
    }
  });
});

/**
 * Delete a city by its ID.
 *
 * @route DELETE /api/v1/cities/:id
 * @access Private
 * @returns A JSON response containing the updated city.
 */
const deleteCity = asnycHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const city = await City.findByIdAndDelete(id);
  res.status(204).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: null
  });
});

/**
 * Update a city by its ID.
 *
 * @route PATCH /api/v1/cities/:id
 * @access Private
 * @returns A JSON response containing the updated city.
 */
const updateCity = asnycHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const city = await City.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      city
    }
  });
});

const cityController = {
  getAllCities,
  getCity,
  createCity,
  deleteCity,
  updateCity
};

export default cityController;
