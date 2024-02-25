import * as Express from 'express';

import { paymentController } from '../controllers';

const router = Express.Router();

router.post('/checkout-session', paymentController.createCheckoutSession);
// router.post('/payment', paymentController.createPayment);

export default router;
