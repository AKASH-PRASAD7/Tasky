import mongoose from "mongoose";
const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    userid: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    title: { type: String, required: true },
    type: { type: String, default: "Tech" },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tasks", TaskSchema);
