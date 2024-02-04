import mongoose, { Schema } from 'mongoose';
import Restaurant from './restaurant.model';

export interface IReview {
  _id: mongoose.Types.ObjectId | string;
  review: string;
  rating: number;
  restaurant: mongoose.Types.ObjectId | string;
  user: mongoose.Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    review: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

ReviewSchema.pre(/^find/, function(next) {
  // @ts-ignore
  this.populate({
    path: 'user',
    select: 'name photo'
  });
  next();
});

// TODO: Debug why the index is not working
ReviewSchema.index({ restaurant: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calcAverageRatings = async function(restaruantId) {
  const stats = await this.aggregate([
    {
      $match: { restaurant: restaruantId }
    },
    {
      $group: {
        _id: '$restaurant',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  if (stats.length > 0) {
    await Restaurant.findByIdAndUpdate(restaruantId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await Restaurant.findByIdAndUpdate(restaruantId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5
    });
  }
};

ReviewSchema.post('save', function() {
  // @ts-ignore
  this.constructor.calcAverageRatings(this.restaurant);
});

// This middleware is executed before any 'findOneAnd...' query is executed.
ReviewSchema.pre(/^findOneAnd/, async function(next) {
  // Capture the current query and store it in the `this._originalQuery` property
  // @ts-ignore
  this._originalQuery = this.getQuery();
  next();
});

// This middleware is executed after a 'findOneAnd...' query has been executed.
ReviewSchema.post(/^findOneAnd/, async function() {
  // Use the stored original query to retrieve the document
  // @ts-ignore
  const doc = await this.model.findOne(this._originalQuery);

  // Trigger the calculation of average ratings for the associated restaurant
  await doc.constructor.calcAverageRatings(doc.restaurant);
});

const Review = mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
