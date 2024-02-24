import mongoose, { Schema, Document } from 'mongoose';

import slugify from 'slugify';

export interface IStaticPage extends Document {
  _id: mongoose.Types.ObjectId | string;
  title: string;
  slug: string;
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
    slug: {
      type: String,
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

// Generate slug before saving
StaticPageSchema.pre<IStaticPage>('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true });
  }
  next();
});

const StaticPage = mongoose.model<IStaticPage>('StaticPage', StaticPageSchema);

export default StaticPage;
