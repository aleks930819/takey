import { body } from 'express-validator';
import { handleValidationErrors } from '../../utils';

const validateCategory = [
  body('name').exists().withMessage('Name is required'),
  // body('image').exists().withMessage('Image is required'),
  handleValidationErrors,
];

const cuisineValidation = {
  validateCategory,
};

export default cuisineValidation;
