const express = require("express");
const router = express.Router();

const { fetchReview, createReview } = require("../db");
const { isLoggedIn } = require("./utils");

router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchReview());
  } catch (ex) {
    next(ex);
  }
});

router.post("/create", isLoggedIn, async (req, res, next) => {
  try {
    const result = await createReview(req.user.id, req.body);
    res.send(result);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
