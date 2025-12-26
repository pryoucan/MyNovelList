import mongoose from "mongoose";

const userNovelSchema = new mongoose.Schema(
  {
    novel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GlobalNovel",
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    progress: {
      type: Number,
      min: 0,
      default: 0
    },

    rating: {
      type: Number,
      min: 1,
      max: 10,
      default: null
    },

    readingStatus: {
      type: String,
      enum: ["Reading", "Completed", "On Hold", "Plan To Read", "Dropped"],
      default: "Reading"
    },

    startedAt: {
      type: Date,
      default: null
    },

    completedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

userNovelSchema.index(
  { user: 1, novel: 1 },
  { unique: true }
);

export const UserNovel = mongoose.model("UserNovel", userNovelSchema);
