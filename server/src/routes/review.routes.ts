import * as express from 'express';

import { protect, restrictTo } from '../middlewares';

import { reviewController } from '../controllers';

// Merge params from restaruant router to access restaruant id
const router = express.Router({ mergeParams: true });

//__________ REVIEWS  __________//
router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(protect, restrictTo('user'), reviewController.createReview);
//__________ REVIEW  __________//
router
  .route('/:id')
  .get(reviewController.getReview)
  .delete(protect, restrictTo('user'), reviewController.deleteReview)
  .patch(protect, restrictTo('user'), reviewController.updateReview);

export default router;
