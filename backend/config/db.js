import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.warn("⚠️  Warning: MONGO_URI is missing or empty in .env. Please configure your MongoDB connection string.");
      return;
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message || error);
  }
};

export default connectDB;