import { body } from 'express-validator';
import { handleValidationErrors } from '../../utils';

const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .exists()
    .withMessage('Email is required'),
  body('password')
    .exists()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  handleValidationErrors
];

const validateRegister = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .exists()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('passwordConfirm')
    .exists()
    .withMessage('Password confirmation is required')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),
  body('name')
    .exists()
    .withMessage('Name is required')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long')
    .isLength({ max: 50 })
    .withMessage('Name must be at most 50 characters long'),
  handleValidationErrors
];

const authVlidation = {
  validateLogin,
  validateRegister
};

export default authVlidation;
