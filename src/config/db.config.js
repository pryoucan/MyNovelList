import mongoose from "mongoose";

const dbConnectivity = async () => {
  try {
    const dbConnectionStatus = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `Database connection success: ${dbConnectionStatus.connection.host}`
    );
  } catch (error) {
    console.log(`Database connection is failed: ${error}`);
    throw error;
  }
};

export default dbConnectivity;
