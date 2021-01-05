const express = require("express");
const router = express.Router();
const { getGeneralClientData } = require("../middlewares/siteClient");

router.use(getGeneralClientData);

router.get("/", (req) => {
  req.react("/home");
});

router.get("/login", (req, res) => {
  if (req.getSession()) {
    return res.redirect("/dashboard");
  }
  req.react("/login");
});

router.get("/register", (req, res) => {
  if (req.getSession()) {
    return res.redirect("/dashboard");
  }
  req.react("/register");
});

module.exports = router;
