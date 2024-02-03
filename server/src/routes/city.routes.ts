import * as Express from 'express';

import { cityController } from '../controllers';

const router = Express.Router();

//__________ Cities  __________//
router.get('/', cityController.getAllCities);
router.post('/', cityController.createCity);

//__________ City  __________//
router.get('/:id', cityController.getCity);
router.delete('/:id', cityController.deleteCity);
router.patch('/:id', cityController.updateCity);

export default router;
