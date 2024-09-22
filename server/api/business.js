const express = require("express");
const router = express.Router();

const { fetchBusiness } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchBusiness());
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;

