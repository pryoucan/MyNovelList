import mongoose, { Schema } from "mongoose";

const novelAddRequestSchema = new Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    englishTitle: {
      type: String,
      required: true,
      trim: true,
    },
    alternativeTitles: {
      type: [String],
      default: null
    },
    author: {
      type: String,
      trim: true,
      required: true,
    },
    language: {
      type: String,
      enum: ["Mandarin", "English"],
      required: true,
    },
    completelyTranslated: {
      type: Boolean,
      default: false,
    },
    originalPublisher: {
      type: String,
      enum: ["Qidian", "Zongheng", "Jinjiang", "17K"],
      default: null,
    },
    englishPublisher: {
      type: String,
      enum: ["Wuxiaworld", "Web Novel"],
      default: null,
    },
    novelStatus: {
      type: String,
      enum: ["Ongoing", "Completed", "On Hiatus", "Cancelled"],
      default: "Ongoing"
    },
    totalChapters: {
      type: Number,
      min: 0,
      default: null,
    },
    coverImage: {
      type: String,
      default: null,
    },
    synopsis: {
      type: String,
      default: null,
    },
    genre: {
      type: [String],
      required: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    startYear: {
      type: Number,
      default: null,
    },
    finishedYear: {
      type: Number,
      default: null,
    }
  },
  { timestamps: true });

export const NovelAddRequest = mongoose.model("NovelAddRequest", novelAddRequestSchema);
