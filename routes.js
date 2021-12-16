const express = require("express");
const router = express.Router();
const path = require("path");
const config = require(path.join(__dirname, "config/sqldb.js"));
const knex = require("knex")(config.dbConfig);

router.get("/", (req, res) => {
  return knex("blog_table")
    .select()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({
        error: err.message,
      });
    });
});
router.get("/id=:id", (req, res) => {
  const { id } = req.params;
  return knex("blog_table")
    .select()
    .where("id", id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({
        error: err.message,
      });
    });
});
router.get("/params=:par", (req, res) => {
  return knex("blog_table")
    .select()
    .where("title", "like", `%${req.params.par}%`)
    .then((data) => {
      res.send({ data: data });
    })
    .catch((err) => {
      res.status(103).send({ err: err });
    });
});

module.exports = router;
