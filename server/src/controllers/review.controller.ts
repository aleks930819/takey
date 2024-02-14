import { Request, Response } from 'express';

import { RESPONSE_STATUS } from '../constants';

import { Restaurant, Review } from '../models';
import { asnycHandler } from '../middlewares';
import { ApiFeatures } from '../utils';

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

  if (!restaurantId) {
    return res.status(400).json({
      status: RESPONSE_STATUS.FAIL,
      message: 'Please provide a restaurant ID'
    });
  }

  const features = new ApiFeatures(
    Review.find({
      restaurant: restaurantId
    }),
    req.query
  );

  const reviews = await features
    .filter()
    .sort()
    .limitFields()
    .pagination().query;

  const totalReviews = await Review.countDocuments();

  const totalPages = Math.ceil(Number(totalReviews) / (Number(req.query.limit) || 12));

  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    results: reviews.length,
    totalReviews,
    totalPages: totalPages,
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

  // check if use already reviewed the restaurant
  const alreadyReviewed = await Review.findOne({
    restaurant: restaurantId,
    user: req.user._id
  });

  if (alreadyReviewed) {
    return res.status(400).json({
      status: RESPONSE_STATUS.FAIL,
      message: 'You have already reviewed this restaurant'
    });
  }

  const review = await Review.create({
    ...req.body,
    restaurant: req.body.restaurant || restaurantId,
    user: req.body.user || req.user._id
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

  const updatedReview = await Review.findOneAndUpdate(
    {
      _id: id,
      restaurant: restaurantId
    },
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      updatedReview
    }
  });
});

const reviewController = {
  getAllReviews,
  createReview,
  getReview,
  deleteReview,
  updateReview
};

export default reviewController;
