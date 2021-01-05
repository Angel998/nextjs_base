const express = require("express");
const router = express.Router();
const privateRoute = require("../middlewares/privateRoute");
const { getGeneralClientData } = require("../middlewares/siteClient");
router.use(
  privateRoute({
    redirectToCheckSession: true,
  })
);
router.use(getGeneralClientData);

router.get("/", (req) => {
  req.react("/dashboard");
});

module.exports = router;
