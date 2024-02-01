"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const controllers_1 = require("../controllers");
const router = Express.Router();
//__________ Cities  __________//
router.get('/', controllers_1.cityController.getAllCities);
router.post('/', controllers_1.cityController.createCity);
//__________ City  __________//
router.get('/:id', controllers_1.cityController.getCity);
router.delete('/:id', controllers_1.cityController.deleteCity);
router.patch('/:id', controllers_1.cityController.updateCity);
exports.default = router;
