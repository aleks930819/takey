import { Request, Response } from 'express';

import { RESPONSE_STATUS } from '../constants';
import { Category } from '../models';
import { asnycHandler } from '../middlewares';
import { handleImageUpload } from '../utils/uploads';

/**
 * Get all categories.
 *
 * @route GET /api/v1/categories
 * @access Public
 * @returns A JSON response containing all categories.
 */
const getAllCategories = asnycHandler(async (req: Request, res: Response) => {
  const categories = await Category.find();
  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      categories,
    },
  });
});

/**
 * Get a category.
 *
 * @route GET /api/v1/categories/:categoryId
 * @access Public
 * @returns A JSON response containing the category.
 */
const getCategory = asnycHandler(async (req: Request, res: Response) => {
  const id = req.params.categoryId;
  console.log(id);
  const category = await await Category.findById(id).populate('menuItems').exec();
  if (!category) {
    return res.status(404).json({
      status: RESPONSE_STATUS.ERROR,
      message: 'Category not found',
    });
  }
  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      category,
    },
  });
});

/**
 * Create a category.
 *
 * @route POST /api/v1/categories
 * @access Private
 * @returns A JSON response containing the created category.
 */
const createCategory = asnycHandler(async (req: Request, res: Response) => {
  const { name } = req.body;

  const imagePath = await handleImageUpload(req, res);

  const category = await Category.create({ name, image: imagePath });

  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      category,
    },
  });
});

/**
 * Update a category.
 *
 * @route PATCH /api/v1/categories/:id
 * @access Private
 * @returns A JSON response containing the updated category.
 */
const updateCategory = asnycHandler(async (req: Request, res: Response) => {
  const id = req.params.id;

  // check if image is uploaded and update the imageCover
  if (req.files) {
    const image = await handleImageUpload(req, res);
    req.body.image = image;
  }

  const category = await Category.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      category,
    },
  });
});

/**
 * Delete a category.
 *
 * @route DELETE /api/v1/categories/:id
 * @access Private
 * @returns No content.
 */
const deleteCategory = asnycHandler(async (req: Request, res: Response) => {
  await Category.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: null,
  });
});

const categoryController = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
};

export default categoryController;
