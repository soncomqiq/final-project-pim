const express = require("express");
const {authenticateToken} = require("../middlewares/jwt");
const {
  createArticle,
  getArticleById,
  updateArticleById,
  deleteArticleById,
  likeArticleById,
  unlikeArticleById,
  getAllArticles
} = require("../controllers/articles");
const router = express.Router();

router.use(authenticateToken)

router.post("/", createArticle)
router.get("/", getAllArticles)
router.get("/:id", getArticleById)
router.put("/:id", updateArticleById)
router.delete("/:id", deleteArticleById)
router.put("/:id/like", likeArticleById)
router.delete("/:id/like", unlikeArticleById)

module.exports = router;