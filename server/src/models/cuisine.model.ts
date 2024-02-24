import mongoose, { Schema,Document } from 'mongoose';

export interface ICuisine extends Document {
  _id: mongoose.Types.ObjectId | string;
  name: string;
  imageCover: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const CuisineSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    imageCover: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Cuisine = mongoose.model<ICuisine>('Cuisine', CuisineSchema);

export default Cuisine;
