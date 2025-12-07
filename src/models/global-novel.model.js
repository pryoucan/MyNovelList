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
    country: {
      type: String,
      enum: ["China", "Korea", "Japan"],
      required: true
    },
    status: {
      type: String,
      enum: ["Ongoing", "Completed", "On Hiatus", "Cancelled"],
      default: "Ongoing"
    },
    totalChapters: {
      type: Number,
      min: 0,
      default: 0
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
      enum: [
        "Xianxia",
        "Xuanhuan",
        "Wuxia",
        "Martial Arts",
        "Fantasy",
        "Thriller",
        "Mystery",
        "Drama",
        "Crime",
        "Romance",
        "Sci-Fi",
        "Horror",
        "Adventure",
        "Historical",
        "Slice of Life",
        "Comedy",
        "Supernatural",
      ],
      required: true
    },
    approved: {
      type: Boolean,
      default: false
    },
    startYear: {
      type: Number,
      default: null
    },
    finishedYear: {
      type: Number,
      default: null
    },
  },
  { timestamps: true }
);

globalNovelSchema.index({ englishTitle: "text", alternativeTitles: "text" });

export default mongoose.model("GlobalNovel", globalNovelSchema);
