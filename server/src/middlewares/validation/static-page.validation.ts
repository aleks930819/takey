import { body } from 'express-validator';
import { handleValidationErrors } from '../../utils';

const validateStaticPage = [
  body('title')
    .exists()
    .withMessage('Title is required')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long'),
  body('content')
    .isLength({ min: 10 })
    .withMessage('Content must be at least 10 characters long')
    .exists()
    .withMessage('Content is required'),
  handleValidationErrors,
];

const staticPageValidation = {
  validateStaticPage,
};

export default staticPageValidation;
