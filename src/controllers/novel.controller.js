import Novel from "../models/novel-model.js";

export const createNovel = async (req, res) => {
  try {
    const novelDetails = req.body;
    novelDetails.user = req.user.id;

    if (!novelDetails.name) {
      return res.status(401).json({ message: "Novel name is required" });
    }

    const existingNovel = await Novel.findOne({
      name: novelDetails.name.trim().toLowerCase(),
      author: (novelDetails.author || "").trim().toLowerCase(),
      user: req.user.id
    });

    if (existingNovel) {
      return res.status(400).json({ message: "Novel already exists" });
    }

    const newNovelData = await Novel.create(novelDetails);

    return res.status(201).json({
      message: "Novel created successfully",
      novel: newNovelData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const viewNovel = async (req, res) => {
  try {
    const userId = req.user.id;
    const novel = await Novel.find({ user: userId });
    if (novel.length === 0) {
      return res.status(400).json({ message: "Novel is empty" });
    }
    return res.status(200).json({
      message: "Novels fetched successfully",
      novels: novel,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const searchNovel = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(401).json({ message: "Novel name is required" });
    }

    const userId = req.user.id;
    const novels = await Novel.find({
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteNovel = async (req, res) => {
  try {
    const { novelId } = req.params;
    const userId = req.user.id;

    const novel = await Novel.findOne({ _id: novelId, user: userId });
    if (!novel) {
      return res.status(404).json({ message: "Novel not found" });
    }

    const result = await Novel.deleteOne({ _id: novelId, user: userId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Novel not found" });
    }

    return res.status(200).json({ message: "Novel deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
