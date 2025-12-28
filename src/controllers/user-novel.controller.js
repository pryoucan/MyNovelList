import { GlobalNovel } from "../models/global-novel.model.js";
import { UserNovel } from "../models/user-novel.model.js"

const viewNovel = async (req, res) => {
  try {
    const userId = req.user.id;
    const novel = await UserNovel.find({ user: userId })
      .populate({
        path: "novel",
        select: `
      englishTitle
      alternativeTitles
      author
      language
      completelyTranslated
      originalPublisher
      englishPublisher
      status
      totalChapters
      synopsis
      genre
      startYear
      finishedYear
      `
      })
      ;
    if (novel.length === 0) {
      return res.status(404).json({ message: "Novel is empty" });
    }
    return res.status(200).json({
      message: "Novels fetched successfully",
      novels: novel,
    });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


const searchNovel = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(401).json({ message: "Novel name is required" });
    }

    const userId = req.user.id;
    const novels = await UserNovel.find({
      name: { $regex: name, $options: "i" },
      user: userId,
    });

    if (!novels.length) {
      return res.status(404).json({
        message: "Novel not found",
      });
    }

    return res.status(200).json({
      message: "Novel found successfully",
      novels,
    });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


const addNovel = async (req, res) => {
  const { novelId } = req.params;
  const { status, progress, rating, startedAt, completedAt } = req.body;

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
      user: req.user.id
    });

    if (alreadyExists) {
      return res.status(409).json({ message: "Novel already in your list" });
    }

    const forbiddenStatus = ["Reading", "Completed", "On Hold", "Dropped"]
    if (novel.publication.status === "Upcoming" && forbiddenStatus.includes(status)) {
      return res.status(400).json({
        message: "This novel has not released yet, you cannot mark it as anything but Plan To Read"
      });
    }

    if ((novel.publication.status === "Upcoming" ||
      novel.publication.status === "Plan To Read") && (progress > 0 ||
      rating !== null || startedAt !== null || completedAt !== null)) {
      return res.status(400).json({
        message: `You cannot set progress, rating, or dates for an unreleased 
        or Plan To Read novel`
      });
    }

    if (typeof progress === "number" &&
      novel.chapterCount > 0 &&
      progress > novel.chapterCount) {
        progress = novel.chapterCount;
    }

    const userNovel = await UserNovel.create({
      novel: novelId,
      status,
      progress,
      rating,
      startedAt,
      completedAt,
      user: req.user.id,
    });

    return res.status(200).json({
      message: "Novel added to your list",
      userNovel
    });
  }
  catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

const editNovel = async (req, res) => {
  const { status, chapter, startedAt, completedAt } = req.body;
  const { novelId } = req.params;
  const userId = req.user.id;

  if (status === "Completed" && !totalChapter) {
    return res.status(400).json({
      message: "Total Chapter required when reading status is completed"
    });
  }

  if (status === "Completed" && chapter > totalChapter) {
    return res.status(400).json({
      message: "Read chapter cannot be more than Total Chpater"
    });
  }

  try {
    const updatedNovel = await UserNovel.findOneAndUpdate(
      { user: userId, _id: novelId },
      { chapter, totalChapter, status, startedAt, completedAt },
      { new: true }
    ).lean();

    if (!updatedNovel) {
      return res.status(404).json({
        message: "Novel not found"
      });
    }

    return res.status(200).json({
      message: "Novel updated successfully",
      novel: updatedNovel
    });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}


const deleteNovel = async (req, res) => {
  try {
    const { novelId } = req.params;
    const userId = req.user.id;

    const novel = await UserNovel.findOne({ _id: novelId, user: userId });
    if (!novel) {
      return res.status(404).json({ message: "Novel not found" });
    }

    const result = await UserNovel.deleteOne({ _id: novelId, user: userId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Novel not found" });
    }

    return res.status(200).json({ message: "Novel deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export { viewNovel, searchNovel, addNovel, editNovel, deleteNovel };