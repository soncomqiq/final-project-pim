const connection = require("../services/database");

const createArticle = async (req, res) => {
  const userId = req.user.id;
  const topic = req.body.topic;
  const content = req.body.content;
  await connection.query("INSERT INTO `articles` (`topic`, `content`, `user_id`) VALUES (?, ?, ?);", [topic, content, userId])
  res.status(200).send({message: "Already created a new article"})
}

const getAllArticles = async (req, res) => {
  const [allArticles] = await connection.query("SELECT a.id, a.topic, a.content, a.created_at, count(*) as like_amount FROM articles a LEFT JOIN user_like_articles ua ON a.id = ua.article_id WHERE a.deleted_at is NULL GROUP BY a.id");
  res.send(allArticles)
}

const getArticleById = async (req, res) => {
  const id = req.params.id;
  const [allArticles] = await connection.query("SELECT a.id, a.topic, a.content, a.created_at, count(*) as like_amount FROM articles a LEFT JOIN user_like_articles ua ON a.id = ua.article_id WHERE id = ? and a.deleted_at is NULL GROUP BY a.id", [id])

  if (allArticles.length === 0) {
    return res.status(404).send({message: "Article not found."})
  }

  res.status(200).send(allArticles[0])
}

const updateArticleById = async (req, res) => {
  const id = req.params.id;
  const topic = req.body.topic;
  const content = req.body.content;
  const [allArticles] = await connection.query("SELECT * FROM articles WHERE id = ? AND deleted_at is NULL", [id])

  if (allArticles.length === 0) {
    return res.status(404).send({message: "Article not found."})
  }

  await connection.query("UPDATE `articles` SET `topic` = ?, `content` = ? WHERE (`id` = ?)", [topic, content, id])

  res.status(200).send({message: "Article has been updated."})
}

const deleteArticleById = async (req, res) => {
  const id = req.params.id;
  const [allArticles] = await connection.query("SELECT * FROM articles WHERE id = ? AND deleted_at is NULL", [id])

  if (allArticles.length === 0) {
    return res.status(404).send({message: "Article not found."})
  }

  const current = new Date();
  await connection.query("UPDATE `articles` SET `deleted_at` = ? WHERE (`id` = ?)", [current, id])

  res.status(204).send();
}

const likeArticleById = async (req, res) => {
  const articleId = req.params.id;
  const userId = req.user.id;
  const [allArticles] = await connection.query("SELECT * FROM articles WHERE id = ? AND deleted_at is NULL", [articleId])

  if (allArticles.length === 0) {
    return res.status(404).send({message: "Article not found."})
  }

  const [likes] = await connection.query("SELECT * FROM user_like_articles WHERE user_id = ? and article_id = ?", [userId, articleId]);

  if (likes.length > 0) {
    return res.status(404).send({message: "You've already liked this article."})
  }

  await connection.query("INSERT INTO `user_like_articles` (`user_id`, `article_id`) VALUES (?, ?)", [userId, articleId])
  res.send({message: "You've liked this article."})
}

const unlikeArticleById = async (req, res) => {
  const articleId = req.params.id;
  const userId = req.user.id;
  const [allArticles] = await connection.query("SELECT * FROM articles WHERE id = ? AND deleted_at is NULL", [articleId])

  if (allArticles.length === 0) {
    return res.status(404).send({message: "Article not found."})
  }

  const [likes] = await connection.query("SELECT * FROM user_like_articles WHERE user_id = ? and article_id = ?", [userId, articleId]);

  if (likes.length === 0) {
    return res.status(404).send({message: "You haven't liked this articles."})
  }

  await connection.query("DELETE FROM `user_like_articles` WHERE (`user_id` = ?) and (`article_id` = ?);", [userId, articleId])
  es.send({message: "You've unliked this article."})
}

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticleById,
  deleteArticleById,
  likeArticleById,
  unlikeArticleById,
}