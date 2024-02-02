import mongoose from 'mongoose';

export interface Review {
  review: string;
  rating: number;
  restaurant: mongoose.Types.ObjectId | string;
  user: mongoose.Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}

const reviewSchema = new mongoose.Schema(
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

// Prevent a user from submitting multiple reviews for the same restaurant
reviewSchema.index({ restaurant: 1, user: 1 }, { unique: true });

const Review = mongoose.model<Review>('Review', reviewSchema);

export default Review;
