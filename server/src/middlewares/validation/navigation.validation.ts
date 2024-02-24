import { body } from 'express-validator';
import { handleValidationErrors } from '../../utils';

const validateNavigation = [
  body('title')
    .exists()
    .withMessage('title is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('title should be between 3 and 50 characters'),
  body('location')
    .exists()
    .withMessage('Location is required')
    .isIn(['header', 'footer'])
    .withMessage('Location should be either header or footer'),
  body('items').optional({ nullable: true }).isArray().withMessage('Items should be an array'),
  body('items.*.name').optional({ nullable: true }).isString().withMessage('Item name should be a string'),
  body('items.*.link').optional({ nullable: true }).exists().withMessage('Item link is required'),
  handleValidationErrors,
];

const navigatinValidation = {
  validateNavigation,
};

export default navigatinValidation;
