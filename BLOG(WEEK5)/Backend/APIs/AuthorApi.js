import exp from "express";
import { register } from "../services/authService.js";
import { ArticleModel } from "../Models/ArticleModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../config/multer.js";
import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";

export const authorRoute = exp.Router();

authorRoute.post("/users", upload.single("profileImageUrl"), async (req, res, next) => {
  let cloudinaryResult;

  try {
    const userObj = req.body;

    if (req.file) {
      cloudinaryResult = await uploadToCloudinary(req.file.buffer);
    }

    const newUserObj = await register({
      ...userObj,
      role: "AUTHOR",
      profileImageUrl: cloudinaryResult?.secure_url,
    });

    res.status(201).json({ message: "author created", payload: newUserObj });
  } catch (err) {
    if (cloudinaryResult?.public_id) {
      await cloudinary.uploader.destroy(cloudinaryResult.public_id);
    }
    next(err);
  }
});

authorRoute.post("/articles", verifyToken("AUTHOR"), async (req, res, next) => {
  try {
    const article = req.body;
    if (article.author !== req.user.userId) {
      return res.status(403).json({ message: "Forbidden. You can create only your own articles" });
    }

    const createdArticleDoc = await new ArticleModel(article).save();
    res.status(201).json({ message: "article created", payload: createdArticleDoc });
  } catch (err) {
    next(err);
  }
});

authorRoute.get("/articles/:authorId", verifyToken("AUTHOR"), async (req, res, next) => {
  try {
    const { authorId } = req.params;
    if (authorId !== req.user.userId) {
      return res.status(403).json({ message: "Forbidden. You can access only your own articles" });
    }

    const articles = await ArticleModel.find({ author: authorId })
      .populate("author", "firstName email profileImageUrl")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "articles", payload: articles });
  } catch (err) {
    next(err);
  }
});

authorRoute.put("/articles", verifyToken("AUTHOR"), async (req, res, next) => {
  try {
    const author = req.user.userId;
    const { articleId, title, category, content } = req.body;

    const articleOfDB = await ArticleModel.findOne({ _id: articleId, author });
    if (!articleOfDB) {
      return res.status(404).json({ message: "Article not found" });
    }

    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      articleId,
      { $set: { title, category, content } },
      { new: true, runValidators: true },
    ).populate("author", "firstName email profileImageUrl");

    res.status(200).json({ message: "article updated", payload: updatedArticle });
  } catch (err) {
    next(err);
  }
});

authorRoute.patch("/articles/:id/status", verifyToken("AUTHOR"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isArticleActive } = req.body;
    const article = await ArticleModel.findById(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Forbidden. You can only modify your own articles" });
    }

    if (article.isArticleActive === isArticleActive) {
      return res.status(400).json({ message: `Article is already ${isArticleActive ? "active" : "deleted"}` });
    }

    article.isArticleActive = isArticleActive;
    await article.save();

    res.status(200).json({
      message: `Article ${isArticleActive ? "restored" : "deleted"} successfully`,
      payload: article,
    });
  } catch (err) {
    next(err);
  }
});
