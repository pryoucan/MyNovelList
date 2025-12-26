import { ZodError } from "zod";

const validate = (schema) => (req, res, next) => {
    try {
        const parsed = schema.parse(req.body);
        req.body = parsed;
        next();
    }
    catch(error) {
        if(error instanceof ZodError) {
            console.log(error)
            return res.status(400).json({
                message: "Validation failed",
                errors: error
            });
        }

        next(error);
    }
};


export { validate };