const express = require("express");
const router = express.Router();
const usersDB = require("../modules/userDB");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res, next) => {
  try {
    let users = await usersDB.getAllFromTable("users");
    res.json({
      users: users,
      user: req.user
    });
    res.status(200);
  } catch (err) {
    console.log("UsersRouter error: " + err);
    res.json({ Error: err });
    res.status(500);
  }
});

router.get("/profile",  passport.authenticate('jwt', {session : false}), async (req, res, next) => {
  try {
    res.json({
      user: await usersDB.getByUserId(req.user.id)
    });
    res.status(200);
  } catch (err) {
    console.log("UsersRouter error: " + err);
    res.json({Error: err});
    res.status(500);
  }
});

module.exports = router;
