import mongoose, { Schema, Document } from 'mongoose';

export interface INavigation extends Document {
  _id: mongoose.Types.ObjectId | string;
  title: string;
  location: 'header' | 'footer';
  items?: Array<{ name: string; link: string }>;
  createdAt?: Date;
  updatedAt?: Date;
}

const NavigationSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      enum: ['header', 'footer'],
      required: true,
    },
    items: [
      {
        name: {
          type: String,
          required: true,
        },
        link: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Navigation = mongoose.model<INavigation>('Navigation', NavigationSchema);

export default Navigation;
