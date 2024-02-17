import { Request, Response } from 'express';

import { RESPONSE_STATUS } from '../constants';
import { MenuItem } from '../models';
import { asnycHandler } from '../middlewares';

/**
 * Retrieves all menu items for a category.
 *
 * @route GET /api/v1/categories/:categoryId/menu-items
 * @access Public
 * @returns A JSON response containing the list of menu items.
 */
const getAllMenuItems = asnycHandler(async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  console.log(categoryId);
  const menuItems = await MenuItem.find({ category: categoryId });
  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      menuItems,
    },
  });
});

/**
 * Retrieves a menu item by its ID.
 *
 * @route GET /api/v1/categories/:categoryId/menu-items/:menuItemId
 * @access Public
 * @returns A JSON response containing the Favorite.
 */
const getMenuItem = asnycHandler(async (req: Request, res: Response) => {
  const menuItemId = req.params.menuItemId;

  const menuItem = await MenuItem.findById(menuItemId);

  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      menuItem,
    },
  });
});
/**
 * Creates a new menu item.
 *
 * @route POST /api/v1/categories/:categoryId/menu-items
 * @access Private
 * @returns A JSON response containing the new Favorite.
 */
const createMenuItem = asnycHandler(async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;

  console.log(req.params);
  //   console.log('categoryId', categoryId);

  const menuItem = await MenuItem.create({
    name: req.body.name,
    category: categoryId || req.body.category,
  });

  res.status(201).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      menuItem,
    },
  });
});

/**
 * Updates a menu item.
 *
 * @route PATCH /api/v1/categories/:categoryId/menu-items/:menuItemId
 * @access Private
 * @returns A JSON response containing the updated Menu Item
 */
const updateMenuItem = asnycHandler(async (req: Request, res: Response) => {
  const menuItemId = req.params.menuItemId;

  const menuItem = await MenuItem.findByIdAndUpdate(menuItemId, req.body, { new: true });

  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      menuItem,
    },
  });
});

/**
 * Delete menu item.
 *
 * @route DELETE /api/v1/categories/:categoryId/menu-items/:menuItemId
 * @access Private
 * @returns A JSON response containing the updated Favorite.
 */
const deleteMenuItem = asnycHandler(async (req: Request, res: Response) => {
  const categoryId = req.params.menuItemId;

  const menuItem = await MenuItem.findByIdAndDelete(categoryId);

  if (!menuItem) {
    res.status(404);
    throw new Error('There is no menu item with the provided ID.');
  }

  res.status(204).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: null,
  });
});

const menuItemController = {
  getAllMenuItems,
  getMenuItem,
  createMenuItem,
  deleteMenuItem,
  updateMenuItem,
};

export default menuItemController;
