import mongoose from 'mongoose';

export interface Restaurant {
  name: string;
  location?: [number];
  deliveryTime: string;
  minOrderPrice: number;
  image: string;
  rating?: number;
  ratingsQuantity?: number;
  city: mongoose.Types.ObjectId | string;
  cuisine: mongoose.Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    location: {
      type: [Number]
    },
    deliveryTime: {
      type: String,
      required: true
    },
    minOrderPrice: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      default: 4.5
    },
    ratingsQuantity: {
      type: Number,
      default: 0
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
    }
  },
  {
    timestamps: true
  }
);

const Restaurant = mongoose.model<Restaurant>('Restaurant', restaurantSchema);

export default Restaurant;
