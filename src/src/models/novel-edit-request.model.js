import mongoose, { Schema } from "mongoose";

const novelEditRequestSchema = new Schema(
  {
    novelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GlobalNovel",
      required: true,
    },
    editedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedFields: {
      type: Object,
      required: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true });

  export const NovelEditRequest = mongoose.model("NovelEditRequest", novelEditRequestSchema);
