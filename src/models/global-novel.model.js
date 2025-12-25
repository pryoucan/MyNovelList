import mongoose, { Schema } from "mongoose";

const globalNovelSchema = new Schema(
  {
    englishTitle: {
      type: String,
      required: true,
      trim: true
    },
    alternativeTitles: {
      type: [String],
      default: []
    },
    author: {
      type: String,
      trim: true,
      required: true
    },
    language: {
      type: String,
      enum: ["Mandarin", "English"],
      required: true
    },
    completelyTranslated: {
      type: Boolean,
      default: false
    },
    originalPublisher: {
      type: String, 
      enum: ["Qidian", "Zongheng", "Jinjiang", "17K"],
      default: null
    },
    englishPublisher: {
      type: String,
      enum: ["Wuxiaworld", "Web Novel"],
      default: null
    },
    status: {
      type: String,
      enum: ["Ongoing", "Completed", "On Hiatus", "Cancelled"],
      required: true
    },
    totalChapters: {
      type: Number,
      min: 0,
      default: null,
    },
    coverImage: {
      type: String,
      default: null
    },
    synopsis: {
      type: String,
      default: null
    },
    genre: {
      type: [String],
      required: true
    },
    startYear: {
      type: Number,
      default: null
    },
    finishedYear: {
      type: Number,
      default: null,
    },
    approved: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true });

globalNovelSchema.index({ englishTitle: "text", alternativeTitles: "text" });

export const GlobalNovel = mongoose.model("GlobalNovel", globalNovelSchema);
