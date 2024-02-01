"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const middlewares_1 = require("../middlewares");
/**
 * Retrieves all cuisines from the database.
 *
 * @route GET /api/v1/cuisines
 * @access Public
 * @returns A JSON response containing the list of cuisines.
 */
const getAllCuisines = (0, middlewares_1.asnycHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cuisines = yield models_1.Cuisine.find();
    res.status(200).json({
        status: 'success',
        results: cuisines.length,
        data: {
            cuisines
        }
    });
}));
/**
 * Retrieves a cuisine by its ID.
 *
 * @route GET /api/v1/cuisines/:id
 * @access Public
 * @returns A JSON response containing the cuisine.
 */
const getCuisine = (0, middlewares_1.asnycHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const cuisine = yield models_1.Cuisine.findById(id);
    res.status(200).json({
        status: 'success',
        data: {
            cuisine
        }
    });
}));
/**
 * Creates a new cuisine.
 *
 * @route POST /api/v1/cuisines
 * @access Private
 * @returns A JSON response containing the new cuisine.
 */
const createCuisine = (0, middlewares_1.asnycHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const cuisine = yield models_1.Cuisine.create({ name });
    res.status(201).json({
        status: 'success',
        data: {
            cuisine
        }
    });
}));
/**
 * Delete a cuisine by its ID.
 *
 * @route DELETE /api/v1/cuisines/:id
 * @access Private
 * @returns A JSON response containing the deleted cuisine.
 */
const deleteCuisine = (0, middlewares_1.asnycHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const cuisine = yield models_1.Cuisine.findByIdAndDelete(id);
    res.status(200).json({
        status: 'success',
        data: {
            cuisine
        }
    });
}));
/**
 * Update a cuisine by its ID.
 *
 * @route PUT /api/v1/cuisines/:id
 * @access Private
 * @returns A JSON response containing the updated cuisine.
 */
const updateCuisine = (0, middlewares_1.asnycHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const cuisine = yield models_1.Cuisine.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        status: 'success',
        data: {
            cuisine
        }
    });
}));
const cuisineController = {
    getAllCuisines,
    getCuisine,
    createCuisine,
    deleteCuisine,
    updateCuisine
};
exports.default = cuisineController;
