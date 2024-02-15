import { body } from 'express-validator';
import { handleValidationErrors } from '../../utils';

const validateFavorite = [
  body('restaurantId')
    .exists()
    .withMessage('Restaurant ID is required'),
  handleValidationErrors
];

const favoriteValidation = {
  validateFavorite
};

export default favoriteValidation;
