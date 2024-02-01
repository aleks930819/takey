import mongoose from 'mongoose';

import { environment } from '../environments';

/**
 * Connects to the MongoDB database.
 * @returns {Promise<void>} A promise that resolves when the connection is established.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(environment.db_uri);
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
