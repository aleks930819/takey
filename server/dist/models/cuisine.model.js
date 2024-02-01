"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cuisineSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});
const Cuisine = mongoose_1.default.model('Cuisine', cuisineSchema);
exports.default = Cuisine;
