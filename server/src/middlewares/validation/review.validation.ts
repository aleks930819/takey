import { body } from 'express-validator';
import { handleValidationErrors } from '../../utils';

const validateReview = [
  body('review')
    .exists()
    .withMessage('Review is required'),
  body('rating')
    .exists()
    .withMessage('Rating is required')
    .isNumeric()
    .withMessage('Rating must be a number'),
  handleValidationErrors
];

const reviewValidation = {
  validateReview
};

export default reviewValidation;
