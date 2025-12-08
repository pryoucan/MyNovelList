import { z } from "zod";

export const globalNovelSchema = z.object({
    
    englishTitle: 
    z.string().min(1),

    alternativeTitles: 
    z.array(z.string()).optional(),
    
    author: 
    z.string().min(1),
    
    language: 
    z.enum(["Mandarin", "English"]),
    
    completelyTranslated: 
    z.boolean().optional(),

    originalPublisher:
    z.enum(["Qidian", "Zongheng", "Jinjiang", "17K"]).optional(),

    englishPublisher:
    z.enum(["Wuxiaworld", "Web Novel"]).optional(),

    status:
    z.enum(["Ongoing", "Completed", "On Hiatus", "Cancelled"]),

    totalChapters:
    z.number().int().min(0).nullable().optional(),

    coverImage:
    z.string().url().optional(),

    synopsis:
    z.string().optional(),

    genre:
    z.array(z.string()).min(1),

    approved:
    z.boolean().optional(),

    startYear:
    z.number().optional(),

    finishedYear:
    z.number().optional()
}).refine(
    (data) => {
        if(data.status === "Completed") {
            return data.totalChapters != null && 
            data.finishedYear != null;
        }

        return true;
    },
    {
        message: `Totalchapters and FinishedYear required
        when publishing status is completed`, path: ["totalChapters"],
    }
);