import mongoose, { Schema } from 'mongoose';

export interface IRestaurantMenu {
  _id: mongoose.Types.ObjectId | string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const RestaurantMenuSchema: Schema = new Schema(
  {
    restaurantId: {
      type: mongoose.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    items: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'MenuItem',
      },
    ],
  },
  {
    timestamps: true,
  },
);

const RestaurantMenu = mongoose.model<IRestaurantMenu>('RestaurantMenu', RestaurantMenuSchema);

export default RestaurantMenu;
