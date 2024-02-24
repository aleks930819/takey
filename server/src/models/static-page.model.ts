import mongoose, { Schema, Document } from 'mongoose';

export interface IStaticPage extends Document {
  _id: mongoose.Types.ObjectId | string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const StaticPageSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const StaticPage = mongoose.model<IStaticPage>('StaticPage', StaticPageSchema);

export default StaticPage;
