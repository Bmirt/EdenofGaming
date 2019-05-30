const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const products = require("./routes/api/products");

const app = express();

app.use(
  "/uploads",
  express.static("uploads", {
    etag: false
  })
);

// let nocache = (req, res, next) => {
//   res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
//   res.header("Expires", "-1");
//   res.header("Pragma", "no-cache");
//   next();
// };
// cors middleware
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));

// DB config
const db = require("./config/keys").mongoURI;

// connecting to mongodb
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/products", products);

const port = process.env.PORT || 5000;

const path = require("path");
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "client/build")));
// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
