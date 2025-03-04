import mongoose from "mongoose";

// const connectionString = process.env.MONGO;
const connectionString = "mongodb+srv://eslamsemedo:Hi0JzWBRA6ROR8lj@ozonecluster.xtb3u.mongodb.net/?retryWrites=true&w=majority&appName=ozoneCluster";

if (!connectionString) {
  throw new Error("Please provide a valid connection string");
}

const connectDB = async () => {
  if (mongoose.connection?.readyState >= 1) {
    console.log("---- Already connected to MongoDB ----");
    return;
  }

  try {
    console.log("---- Connecting to MongoDB ----");
    await mongoose.connect(connectionString);
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

export default connectDB;