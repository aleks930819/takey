import * as Express from 'express';

import { cityController } from '../controllers';
import { protect, restrictTo } from '../middlewares';

const router = Express.Router();

//__________ Cities  __________//
router.get('/', cityController.getAllCities);
router.post('/', protect, restrictTo('admin'), cityController.createCity);

//__________ City  __________//
router.get('/:id', cityController.getCity);
router.delete('/:id', protect, restrictTo('admin'), cityController.deleteCity);
router.patch('/:id', protect, restrictTo('admin'), cityController.updateCity);

export default router;
