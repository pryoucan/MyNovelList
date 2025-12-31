import { z } from "zod";

export const userNovelValidator = z.object({
    progress: z.number().min(0).optional(),

    rating: z.number().min(1).max(10).multipleOf(0.5).nullable().optional(),

    status: z
        .enum(["Reading", "Completed", "On Hold", "Plan To Read", "Dropped"])
        .default("Reading"),

    startedAt: z.coerce.date().nullable().optional(),

    completedAt: z.coerce.date().nullable().optional(),
}).refine(
    (data) => {
        if (data.status === "Completed") {
            return data.completedAt != null;
        }
        return true;
    },
    {
        message: "completedAt required when status is completed",
        path: ["completedAt"],
    }
).refine(
        (data) => {
            if (data.status === "Reading") {
                return !data.completedAt;
            }
            return true;
        },
        {
            message: "Cannot set a completion date while status is 'Reading'",
            path: ["completedAt"],
        }
    );
