import { body } from 'express-validator';
import { handleValidationErrors } from '../../utils';

const validateMenuItem = [
  body('name')
    .exists()
    .withMessage('Name is required')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long')
    .isLength({ max: 50 })
    .withMessage('Name must be at most 50 characters long'),
  body('price').exists().withMessage('Price is required').isNumeric().withMessage('Price must be a number'),
  body('weight').exists().withMessage('Weight is required'),
  handleValidationErrors,
];

const menuItemValidation = {
  validateMenuItem,
};

export default menuItemValidation;
