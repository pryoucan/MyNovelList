import mongoose, { Schema } from "mongoose";

const novelAddRequestSchema = new Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    title: {
      type: String,
      required: true,
      trim: true
    },

    originalTitle: {
      type: String,
      trim: true,
      required: true
    },

    author: {
      type: String,
      trim: true,
      require: true
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
      default: false
    }
  },
  { timestamps: true });

export const NovelAddRequest = mongoose.model("NovelAddRequest", novelAddRequestSchema);
