const express = require("express");
const {authenticateToken, authorizeAdmin} = require("../middlewares/jwt");
const {registerAdmin, getAllUsers, getUserById, updateUserById} = require("../controllers/admins");
const router = express.Router();

// Validate Token
// Validate Admin

router.post("/register", registerAdmin)
router.get("/users", getAllUsers)
router.get("/users/:id", getUserById)
router.put("/users/:id/profile", updateUserById)

module.exports = router;