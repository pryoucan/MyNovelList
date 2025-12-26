import { GlobalNovel } from "../models/global-novel.model.js";
import { NovelAddRequest } from "../models/novel-add-request.model.js"

const viewRequest = async (req, res) => {
    if (req.body.role !== "ADMIN") {
        return res.status(403).json({ message: "Access denied" });
    }
    try {
        const novel = await NovelAddRequest.find({});
        if (novel.length === 0) {
            return res.status(404).json({
                message: "No record found"
            });
        }
        return res.status(200).json({
            message: "Novel fetched successfully",
            novels: novel
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}


const approveRequest = async (req, res) => {
    if (req.body.role !== "ADMIN") {
        return res.status(403).json({ message: "Access denied" });
    }
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


const rejectRequest = async (req, res) => {
    if (req.body.role !== "ADMIN") {
        return res.status(403).json({ message: "Access denied" });
    }
    const { novelID } = req.params;
    try {
        const novelToReject = await NovelAddRequest.findById(novelID);

        if (!novelToReject) {
            return res.status(404).json({
                message: "Novel not found",
            });
        }

        const deleteResult = await NovelAddRequest.deleteOne({ _id: novelID });
        if (deleteResult.deletedCount === 1) {
            return res.status(200).json({
                message: "Novel rejected & deleted successfully",
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}

export { viewRequest, approveRequest, rejectRequest };