import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  // if the database is already connecteed,don't connect again

  if (connected) {
    console.log("mongo db is already connected");
    return;
  }

  // connect to  MongoDb
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("MongoDb connected....");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
