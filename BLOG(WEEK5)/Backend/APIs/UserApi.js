import exp from "express";
import { register } from "../services/authService.js";
import { ArticleModel } from "../Models/ArticleModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../config/multer.js";
import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";

export const userRoute = exp.Router();

userRoute.post("/users", upload.single("profileImageUrl"), async (req, res, next) => {
  let cloudinaryResult;

  try {
    const userObj = req.body;

    if (req.file) {
      cloudinaryResult = await uploadToCloudinary(req.file.buffer);
    }

    const newUserObj = await register({
      ...userObj,
      role: "USER",
      profileImageUrl: cloudinaryResult?.secure_url,
    });

    res.status(201).json({ message: "user created", payload: newUserObj });
  } catch (err) {
    if (cloudinaryResult?.public_id) {
      await cloudinary.uploader.destroy(cloudinaryResult.public_id);
    }

    next(err);
  }
});

userRoute.get("/articles", verifyToken("USER"), async (req, res, next) => {
  try {
    const articles = await ArticleModel.find({ isArticleActive: true })
      .populate("author", "firstName email profileImageUrl")
      .populate("comments.user", "email firstName")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "all articles", payload: articles });
  } catch (err) {
    next(err);
  }
});

userRoute.get("/article/:id", verifyToken("USER", "AUTHOR"), async (req, res, next) => {
  try {
    const article = await ArticleModel.findById(req.params.id)
      .populate("author", "firstName email profileImageUrl")
      .populate("comments.user", "email firstName");

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (!article.isArticleActive && article.author?._id?.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.status(200).json({ message: "article", payload: article });
  } catch (err) {
    next(err);
  }
});

userRoute.put("/articles", verifyToken("USER"), async (req, res, next) => {
  try {
    const { articleId, comment } = req.body;
    const user = req.user.userId;

    const articleWithComment = await ArticleModel.findOneAndUpdate(
      { _id: articleId, isArticleActive: true },
      { $push: { comments: { user, comment } } },
      { new: true, runValidators: true },
    )
      .populate("author", "firstName email profileImageUrl")
      .populate("comments.user", "email firstName");

    if (!articleWithComment) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({ message: "comment added successfully", payload: articleWithComment });
  } catch (err) {
    next(err);
  }
});
