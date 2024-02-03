import mongoose, { Schema } from 'mongoose';

export interface City {
  _id: mongoose.Types.ObjectId | string;
  name: string;
  location: [number];
  createdAt?: Date;
  updatedAt?: Date;
}

const CitySchema: Schema = new Schema(
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

const City = mongoose.model<City>('City', CitySchema);

export default City;
