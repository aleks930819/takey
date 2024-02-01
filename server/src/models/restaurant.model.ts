import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    location: {
      type: [Number]
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
      required: true
    },
    cuisine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cuisine',
      required: true
    },
    priceRange: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);
