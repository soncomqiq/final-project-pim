const express = require("express");
const {authenticateToken} = require("../middlewares/jwt");
const {getMyProfile, editMyProfileById, editMyPasswordById} = require("../controllers/users");
const router = express.Router();

// Validate Token

router.put("/my-profile", editMyProfileById)
router.put("/my-password", editMyPasswordById)
router.get("/my-profile", getMyProfile)

module.exports = router;