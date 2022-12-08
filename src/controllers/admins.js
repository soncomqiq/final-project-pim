const connection = require("../services/database");
const bcrypt = require("bcrypt");
const {ADMIN_ROLE} = require("../configs/constants");

const registerAdmin = async (req, res) => {
  res.send("Admin Register")
}

const getAllUsers = async (req, res) => {
  res.send("Admin Get All Users")
}

const getUserById = async (req, res) => {
  res.send("Admin Get User By Id")
}

const updateUserById = async (req, res) => {
  res.send("Admin Update User By Id")
}

module.exports = {
  registerAdmin,
  getAllUsers,
  getUserById,
  updateUserById,
}