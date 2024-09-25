const express = require("express");
const router = express.Router();

const { fetchBusiness, fetchSingleBusiness } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchBusiness());
  } catch (ex) {
    next(ex);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    res.send(await fetchSingleBusiness(id));
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;

