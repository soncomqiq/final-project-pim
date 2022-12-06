const express = require("express");
const {authenticateToken, authorizeAdmin} = require("../middlewares/jwt");
const connection = require("../services/database");
const bcrypt = require("bcrypt");
const router = express.Router();

router.use(authenticateToken)
router.use(authorizeAdmin)

router.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  const user = await connection.query(`SELECT *
                                       FROM users
                                       WHERE username = \"${username}\"`);

  if (user.length > 0) {
    return res.status(400).send({message: "Username is already taken."});
  }

  const hashedPwd = await bcrypt.hash(password, 10);
  await connection.query(`INSERT INTO \`mini-medium\`.\`users\` (\`username\`, \`password\`, \`first_name\`, \`last_name\`, \`role\`)
                          VALUES ('${username}', '${hashedPwd}', '${firstname}', '${lastname}', 'admin')`);
  res.status(200).send("Register successful.")
})

router.get("/users", async (req, res) => {
  const users = await connection.query(`SELECT * FROM users`);
  res.status(200).send(users);
})

router.get("/users/:id", (req, res) => {
  res.send("Admin Users By Id")
})

router.put("/users/:id/profile", (req, res) => {
  res.send("Admin Users By Id")
})

module.exports = router;