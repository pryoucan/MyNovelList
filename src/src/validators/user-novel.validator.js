import { z } from "zod";

export const userNovelSchema = z.object({

    progress:
    z.number().min(0).optional(),

    rating:
    z.number().min(1)
     .max(10)
     .multipleOf(0.5)
     .optional(),

    status:
    z.enum(["Reading", "Completed", 
        "On Hold", "Plan To Read", "Dropped"])
        .default("Reading"),

    startedAt:
    z.coerce.date().optional(),

    completedAt:
    z.coerce.date().optional(),

}).refine(
    (data) => {
        if(data.status === "Completed") {
            return data.completedAt != null;
        }
        return true;
    },
    {
        message: "completedAt required when status is completed",
        path: ["completedAt"]
    }
);