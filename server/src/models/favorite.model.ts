import mongoose, { Schema } from 'mongoose';

export interface IFavorite extends Document {
  user: mongoose.Types.ObjectId | string;
  restaurant: mongoose.Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
  isRestaurantInFavorite(restaurantId: mongoose.Types.ObjectId | string): Promise<IFavorite | null>;
}

const FavoriteSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    restaurants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
      }
    ]
  },
  {
    timestamps: true
  }
);

// Create index for user and restaurant
FavoriteSchema.index({ user: 1, restaurants: 1 }, { unique: true });

// Populate restaurants
FavoriteSchema.pre(/^find/, function(next) {
  // @ts-expect-error
  this.populate({
    path: 'restaurants',
    select: 'name image isOpen'
  });
  next();
});
FavoriteSchema.pre(/^find/, function(next) {
  // @ts-expect-error
  this.populate({
    path: 'user',
    select: '_id'
  });

  next();
});

FavoriteSchema.statics.isRestaurantInFavorite = async function(restaurantId) {
  const favorite = await this.findOne({ restaurants: restaurantId });

  return favorite;
};

const Favorite = mongoose.model<IFavorite>('Favorite', FavoriteSchema);

export default Favorite;
