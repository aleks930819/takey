"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const citySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: [Number]
    }
}, {
    timestamps: true
});
const City = mongoose_1.default.model('City', citySchema);
exports.default = City;
