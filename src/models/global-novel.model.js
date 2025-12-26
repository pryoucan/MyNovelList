import mongoose, { Schema } from "mongoose";

const globalNovelSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    originalTitle: {
      type: String,
      default: null
    },

    author: {
      type: String,
      trim: true,
      required: true
    },

    originalLanguage: {
      type: String,
      enum: ["zh", "en"],
      required: true
    },

    isFullyTranslated: {
      type: Boolean,
      default: false
    },

    publishers: {
      original: {
        type: String,
        enum: ["Qidian", "Zongheng", "Jinjiang", "17K"],
        default: null
      },
      english: {
        type: String,
        enum: ["Wuxiaworld", "Web Novel"],
        default: null
      }
    },

    publication: {
      status: {
        type: String,
        enum: ["Ongoing", "Completed", "Upcoming", "On Hiatus", "Cancelled"],
        required: true
      },
      startYear: Number,
      endYear: Number
    },

    chapterCount: {
      type: Number,
      min: 0,
      default: null
    },

    coverImage: {
      type: String,
      default: null
    },

    synopsis: {
      type: String,
      default: null
    },

    genres: {
      type: [String],
      required: true
    },

    isApproved: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

globalNovelSchema.index({
  title: "text",
  originalTitle: "text",
  author: "text"
});

export const GlobalNovel = mongoose.model("GlobalNovel", globalNovelSchema);
