import mongoose from 'mongoose';

export interface City {
  name: string;
  location: [number];
  createdAt?: Date;
  updatedAt?: Date;
}

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    location: {
      type: [Number]
    }
  },
  {
    timestamps: true
  }
);

const City = mongoose.model<City>('City', citySchema);

export default City;
