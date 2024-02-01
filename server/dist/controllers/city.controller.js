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
 * Retrieves all cities from the database.
 *
 * @route GET /api/v1/cities
 * @access Public
 * @returns A JSON response containing the list of cities.
 */
const getAllCities = (0, middlewares_1.asnycHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cities = yield models_1.City.find();
    res.status(200).json({
        status: 'success',
        results: cities.length,
        data: {
            cities
        }
    });
}));
/**
 * Retrieves a city by its ID.
 *
 * @route GET /api/v1/cities/:id
 * @access Public
 * @returns A JSON response containing the city.
 */
const getCity = (0, middlewares_1.asnycHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const city = yield models_1.City.findById(id);
    res.status(200).json({
        status: 'success',
        data: {
            city
        }
    });
}));
/**
 * Creates a new city.
 *
 * @route POST /api/v1/cities
 * @access Private
 * @returns A JSON response containing the new city.
 */
const createCity = (0, middlewares_1.asnycHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, location } = req.body;
    const city = yield models_1.City.create({ name, location });
    res.status(201).json({
        status: 'success',
        data: {
            city
        }
    });
}));
/**
 * Delete a city by its ID.
 *
 * @route DELETE /api/v1/cities/:id
 * @access Private
 * @returns A JSON response containing the updated city.
 */
const deleteCity = (0, middlewares_1.asnycHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const city = yield models_1.City.findByIdAndDelete(id);
    res.status(204).json({
        status: 'success',
        data: null
    });
}));
/**
 * Update a city by its ID.
 *
 * @route PATCH /api/v1/cities/:id
 * @access Private
 * @returns A JSON response containing the updated city.
 */
const updateCity = (0, middlewares_1.asnycHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const city = yield models_1.City.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        status: 'success',
        data: {
            city
        }
    });
}));
const cityController = {
    getAllCities,
    getCity,
    createCity,
    deleteCity,
    updateCity
};
exports.default = cityController;
