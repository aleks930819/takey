import mongoose, { Schema } from 'mongoose';

export interface IMenuItem {
  _id: mongoose.Types.ObjectId | string;
  name: string;
  price: number;
  weight: string;
  cartQuantity?: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const MenuItemSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cartQuantity: {
      type: Number,
      default: 0,
    },
    weight: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const MenuItem = mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);

export default MenuItem;
