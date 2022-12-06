const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../services/database");
const {JWT_SECRET, JWT_EXPIRE_TIMEOUT} = require("../configs/constants");
const router = express.Router();

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const users = await connection.query(`SELECT *
                                       FROM users
                                       WHERE username = \"${username}\"`);

  if (users[0].length > 0) {
    const same = await bcrypt.compare(password, users[0][0].password)
    if (same) {
      const payload = {id: users[0][0].id, role: users[0][0].role}
      const token = jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRE_TIMEOUT});
      res.status(200).send({message: "success", token: token})
    } else {
      res.status(403).send({message: "Username or password is incorrect."})
    }
  } else {
    // User not found
    res.status(403).send({message: "Username or password is incorrect."})
  }
})

// Clean Version
// router.post("/login", async (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;
//
//   const user = await connection.query(`SELECT *
//                                        FROM users
//                                        WHERE username = \"${username}\"`);
//
//   if (user.length === 0) {
//     return res.status(403).send({message: "Username or password is incorrect."})
//   }
//
//   const same = bcrypt.compare(password, user[0].password)
//
//   if (!same) {
//     return res.status(403).send({message: "Username or password is incorrect."});
//   }
//
//   const payload = {id: user[0].id, role: user[0].role}
//   const token = jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRE_TIMEOUT});
//   res.status(200).send({message: "success", token: token})
// })

router.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  const user = await connection.query(`SELECT *
                                       FROM users
                                       WHERE username = \"${username}\"`);

  if (user[0].length > 0) {
    return res.status(400).send({message: "Username is already taken."});
  }

  const hashedPwd = await bcrypt.hash(password, 10);
  await connection.query(`INSERT INTO \`users\` (\`username\`, \`password\`, \`first_name\`, \`last_name\`, \`role\`)
                          VALUES ('${username}', '${hashedPwd}', '${firstname}', '${lastname}', 'user')`);
  res.status(200).send("Register successful.")
})

module.exports = router;