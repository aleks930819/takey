import { Request, Response } from 'express';

import { RESPONSE_STATUS } from '../constants';

import { Order } from '../models';

/**
 * Creates a new order.
 *
 * @route POST /api/v1/orders
 * @access Private
 * @returns A JSON response containing the new order.
 */
const createOrder = async (req: Request, res: Response) => {
  // TODO: Check if logged in user made the request and if the user is the same as the one in the request body
  // if (req.body.user) {
  //   return res.status(403).json({
  //     status: RESPONSE_STATUS.FAIL,
  //     message: 'You are not authorized to perform this action',
  //   });
  // }

  //TODO: Check if the restaurant have the menu items

  const order = await Order.create(req.body);

  res.status(201).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      order,
    },
  });
};

/**
 * Retrieves all orders.
 *
 * @route GET /api/v1/orders
 * @access Private
 * @returns A JSON response containing all orders.
 */

const getAllOrders = async (req: Request, res: Response) => {
  const orders = await Order.find();

  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    results: orders.length,
    data: {
      orders,
    },
  });
};

/**
 * Retrieves a single order.
 *
 * @route GET /api/v1/orders/:id
 * @access Private
 * @returns A JSON response containing the order.
 */

const getOrder = async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);

  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      order,
    },
  });

  if (!order) {
    res.status(404).json({
      status: RESPONSE_STATUS.FAIL,
      message: 'Order not found',
    });
  }
};

/**
 * Retrieves all orders for the currently logged in user.
 *
 * @route GET /api/v1/orders/my-orders
 * @access Private
 * @returns A JSON response containing the user's orders.
 */
const getUserOrders = async (req: Request, res: Response) => {
  const userId = req.user._id || req.body.userId;

  const orders = await Order.find({ user: userId });

  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    results: orders.length,
    data: {
      orders,
    },
  });
};

/**
 * Retrieves a single order for the currently logged in user.
 *
 * @route GET /api/v1/orders/my-orders/:id
 * @access Private
 * @returns A JSON response containing the user's order.
 */
const getSingleUserOrder = async (req: Request, res: Response) => {
  const userId = req.user._id || req.body.userId;
  const order = await Order.findOne({ _id: req.params.id, user: userId });

  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      order,
    },
  });
};

const orderController = {
  createOrder,
  getAllOrders,
  getOrder,
  getUserOrders,
  getSingleUserOrder,
};

export default orderController;
