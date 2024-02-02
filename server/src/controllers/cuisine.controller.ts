import { Request, Response } from 'express';

import { handleImageUpload, handleDeleteImageByName } from '../utils/uploads';

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
    status: 'success',
    results: cuisines.length,
    data: {
      cuisines
    }
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
    status: 'success',
    data: {
      cuisine
    }
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

  const imageName = handleImageUpload(req, res);

  const cuisine = await Cuisine.create({ name, imageCover: `/src/uploads/${imageName}` });

  res.status(201).json({
    status: 'success',
    data: {
      cuisine
    }
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
  const cuisine = await Cuisine.findByIdAndDelete(id);

  const cuisineImage = cuisine?.imageCover.split('/').pop();

  if (cuisineImage) {
    handleDeleteImageByName(cuisineImage);
  }

  res.status(204).json({
    status: 'success',
    data: null
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
    const cuisine = await Cuisine.findById(id);
    const cuisineImage = cuisine?.imageCover.split('/').pop();

    // delete the old image to avoid cluttering the server
    if (cuisineImage) {
      await handleDeleteImageByName(cuisineImage);
    }

    const imageName = handleImageUpload(req, res);
    req.body.imageCover = `/src/uploads/${imageName}`;
  }

  const cuisine = await Cuisine.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    status: 'success',
    data: {
      cuisine
    }
  });
});

const cuisineController = {
  getAllCuisines,
  getCuisine,
  createCuisine,
  deleteCuisine,
  updateCuisine
};

export default cuisineController;
