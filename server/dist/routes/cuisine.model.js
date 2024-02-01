"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const controllers_1 = require("../controllers");
const router = Express.Router();
//__________ Cuisines  __________//
router.get('/', controllers_1.cuisineController.getAllCuisines);
router.post('/', controllers_1.cuisineController.createCuisine);
//__________ Cuisine  __________//
router.get('/:id', controllers_1.cuisineController.getCuisine);
router.delete('/:id', controllers_1.cuisineController.deleteCuisine);
router.patch('/:id', controllers_1.cuisineController.updateCuisine);
exports.default = router;
