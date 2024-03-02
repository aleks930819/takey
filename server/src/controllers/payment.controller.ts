import { Request, Response } from 'express';
import Stripe from 'stripe';
import asyncHandler from '../middlewares/async-handler';

import { RESPONSE_STATUS } from '../constants';
import { environment } from '../environments';

/**
 * Creates a new checkout session using Stripe.
 *
 * @route POST /api/v1/payments/checkout-session
 * @access Public
 * @returns A JSON response containing the new checkout session.
 */
const createCheckoutSession = asyncHandler(async (req: Request, res: Response) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const lineItems = req.body.menuItems.map((item: { name: string; price: number; quantity: number }) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    success_url: `${environment.client_url}/success`,
    cancel_url: `${environment.client_url}/`,
    mode: 'payment',
    line_items: [
      ...lineItems,
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Delivery fee',
          },
          unit_amount: 500,
        },
        quantity: 1,
      },
    ],
    payment_method_types: ['card'],
  });

  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: session,
  });
});

const paymentController = {
  createCheckoutSession,
};

export default paymentController;
