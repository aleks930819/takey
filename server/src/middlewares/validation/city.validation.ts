import { body } from 'express-validator';
import { handleValidationErrors } from '../../utils';

const validateCity = [
  body('name')
    .exists()
    .withMessage('Name is required')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long')
    .isLength({ max: 50 })
    .withMessage('Name must be at most 50 characters long')
    .isAlpha()
    .withMessage('Name must contain only letters'),
  body('location')
    .exists()
    .withMessage('Location is required'),
  handleValidationErrors
];

const cityValidation = {
  validateCity
};

export default cityValidation;
