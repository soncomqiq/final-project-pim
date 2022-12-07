const connection = require("../services/database");
const bcrypt = require("bcrypt");
const {ADMIN_ROLE} = require("../configs/constants");

const registerAdmin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  const [users] = await connection.query("SELECT * FROM users WHERE username = ?", [username]);

  if (users.length > 0) {
    return res.status(400).send({message: "Username is already taken."});
  }

  const hashedPwd = await bcrypt.hash(password, 10);
  await connection.query("INSERT INTO users (username, password, first_name, last_name, role) VALUES (?, ?, ?, ?, ?)", [username, hashedPwd, firstName, lastName, ADMIN_ROLE]);
  res.status(200).send("Register successful.")
}

const getAllUsers = async (req, res) => {
  const [users] = await connection.query("SELECT * FROM users");
  res.status(200).send(users);
}

const getUserById = async (req, res) => {
  const id = req.params.id;
  const [users] = await connection.query("SELECT * FROM users where id = ?", [id]);

  if (users.length === 0) {
    return res.status(404).send({message: "User not found."})
  }

  res.status(200).send(users[0]);
}

const updateUserById = async (req, res) => {
  const id = req.params.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const [users] = await connection.query("SELECT * FROM users where id = ?", [id]);

  if (users.length === 0) {
    return res.status(404).send({message: "User not found."})
  }

  await connection.query("UPDATE `users` SET `first_name` = ?, `last_name` = ? WHERE (`id` = ?);", [firstName, lastName, id])

  res.status(200).send({message: "User has been updated."});
}

module.exports = {
  registerAdmin,
  getAllUsers,
  getUserById,
  updateUserById,
}