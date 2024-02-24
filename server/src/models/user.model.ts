/* eslint-disable no-unused-vars */
import mongoose, { Schema, Document } from 'mongoose';
import { NextFunction } from 'express';

import * as bcrypt from 'bcrypt';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId | string;
  name: string;
  role: string;
  email: string;
  password: string;
  photo: string;
  active: boolean;
  address: {
    city: string;
    streetName: string;
    streetNumber: string;
    phone: string;
  };
  passwordChangedAt: Date;
  resetPasswordToken: number;
  resetPasswordExpires: Date;
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  changedPasswordAfter(JWTTimestamp: number): boolean;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
      default: 'https://res.cloudinary.com/dbrewse3d/image/upload/v1706957974/default-profiel_cd3lbd.jpg',
    },
    active: {
      type: Boolean,
      default: true,
    },
    address: {
      city: {
        type: String,
      },
      streetName: {
        type: String,
      },
      streetNumber: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    passwordChangedAt: {
      type: Date,
    },
    resetPasswordToken: {
      type: Number,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next: NextFunction) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(12);

  this.password = await bcrypt.hash(this.password as string, salt);

  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as IUser;

  const userWithPassword = await mongoose.model('User').findById(user._id).select('+password');

  if (!userWithPassword) {
    return false;
  }

  return bcrypt.compare(candidatePassword, userWithPassword.password).catch((err) => false);
};

UserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt && JWTTimestamp) {
    const changedTimestamp = parseInt((this.passwordChangedAt.getTime() / 1000).toString(), 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Create and export the user model
const User = mongoose.model<IUser>('User', UserSchema);

export default User;
