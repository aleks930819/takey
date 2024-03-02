import mongoose, { Schema, Document } from 'mongoose';

import { IReview } from './review.model';

const OpeningHoursSchema = new Schema({
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },
  open: String,
  close: String,
});

export interface IRestaurant extends Document {
  _id: mongoose.Types.ObjectId | string;
  name: string;
  location?: [number];
  deliveryTime: string;
  minOrderPrice: number;
  image: string;
  reviews: IReview[];
  openingHours: Array<{ day: string; open: string; close: string }>;
  rating?: number;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  city: mongoose.Types.ObjectId | string;
  cuisine: mongoose.Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
  avgPrice: number;
  isClosed?: boolean;
  isOpen?: () => boolean;
  categories: Array<{
    category: mongoose.Types.ObjectId | string;
    image: string;
  }>;
}

const RestaruantSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
      },
    },
    deliveryTime: {
      type: String,
      required: true,
    },
    minOrderPrice: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    avgPrice: {
      type: Number,
      required: true,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (vaul) => Math.round(vaul * 10) / 10, // 4.666666, 46.66666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    openingHours: [OpeningHoursSchema],
    isClosed: {
      type: Boolean,
      default: false,
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
      required: true,
    },
    cuisine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cuisine',
      required: true,
    },
    categories: [
      {
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Category',
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);
RestaruantSchema.pre(/^find/, function (next) {
  // @ts-expect-error: Explanation: TypeScript cannot infer the type of 'this' in Mongoose schema hooks, so we use @ts-expect-error to suppress the error.
  this._originalQuery = this.getQuery();
  next();
});

RestaruantSchema.post(/^find/, async function (result) {
  if (!Array.isArray(result)) {
    result = [result];
  }
  for (const doc of result) {
    doc.isClosed = doc.isOpen();
    await doc.save();
  }
});

RestaruantSchema.methods.isOpen = function () {
  const date = new Date();
  const dayNumber = date.getDay();
  const currentTime = date.getHours() * 60 + date.getMinutes();

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = days[dayNumber];

  for (let i = 0; i < this.openingHours?.length; i++) {
    if (this.openingHours[i].day === currentDay) {
      const [openHours, openMinutes] = this.openingHours[i].open.split(':').map(Number);
      const [closeHours, closeMinutes] = this.openingHours[i].close.split(':').map(Number);

      const openTime = openHours * 60 + openMinutes;
      const closeTime = closeHours * 60 + closeMinutes;

      if (currentTime >= openTime && currentTime <= closeTime) {
        return true;
      }
    }
  }

  return false;
};

const Restaurant = mongoose.model<IRestaurant>('Restaurant', RestaruantSchema);

export default Restaurant;
