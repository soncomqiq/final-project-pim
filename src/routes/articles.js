const express = require("express");
const {authenticateToken} = require("../middlewares/jwt");
const router = express.Router();

router.use(authenticateToken)

router.post("/", (req, res) => {
  res.send("Create an Article")
})

router.get("/", (req, res) => {
  res.send("Get All Articles")
})

router.get("/:id", (req, res) => {
  res.send("Get Article By Id")
})

router.put("/:id", (req, res) => {
  res.send("Update Article By Id")
})

router.delete("/:id", (req, res) => {
  res.send("Delete Article By Id")
})

router.put("/:id/like", (req, res) => {
  res.send("Like Article By Id")
})

router.delete("/:id/like", (req, res) => {
  res.send("Unlike Article By Id")
})

module.exports = router;