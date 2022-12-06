const express = require("express");
const {authenticateToken} = require("../middlewares/jwt");
const router = express.Router();

router.use(authenticateToken)

router.put("/:id/profile", (req, res) => {
  res.send("Edit profile by ID")
})

router.put("/:id/password", (req, res) => {
  res.send("Edit profile by ID")
})

router.get("/:id", (req, res) => {
  res.send("Get User By ID")
})

module.exports = router;