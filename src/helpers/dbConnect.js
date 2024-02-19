import mongoose from "mongoose";
import config from "@/config/config";

const DbConnecton = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("Db Connected !");
  } catch (error) {
    console.log("Db Connected fail", error.message);
  }
};

export default DbConnecton;
