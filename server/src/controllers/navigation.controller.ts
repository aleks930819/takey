import { Request, Response } from 'express';
import asyncHandler from '../middlewares/async-handler';
import { Navigation } from '../models';

/**
 * Get all navigations.
 *
 * @route GET /api/v1/navigations
 * @access Public
 * @returns A JSON response containing all navigations.
 */
export const getNavigations = asyncHandler(async (req: Request, res: Response) => {
  const location = req.query.location as string;

  const query = location ? { location } : {};

  const navigations = await Navigation.find(query);

  res.status(200).json({
    status: 'success',
    results: navigations.length,
    data: {
      navigations,
    },
  });
});

/**
 * Get a navigation.
 *
 * @route GET /api/v1/navigations/:id
 * @access Public
 * @returns A JSON response containing the navigation.
 */

export const getNavigation = asyncHandler(async (req: Request, res: Response) => {
  const navigation = await Navigation.findById(req.params.id);

  if (!navigation) {
    return res.status(404).json({
      status: 'error',
      message: 'Navigation not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      navigation,
    },
  });
});

/**
 * Create a navigation.
 *
 * @route POST /api/v1/navigations
 * @access Private
 * @returns A JSON response containing the created navigation.
 */
export const createNavigation = asyncHandler(async (req: Request, res: Response) => {
  const navigation = await Navigation.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      navigation,
    },
  });
});

/**
 * Update a navigation.
 *
 * @route PATCH /api/v1/navigations/:id
 * @access Private
 * @returns A JSON response containing the updated navigation.
 */

export const updateNavigation = asyncHandler(async (req: Request, res: Response) => {
  const navigation = await Navigation.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!navigation) {
    return res.status(404).json({
      status: 'error',
      message: 'Navigation not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      navigation,
    },
  });
});

/**
 * Delete a navigation.
 *
 * @route DELETE /api/v1/navigations/:id
 * @access Private
 * @returns A JSON response containing the deleted navigation.
 */

export const deleteNavigation = asyncHandler(async (req: Request, res: Response) => {
  const navigation = await Navigation.findByIdAndDelete(req.params.id);

  if (!navigation) {
    return res.status(404).json({
      status: 'error',
      message: 'Navigation not found',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const navigationController = {
  getNavigations,
  getNavigation,
  createNavigation,
  updateNavigation,
  deleteNavigation,
};

export default navigationController;
