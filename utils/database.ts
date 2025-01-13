import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is alread conneted");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL as string, {
      dbName: "databaseadmin",
    });

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error: any) {
    throw new Error("Error failed" + error.message);
  }
};
