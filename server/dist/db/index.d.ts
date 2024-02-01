/**
 * Connects to the MongoDB database.
 * @returns {Promise<void>} A promise that resolves when the connection is established.
 */
declare const connectDB: () => Promise<void>;
export default connectDB;
