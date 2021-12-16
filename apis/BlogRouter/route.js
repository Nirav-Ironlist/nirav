const express = require("express");
const router = express.Router();
const controller = require("../BlogControllers/blogController");
const bodyParser = require("body-parser");
const validator = require("../../middlewares/validator");
const verifyToken = require("../../middlewares/verifyToken");
const { check, validationResult } = require("express-validator");

router.post("/register", (req, res) => {
  controller.blogCounter.register(req, res);
});
router.post("/api/vendorRaw/params/name", bodyParser.json(), (req, res) => {
  controller.blogCounter.vendorRawWithDebounce(req, res);
});

router.get("/welcome", verifyToken, (req, res) => {
  res.status(200).json({ success: true });
});

router.post("/login", (req, res) => {
  controller.blogCounter.login(req, res);
});

module.exports = router;
