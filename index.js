const express = require("express");
const app = express();
const {SERVER_PORT} = require("./src/configs/constants");
const authRoutes = require("./src/routes/auth")
const adminRoutes = require("./src/routes/admins")
const articlesRoutes = require("./src/routes/articles")
const usersRoutes = require("./src/routes/users")

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/auth", authRoutes)
app.use("/admin", adminRoutes)
app.use("/users", usersRoutes)
app.use("/articles", articlesRoutes)

app.listen(SERVER_PORT, () => {
  console.log(`App is running at port ${SERVER_PORT}.`)
})