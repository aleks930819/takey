import { body } from 'express-validator';
import { handleValidationErrors } from '../../utils';

const validateOrder = [
  body('menuItems').exists().withMessage('Menu items are required'),
  body('restaurant').exists().withMessage('Restaurant is required'),
  body('paymentMethod').exists().withMessage('Payment method is required'),
  body('total').exists().withMessage('Total is required'),
  body('guest').if(body('user').not().exists()).exists().withMessage('Guest is required'),
  body('guest.name').if(body('guest').exists()).exists().withMessage('Guest name is required'),
  body('guest.phone').if(body('guest').exists()).exists().withMessage('Guest phone is required'),
  body('guest.streetNumber').if(body('guest').exists()).exists().withMessage('Guest street number is required'),
  body('guest.streetName').if(body('guest').exists()).exists().withMessage('Guest street name is required'),
  handleValidationErrors,
];

const orderValidation = {
  validateOrder,
};

export default orderValidation;
