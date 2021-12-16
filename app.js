const express = require("express");
const app = express();
const path = require("path");
const blogRouter = require("./apis/BlogRouter/route");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");

env = require("dotenv").config();

app.use(bodyParser.json({ limit: "2048mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(
//   expressValidator({
//     customValidators: {
//       gte: function (param, num) {
//         return param >= num;
//       },
//     },
//   })
// );
app.use(expressValidator());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name, user-access-token,token"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

port = process.env.PORT;

console.log(__dirname);

app.use("/", require(path.join(__dirname, "routes.js")));

app.listen(port, () => {
  console.log(`This server is running on http://localhost:${port}`);
});

app.use("/admin", blogRouter);

// app.use(bodyParser.json());

// module.exports = app;.
