import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    userId: { type: String, required: true },
    sharedWith: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
