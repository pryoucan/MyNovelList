import mongoose from "mongoose";

const novelSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    author: {
      type: String,
      trim: true,
      lowercase: true,
      default: ""
    },
    chapter: {
      type: Number,
      default: 0,
      min: 0
    },
    totalChapter: {
      type: Number,
      required: [ function() {
        return (
        this.publishingStatus === "Finished" ||
        this.status === "Completed"
        );
      },
      "Total chapters required when novel is finished publishing"
    ],
      default: null
    },
    publishingStatus: {
      type: String,
      enum: ["Ongoing", "Finished", "Discontinued", "On Hiatus"],
      default: null
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

novelSchema.pre("save", function (next) {

  if (this.status === "Completed" && !this.completedAt) {
    this.completedAt = new Date();
  }
  if (this.status !== "Completed") {
    this.completedAt = null;
  }
  if (this.status === "Reading" && !this.startedAt) {
    this.startedAt = new Date();
  }

  next();
});

export default mongoose.model("Novel", novelSchema);
