import mongoose, { Schema } from 'mongoose';

export interface IMenuItem {
  _id: mongoose.Types.ObjectId | string;
  name: string;
  price: number;
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
    quantity: {
      type: Number,
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
