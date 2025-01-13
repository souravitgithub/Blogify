//build in Packages
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
//files
const connect = require("./connection");
const staticRoutes = require("./routes/staticRoutes");
const usersRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { checkForAuth } = require("./middleware/auth");

const app = express();
const PORT = 8000;

//connection to mongo db
connect("mongodb://localhost:27017/blogify")
  .then((e) => console.log("MongoDB Successfylly Connected"))
  .catch((e) => console.log("error while connecting mongodb"));

//setting up view engine
app.set("view engine", "ejs");

//middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuth);
// app.use(express.static(path.resolve("./public/")));
//routes
app.use("/", staticRoutes);
app.use("/users", usersRoute);
app.use("/blogs", blogRoute);

app.listen(PORT, () => {
  return console.log(`Server is Started at PORT: ${PORT}`);
});
