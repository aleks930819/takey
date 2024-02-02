import mongoose from 'mongoose';

export interface Cuisine {
  name: string;
  imageCover: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const cuisineSchema = new mongoose.Schema(
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

const Cuisine = mongoose.model<Cuisine>('Cuisine', cuisineSchema);

export default Cuisine;
