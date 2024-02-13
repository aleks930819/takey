import mongoose, { Schema } from 'mongoose';

export interface IFavorite {
  user: mongoose.Types.ObjectId | string;
  restaurant: mongoose.Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}

const FavoriteSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    }
  },
  {
    timestamps: true
  }
);

FavoriteSchema.pre(/^find/, function(next) {
  // @ts-expect-error
  this.populate({
    path: 'restaurant',
    select: 'name image isOpen'
  });
  next();
});

const Favorite = mongoose.model<IFavorite>('Favorite', FavoriteSchema);

export default Favorite;
