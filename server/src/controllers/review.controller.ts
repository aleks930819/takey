import { Request, Response } from 'express';

import { RESPONSE_STATUS } from '../constants';

import { Review } from '../models';
import { asnycHandler } from '../middlewares';

/**
 * Retrieves all reviews from the database
 *
 * @route GET /api/v1/restaurants/:restaurantId/reviews
 * @route GET /api/v1/reviews
 * @access Public
 * @returns A JSON response containing the list of reviews.
 */
const getAllReviews = asnycHandler(async (req: Request, res: Response) => {
  const { restaurantId } = req.params;

  let filter = {};

  if (restaurantId) filter = { restaurant: restaurantId };

  const reviews = await Review.find(filter).populate({
    path: 'user',
    select: 'name'
  });

  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    results: reviews.length,
    data: {
      reviews
    }
  });
});

/**
 * Retrieves a review by its ID.
 *
 * @route GET /api/v1/restaurants/:restaurantId/reviews/:id
 * @route GET /api/v1/reviews/:id
 * @access Public
 * @returns A JSON response containing the review.
 */

const getReview = asnycHandler(async (req: Request, res: Response) => {
  const { restaurantId, id } = req.params;

  const review = await Review.findOne({ _id: id, restaurant: restaurantId });

  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      review
    }
  });
});

/**
 * Creates a new review.
 *
 * @route POST /api/v1/restaurants/:restaurantId/reviews
 * @access Private
 * @returns A JSON response containing the new review.
 */
const createReview = asnycHandler(async (req: Request, res: Response) => {
  const { restaurantId } = req.params;

  const review = await Review.create({
    ...req.body,
    restaurant: restaurantId,
    user: req.user._id
  });

  res.status(201).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      review
    }
  });
});

/**
 * Deletes a review by its ID.
 *
 * @route DELETE /api/v1/restaurants/:restaurantId/reviews/:id
 * @access Private
 * @returns A JSON response containing the deleted review.
 */
const deleteReview = asnycHandler(async (req: Request, res: Response) => {
  const { restaurantId, id } = req.params;

  const isTheCurrentUser = await Review.findOne({ _id: id, user: req.user._id });

  if (!isTheCurrentUser) {
    return res.status(403).json({
      status: RESPONSE_STATUS.FAIL,
      message: 'You are not allowed to perform this action.'
    });
  }

  await Review.findOneAndDelete({ _id: id, restaurant: restaurantId });

  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      review: null
    }
  });
});

/**
 * Updates a review by its ID.
 *
 * @route PATCH /api/v1/restaurants/:restaurantId/reviews/:id
 * @access Private
 * @returns A JSON response containing the updated review.
 */
const updateReview = asnycHandler(async (req: Request, res: Response) => {
  const { restaurantId, id } = req.params;

  const isTheCurrentUser = await Review.findOne({ _id: id, user: req.user._id });

  if (!isTheCurrentUser) {
    return res.status(403).json({
      status: RESPONSE_STATUS.FAIL,
      message: 'You are not allowed to perform this action.'
    });
  }

  const review = await Review.findOneAndUpdate({ _id: id, restaurant: restaurantId }, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      review
    }
  });
});

const reviewController = {
  getAllReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview
};

export default reviewController;
