import { Request, Response } from 'express';
import slugify from 'slugify';

import { RESPONSE_STATUS } from '../constants';
import { StaticPage } from '../models';
import { asnycHandler } from '../middlewares';

/**
 * Retrieves all static pages from the database.
 *
 * @route GET /api/v1/static-pages
 * @access Public
 * @returns A JSON response containing the list of cities.
 */
const getAllStaticPages = asnycHandler(async (req: Request, res: Response) => {
  const pages = await StaticPage.find();
  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    results: pages.length,
    data: {
      pages,
    },
  });
});
/**
 * Retrieves a static page by its slug.
 *
 * @route GET /api/v1/static-pages/:slug
 * @access Public
 * @returns A JSON response containing the city.
 */
const getStaticPage = asnycHandler(async (req: Request, res: Response) => {
  const slug = req.params.id;
  const page = await StaticPage.findOne({ slug });
  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      page,
    },
  });
});
/**
 * Creates a new static page.
 *
 * @route POST /api/v1/static-pages
 * @access Private
 * @returns A JSON response containing the new city.
 */
const createStaticPage = asnycHandler(async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const page = await StaticPage.create({ title, content });
  res.status(201).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      page,
    },
  });
});

/**
 * Delete a static pageby its ID.
 *
 * @route DELETE /api/v1/static-pages/:id
 * @access Private
 * @returns A JSON response containing the updated city.
 */
const deleteStaticPage = asnycHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const page = await StaticPage.findByIdAndDelete(id);
  res.status(204).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: null,
  });
});

/**
 * Update a static page by its ID.
 *
 * @route PATCH /api/v1/static-pages/:id
 * @access Private
 * @returns A JSON response containing the updated city.
 */
const updateStaticPage = asnycHandler(async (req: Request, res: Response) => {
  const id = req.params.id;

  // TODO: Change this logic to be done in the model
  if (req.body.title) {
    req.body.slug = slugify(req.body.title, { lower: true });
  }
  const page = await StaticPage.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: RESPONSE_STATUS.SUCCESS,
    data: {
      page,
    },
  });
});

const staticPageController = {
  getAllStaticPages,
  getStaticPage,
  createStaticPage,
  deleteStaticPage,
  updateStaticPage,
};

export default staticPageController;
