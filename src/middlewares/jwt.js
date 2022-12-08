const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("../configs/constants");

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err)
      return res.status(403).send("Unauthenticated: For Login Only")
    }

    req.user = user

    next()
  })
}

function authorizeAdmin(req, res, next) {
  // Implement Here
}

module.exports = {
  authenticateToken,
  authorizeAdmin,
}