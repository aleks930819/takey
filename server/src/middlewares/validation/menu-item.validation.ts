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
  handleValidationErrors,
];

const menuItemValidation = {
  validateMenuItem,
};

export default menuItemValidation;
