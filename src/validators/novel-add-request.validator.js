import { z } from "zod";

export const novelAddRequestValidator = z
  .object({
    title: z.string().min(1, "Title is required"),

    originalTitle: z.string().nullable().optional(),

    author: z.string().min(1, "Author is required"),

    originalLanguage: z.enum(["zh", "en"]),

    publishers: z
      .object({
        original: z
          .enum(["Qidian", "Zongheng", "Jinjiang", "17K"])
          .nullable()
          .optional(),

        english: z
          .enum(["Wuxiaworld", "Web Novel"])
          .nullable()
          .optional(),
      })
      .optional(),

    publication: z.object({
      status: z.enum([
        "Ongoing",
        "Completed",
        "Upcoming",
        "On Hiatus",
        "Cancelled",
      ]),
      startYear: z.number().int().optional(),
      endYear: z.number().int().optional(),
    }),

    chapterCount: z.number().int().min(0).nullable().optional(),

    synopsis: z.string().optional(),

    genres: z.array(z.string()).min(1, "At least one genre is required"),
  })
  .refine(
    (data) => {
      if (data.publication.status === "Completed") {
        return (
          data.chapterCount !== null &&
          data.chapterCount !== undefined &&
          data.publication.endYear !== undefined
        );
      }
      return true;
    },
    {
      message:
        "chapterCount and publication.endYear are required when status is Completed",
      path: ["chapterCount"],
    }
  );
