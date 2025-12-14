import { ZodError } from "zod";

export const validate = (schema) => (req, res, next) => {
    try {
        const parsed = schema.parse(req.body);
        req.body = parsed;
        next();
    }
    catch(error) {
        if(error instanceof ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error
            });
        }

        next(error);
    }
};