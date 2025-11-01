import mongoose from "mongoose";

const dbconnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(error);
  }
};

export default dbconnection;
