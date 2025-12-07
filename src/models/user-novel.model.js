import mongoose from "mongoose";

const userNovelSchema = new mongoose.Schema(
  {
    novel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    progress: {
      type: Number,
      default: 0,
      min: 0
    },
    score: {
      type: Number,
      min: 1,
      max: 10
    },
    status: {
      type: String,
      enum: ["Reading", "Completed", "On Hold", "Plan To Read", "Dropped"],
      default: null
    },
    startedAt: {
      type: Date,
      default: null
    },
    completedAt: {
      type: Date,
      default: null
    },
  },
  { timestamps: true }
);


export default mongoose.model("UserNovel", userNovelSchema);
