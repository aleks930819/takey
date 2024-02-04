import mongoose, { Schema } from 'mongoose';

export interface IRestaurant {
  _id: mongoose.Types.ObjectId | string;
  name: string;
  location?: [number];
  deliveryTime: string;
  minOrderPrice: number;
  image: string;
  rating?: number;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  city: mongoose.Types.ObjectId | string;
  cuisine: mongoose.Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}

const RestaruantSchema: Schema = new Schema(
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
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: vaul => Math.round(vaul * 10) / 10 // 4.666666, 46.66666, 47, 4.7
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

RestaruantSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'restaurant',
  localField: '_id'
});

const Restaurant = mongoose.model<IRestaurant>('Restaurant', RestaruantSchema);

export default Restaurant;
