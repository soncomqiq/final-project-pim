const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  res.send("Admin Register")
})

router.get("/users", (req, res) => {
  res.send("Admin Users")
})

router.get("/users/:id", (req, res) => {
  res.send("Admin Users By Id")
})

router.put("/users/:id/profile", (req, res) => {
  res.send("Admin Users By Id")
})

module.exports = router;