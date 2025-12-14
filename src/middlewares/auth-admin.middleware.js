export const adminAuthentication = async (req, res, next) => {
    try {
        const { adminID } = req.params;
        if (adminID != process.env.ADMIN_KEY) {
            return res.status(401).json({
                message: "Access denied",
            });
        }
        next();
    } 
    catch (error) {
        next(error);
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};
