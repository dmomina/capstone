const express = require("express");
const router = express.Router();

const { fetchUsers, fetchSingleUsers } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchUsers());
  } catch (ex) {
    next(ex);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    res.send(await fetchSingleUsers(id));
  } catch (ex) {
    next(ex);
  }
});


module.exports = router;
