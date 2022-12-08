const connection = require("../services/database");

const createArticle = async (req, res) => {
  res.send("Create New Article")
}

const getAllArticles = async (req, res) => {
  res.send("Get All Articles")
}

const getArticleById = async (req, res) => {
  res.send("Get Article By Id")
}

const updateArticleById = async (req, res) => {
  res.send("Update Article By Id")
}

const deleteArticleById = async (req, res) => {
  res.send("Delete Article By Id")
}

const likeArticleById = async (req, res) => {
  res.send("Like Article By Article Id")
}

const unlikeArticleById = async (req, res) => {
  res.send("Unlike Article By Article Id")
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