import { GlobalNovel } from "../models/global-novel.model.js"

export const viewNovels = async (req, res) => {

    try {
        const novels = await GlobalNovel.find({});
        if(novels.length === 0) {
            return res.status(404).json({
                message: "Novel not found"
            });
        }

        return res.status(200).json({
            message: "Novel fetched successfully",
            novel: novels
        });
    }
    catch(error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export const searchNovel = async (req, res) => {

    const { q } = req.query;
 
    try {
        const novels = await GlobalNovel.find({ $text: { $search: q } });
        if(novels.length === 0) {
            return res.status(404).json({
                message: "No novels found"
            });
        }
        return res.status(200).json({
            message: "Novel found",
            novel: novels
        });
    }
    catch(error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}