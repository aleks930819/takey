import * as Express from 'express';

import { protect, restrictTo } from '../middlewares';
import { cityValidation } from '../middlewares/validation';

import { cityController } from '../controllers';

const router = Express.Router();

//__________ Cities  __________//
router.get('/', cityController.getAllCities);
router.post('/', protect, restrictTo('admin'), cityValidation.validateCity, cityController.createCity);

//__________ City  __________//
router.get('/:id', cityController.getCity);
router.delete('/:id', protect, restrictTo('admin'), cityController.deleteCity);
router.patch('/:id', protect, restrictTo('admin'), cityController.updateCity);

export default router;
