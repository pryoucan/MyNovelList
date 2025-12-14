import { GlobalNovel } from "../models/global-novel.model.js";
import { NovelAddRequest } from "../models/novel-add-request.model.js"

export const viewRequests = async (req, res) => {
    try {
        const novel = await NovelAddRequest.find({});
        if (novel) {
            return res.status(200).json({
                message: "Novel fetched successfully",
                novels: novel
            });
        }
        else {
            return res.status(404).json({
                message: "No record found"
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}

export const approveRequests = async (req, res) => {
    const { novelID } = req.params;
    try {
        const novelToApprove = await NovelAddRequest.findById(novelID);

        if (!novelToApprove) {
            return res.status(404).json({
                message: "Novel not found",
            });
        }

        const novelData = novelToApprove.toObject();

        delete novelData._id;
        delete novelData.createdBy;
        delete novelData.approved;
        delete novelData.createdAt;
        delete novelData.updatedAt;

        const globalNovel = await GlobalNovel.create({
            ...novelData,
            approved: true
        });

        await novelToApprove.deleteOne();

        return res.status(200).json({
            message: "Approved by admin: Novel added to global db",
            novel: globalNovel
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}