import { NovelAddRequest } from "../models/novel-add-request.model.js";

const novelAddRequest = async (req, res) => {

    try {
        const novel = await NovelAddRequest.create({
            ...req.body,
            createdBy: req.user.id
        });
        return res.status(200).json({
            message: "You have successfully sent the novel request",
            novel: novel
        });
    }
    catch (error) {

        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
}

export { novelAddRequest };