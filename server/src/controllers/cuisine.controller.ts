import { Request, Response } from 'express';

import { handleImageUpload } from '../utils/uploads';

import { RESPONSE_STATUS } from '../constants';
import { Cuisine } from '../models';
import { asnycHandler } from '../middlewares';

/**
 * Retrieves all cuisines from the database.
 *
 * @route GET /api/v1/cuisines
 * @access Public
 * @returns A JSON response containing the list of cuisines.
 */
const getAllCuisines = asnycHandler(async (req: Request, res: Response) => {
  const cuisines = await Cuisine.find();
  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    results: cuisines.length,
    data: {
      cuisines,
    },
  });
});

/**
 * Retrieves a cuisine by its ID.
 *
 * @route GET /api/v1/cuisines/:id
 * @access Public
 * @returns A JSON response containing the cuisine.
 */
const getCuisine = asnycHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const cuisine = await Cuisine.findById(id);
  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      cuisine,
    },
  });
});

/**
 * Creates a new cuisine.
 *
 * @route POST /api/v1/cuisines
 * @access Private
 * @returns A JSON response containing the new cuisine.
 */
const createCuisine = asnycHandler(async (req: Request, res: Response) => {
  const { name } = req.body;

  const imagePath = await handleImageUpload(req, res);

  console.log(imagePath);

  const cuisine = await Cuisine.create({ name, imageCover: imagePath });

  res.status(201).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      cuisine,
    },
  });
});

/**
 * Delete a cuisine by its ID.
 *
 * @route DELETE /api/v1/cuisines/:id
 * @access Private
 * @returns A JSON response containing the deleted cuisine.
 */
const deleteCuisine = asnycHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  await Cuisine.findByIdAndDelete(id);

  res.status(204).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: null,
  });
});
/**
 * Update a cuisine by its ID.
 *
 * @route PUT /api/v1/cuisines/:id
 * @access Private
 * @returns A JSON response containing the updated cuisine.
 */
const updateCuisine = asnycHandler(async (req: Request, res: Response) => {
  const id = req.params.id;

  // check if image is uploaded and update the imageCover
  if (req.files) {
    const image = await handleImageUpload(req, res);
    req.body.imageCover = image;
  }

  const cuisine = await Cuisine.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      cuisine,
    },
  });
});

const cuisineController = {
  getAllCuisines,
  getCuisine,
  createCuisine,
  deleteCuisine,
  updateCuisine,
};

export default cuisineController;
