import { z } from "zod";

export const novelAddRequestSchema = z.object({
  englishTitle: z.string().min(1),

  alternativeTitles: z.array(z.string()).optional(),

  author: z.string().min(1),

  language: z.enum(["Mandarin", "Korean", "Japanese", "English"]),

  status: z.enum(["Ongoing", "Completed", "On Hiatus", "Cancelled"]),

  synopsis: z.string().optional(),

  genre: z.array(z.string()).min(1),

  totalChapters: z.number().optional(),

  finishedYear: z.number().optional(),
});