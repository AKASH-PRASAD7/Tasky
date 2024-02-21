import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import config from "@/config/config";
import jwt from "jsonwebtoken";

const { Schema, model, models } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, min: 5, max: 20 },
    password: { type: String, required: true, min: 8, max: 15 },
    tasks: [{ type: mongoose.Types.ObjectId, ref: "tasks" }],
  },
  {
    timestamps: true,
  }
);

//method
UserSchema.methods.generateJwtToken = function () {
  try {
    return jwt.sign({ user: this._id.toString() }, config.secretKey);
  } catch (error) {
    return error;
  }
};

const UserModel = models.users || model("users", UserSchema);
export default UserModel;
