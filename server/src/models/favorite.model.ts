/* eslint-disable no-unused-vars */
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IFavorite extends Document {
  user: mongoose.Types.ObjectId | string;
  restaurant: mongoose.Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFavoriteModel extends Model<IFavorite> {
  isRestaurantInFavorite(restaurantId: mongoose.Types.ObjectId | string): Promise<IFavorite | null>;
}

const FavoriteSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    restaurants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

FavoriteSchema.index({ user: 1 }, { unique: true });

// Populate restaurants
FavoriteSchema.pre(/^find/, function (next) {
  // @ts-expect-error: Explanation: TypeScript cannot infer the type of 'this' in Mongoose schema hooks, so we use @ts-expect-error to suppress the error.
  this.populate({
    path: 'restaurants',
    select: 'name image',
  });
  next();
});

FavoriteSchema.statics.isRestaurantInFavorite = async function (restaurantId) {
  const favorite = await this.findOne({ restaurants: restaurantId });

  return favorite;
};

const Favorite = mongoose.model<IFavorite, IFavoriteModel>('Favorite', FavoriteSchema);

export default Favorite;
