import { GlobalNovel } from "../models/global-novel.model.js";
import { UserNovel } from "../models/user-novel.model.js";

const viewUserNovel = async (req, res) => {
  try {
    const userId = req.user.id;
    const novels = await UserNovel.find({ user: userId });

    if (novels.length === 0) {
      return res.status(404).json({ message: "Novel is empty" });
    }
    return res.status(200).json({
      message: "Novels fetched successfully",
      novels,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getUserNovelById = async (req, res) => {
  try {
    const { novelId } = req.params;
    const userId = req.user.id;
    if (!novelId) {
      return res.status(401).json({ message: "Novel id is required" });
    }

    const novel = await UserNovel.findOne({ user: userId, _id: novelId });

    if (!novel) {
      return res.status(404).json({
        message: "Novel not found",
      });
    }

    return res.status(200).json({
      message: "Novel found successfully",
      novel,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getUserNovelByName = async (req, res) => {
  try {
    const { n } = req.query;
    if (name.length === 0) {
      return res.status(401).json({ message: "Novel name is required" });
    }

    const userId = req.user.id;
    const novels = await UserNovel.find({
      n: { $regex: n, $options: "i" },
      user: userId,
    });

    if (!novels) {
      return res.status(404).json({
        message: "Novel not found",
      });
    }

    return res.status(200).json({
      message: "Novel found successfully",
      novels,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const addUserNovel = async (req, res) => {
  const { novelId } = req.params;
  const { status, progress, rating, startedAt, completedAt } = req.body || {};

  if (!novelId) {
    return res.status(400).json({ message: "Novel id is required" });
  }

  try {
    const novel = await GlobalNovel.findById(novelId);
    if (!novel) {
      return res.status(404).json({ message: "Novel not found" });
    }

    const alreadyExists = await UserNovel.findOne({
      novel: novelId,
      user: req.user.id,
    });

    if (alreadyExists) {
      return res.status(409).json({ message: "Novel already in your list" });
    }

    let strictStatus = status ?? "Reading";
    if(novel.publication.status === "Upcoming") {
      strictStatus = "Plan To Read";
    }

    const upcomingForbiddenStatus = ["Reading", "Completed", "On Hold", "Dropped"];
    if (status !== undefined &&
      novel.publication.status === "Upcoming" &&
      upcomingForbiddenStatus.includes(status)
    ) {
      return res.status(400).json({
        message:
          "This novel has not released yet, you cannot mark it as anything but Plan To Read",
      });
    }

    if (
      (novel.publication.status === "Upcoming") &&
      (progress !== undefined && status !== "Plan To Read" ||
        rating !== undefined ||
        startedAt !== undefined ||
        completedAt !== undefined)
    ) {
      return res.status(400).json({
        message: `You cannot set progress, rating, or dates for an unreleased novel`,
      });
    }

    if(status === "Plan To Read" &&
      progress !== undefined ||
      rating !== undefined ||
      startedAt !== undefined ||
      completedAt !== undefined
    ) {
      return res.status(400).json({
        message: "You cannot set any field if the status is Plan To Read" 
      });
    }

    let progressCount = progress;
    if (
      typeof progress === "number" &&
      novel.chapterCount > 0 &&
      progress > novel.chapterCount
    ) {
      progressCount = novel.chapterCount;
    }

    const userNovel = await UserNovel.create({
      user: req.user.id,
      novel: novelId,
      status: strictStatus,
      progress: progressCount,
      rating,
      startedAt,
      completedAt,
    });

    return res.status(201).json({
      message: "Novel added to your list",
      userNovel,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const editUserNovel = async (req, res) => {
  const { novelId } = req.params;
  const { status, progress, rating, startedAt, completedAt } = req.body || {};

  if (!novelId) {
    return res.status(400).json({ message: "Novel id is required" });
  }

  try {
    const userNovel = await UserNovel.findOne({ _id: novelId, user: req.user.id });
    if (!userNovel) {
      return res.status(404).json({ message: "Novel not found" });
    }

    const globalNovelId = userNovel.novel;

    const novel = await GlobalNovel.findById(globalNovelId);
    if(!novel) {
      return res.status(404).json({ message: "Novel not found" });
    }

    const upcomingForbiddenStatus = ["Reading", "Completed", "On Hold", "Dropped"];
    if (status !== undefined &&
      novel.publication.status === "Upcoming" &&
      upcomingForbiddenStatus.includes(status)
    ) {
      return res.status(400).json({
        message:
          "This novel has not released yet, you cannot mark it as anything but Plan To Read",
      });
    }

    if (
      (novel.publication.status === "Upcoming") &&
      (progress !== undefined ||
        rating !== undefined ||
        startedAt !== undefined ||
        completedAt !== undefined)
    ) {
      return res.status(400).json({
        message: `You cannot set progress, rating, or dates for an unreleased novel`,
      });
    }
    
    if(status === "Plan To Read" &&
      progress !== undefined ||
      rating !== undefined ||
      startedAt !== undefined ||
      completedAt !== undefined
    ) {
      return res.status(400).json({
        message: "You cannot set any field if the status is Plan To Read" 
      });
    }

    let progressCount = progress
    if (
      typeof progress === "number" &&
      novel.chapterCount > 0 &&
      progress > novel.chapterCount
    ) {
      progressCount = novel.chapterCount;
    }

    const allowed_fields = [
      "status",
      "progress",
      "rating",
      "startedAt",
      "completedAt",
    ];

    const updates = {};
    for (const key of allowed_fields) {
      if (req.body[key] !== undefined) {
        updates[key] = key === "progress" ? progressCount : req.body[key];
      }
    }

    const updatedEntry = await UserNovel.findOneAndUpdate(
      {
        _id: novelId,
        user: req.user.id,
      },
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      message: "Novel updated successfully",
      updatedEntry,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteUserNovel = async (req, res) => {
  try {
    const { novelId } = req.params;
    const userId = req.user.id;

    const novel = await UserNovel.findOne({ _id: novelId, user: userId });
    if (!novel) {
      return res.status(404).json({ message: "Novel not found" });
    }

    const result = await UserNovel.deleteOne({ _id: novelId, user: userId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Cannot delete the novel" });
    }

    return res.status(200).json({ message: "Novel deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export {
  viewUserNovel,
  getUserNovelById,
  getUserNovelByName,
  addUserNovel,
  editUserNovel,
  deleteUserNovel
};
