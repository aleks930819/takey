import { body } from 'express-validator';
import { handleValidationErrors } from '../../utils';

const validateRestaruant = [
  body('name')
    .exists()
    .withMessage('Name is required')
    .isAlpha()
    .withMessage('Name must only contain letters'),
  body('location')
    .exists()
    .withMessage('Location is required'),
  body('deliveryTime')
    .exists()
    .withMessage('Delivery Time is required'),
  body('image')
    .exists()
    .withMessage('Image is required'),
  body('cuisine')
    .exists()
    .withMessage('Cuisine is required'),
  body('city')
    .exists()
    .withMessage('City is required')
    .isAlpha()
    .withMessage('City must only contain letters'),
  body('minOrderPrice')
    .exists()
    .withMessage('Min.order price is required')
    .isNumeric()
    .withMessage('Min.order price must be a number'),
  body('avgPrice')
    .exists()
    .withMessage('Avg.price is required')
    .isNumeric()
    .withMessage('Avg.price must be a number'),

  handleValidationErrors
];

const cityValidation = {
  validateRestaruant
};

export default cityValidation;
