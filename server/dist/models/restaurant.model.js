"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const restaurantSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: [Number]
    },
    city: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'City',
        required: true
    },
    cuisine: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Cuisine',
        required: true
    },
    priceRange: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});
