import { body } from 'express-validator';
import { handleValidationErrors } from '../../utils';

const validateCuisine = [body('name').exists().withMessage('Name is required'), handleValidationErrors];

const cuisineValidation = {
  validateCuisine,
};

export default cuisineValidation;
