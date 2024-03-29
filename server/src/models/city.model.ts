import mongoose, { Schema, Document } from 'mongoose';

export interface ICity extends Document {
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

const City = mongoose.model<ICity>('City', CitySchema);

export default City;
