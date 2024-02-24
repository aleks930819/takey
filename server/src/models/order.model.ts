import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
  _id: mongoose.Types.ObjectId | string;
  user?: mongoose.Types.ObjectId | string;
  paymentMethod: string;
  paid?: boolean;
  guest?: {
    name: string;
    phone: string;
    streetNumber: string;
    streetName: string;
  };
  restaurant: mongoose.Types.ObjectId | string;
  menuItems: Array<{ menuItems: mongoose.Types.ObjectId | string; quantity: number }>;
  total: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    guest: {
      name: {
        type: String,
      },
      phone: {
        type: String,
      },
      streetNumber: {
        type: String,
      },
      streetName: {
        type: String,
      },
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    menuItems: [
      {
        menuItem: {
          type: Schema.Types.ObjectId,
          ref: 'MenuItem',
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
