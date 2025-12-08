import { z } from "zod";

export const novelEditRequestSchema = z.object({

    updatedFields:
    z.record(z.any()).min(1, "At least one field is required for update")
});