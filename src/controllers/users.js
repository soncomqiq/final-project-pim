const connection = require("../services/database");
const bcrypt = require("bcrypt");
const editMyProfileById = async (req, res) => {
  res.send("Edit My Profile")
}

const editMyPasswordById = async (req, res) => {
  res.send("Edit My Password")
}

const getMyProfile = async (req, res) => {
  const id = req.user.id;
  const [users] = await connection.query("SELECT * FROM users where id = ?", [id]);
  res.status(200).send(users);
}

module.exports = {
  editMyProfileById,
  editMyPasswordById,
  getMyProfile,
}