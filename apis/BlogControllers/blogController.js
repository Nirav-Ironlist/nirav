const async = require("async");
const validator = require("../../middlewares/validator");
const config = require("../../config/sqldb");
const knex = require("knex")(config.dbConfig);
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config();
const bcrypt = require("bcryptjs");

// console.log(validator.registerValidator);
const blogCounter = {
  register: async function (req, res) {
    async.waterfall(
      [
        function (next) {
          req
            .checkBody("uname")
            .notEmpty()
            .withMessage("username is required")
            .not()
            .custom((val) => /[^A-za-z0-9\s]/g.test(val))
            .withMessage("Username not use uniq characters");
          req
            .checkBody("email")
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email must be a valid");
          req
            .checkBody("password")
            .notEmpty()
            .withMessage("Password is required")
            .isLength({ min: 8, max: 16 })
            .withMessage("password must be at least 8 to 16 characters");
          var error = req.validationErrors();
          if (error && error.length) {
            return next(error);
          }
          next(null, "true");
        },
        // const one = validator.registerValidator(uname, password);
        // console.log(one);
        function (data1, next) {
          let { uname, email, password } = req.body;

          const token = jwt.sign(
            { username: uname, email: email },
            process.env.JWT_TOKEN_SECRET,
            { expiresIn: "2h" }
          );
          bcrypt.hash(password, 10).then((pwd) => {
            password = pwd;
            knex("user")
              .insert({
                username: uname,
                password: password,
                email: email,
                token: token,
              })
              .then((data) => {
                next(null, data);
              })
              .catch((err) => {
                res.status(500).json({ message: err.message });
              });
          });
        },
      ],
      function (err, response) {
        if (err) {
          res.status(500).json({ message: err[0].msg });
        }
        if (response !== undefined) {
          res
            .status(200)
            .json({ message: "Successfully registered", User: response });
        }
      }
    );
  },
  login: async function (req, res) {
    async.waterfall(
      [
        function (next) {
          req
            .checkBody("uname")
            .notEmpty()
            .withMessage("username is required")
            .not()
            .custom((val) => /[^A-za-z0-9\s]/g.test(val))
            .withMessage("Username not use uniq characters");
          req
            .checkBody("email")
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email must be a valid");
          req
            .checkBody("pwd")
            .notEmpty()
            .withMessage("Password is required")
            .isLength({ min: 8, max: 16 })
            .withMessage("password must be at least 8 to 16 characters");
          var error = req.validationErrors();
          if (error && error.length) {
            next(error);
          } else {
            next(null, true);
          }
        },
        function (data1, next) {
          const { uname, pwd, email } = req.body;
          knex("user")
            .select("*")
            .where("username", uname)
            .then(async (data) => {
              const password = await bcrypt.compare(pwd, data[0].password);
              console.log(password);
              console.log(data[0].password);
              if (password) {
                res.status(200).json({ message: "successfully loged in" });
                const token = jwt.sign(
                  { username: uname, email: email },
                  process.env.JWT_TOKEN_SECRET,
                  { expiresIn: "1h" }
                );
                knex("user")
                  .update({ token: token })
                  .then((data) => {
                    console.log("updated");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                res.status(200).json({ message: "password is incorrect" });
              }
            })
            .catch((err) => {
              res.status(500).json({ message: err.message });
            });
        },
      ],
      function (err, response) {
        console.log(err[0].msg);
        if (err) {
          res.status(500).json({ message: err[0].msg });
        }
      }
    );
  },
};

module.exports = {
  blogCounter,
};
