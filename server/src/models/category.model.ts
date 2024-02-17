import mongoose, { Schema } from 'mongoose';

export interface ICategory {
  _id: mongoose.Types.ObjectId | string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const CategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Category = mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
