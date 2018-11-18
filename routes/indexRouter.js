const express = require("express");
const router = express.Router();
const usersDB = require("../modules/userDB");
const passport = require("passport");
const jwt = require("jsonwebtoken");

let hasher = require("../config/hasher");
let config = require("../config/config");

router.post("/register", async (req, res, next) => {
  try {
    let user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };

    console.log("+++++++++++++");
    console.log(user);
    console.log("+++++++++++++");

    await usersDB.addUser(user);
    res.sendStatus(200);
  } catch (err) {
    console.log("IndexRouter error: " + err);
    res.json("Error_msg: " + err);
    res.status(500);
  }
});

router.post("/signin", async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  try {
    let user = await usersDB.getUserByEmail(email);
    if (!user) {
      return res.json({ success: false, msg: "Invalid username" });
    }
    let isMatch = await usersDB.getUserByEmailAndPasshash(
      email,
      hasher.passwordHash(password)
    );
    if (isMatch) {
      const token = jwt.sign({ data: user }, config.secret, {
        expiresIn: 604800 // 1 week
      });
      res.json({
        success: true,
        token: "JWT " + token,
        user: {
          id: user[0].id,
          name: user[0].name,
          email: user[0].email
        },
        msg: "Successfuly logged in!"
      });
    } else {
      return res.json({ success: false, msg: "Invalid password" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
