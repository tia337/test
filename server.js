const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
require("./config/passport")(passport);

const app = express();

app.use(cors());

//bodyparser middleware
app.use(bodyParser.json());


const userRouter = require("./routes/usersRouter");
const indexRouter = require("./routes/indexRouter");

// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/public"));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/user", userRouter);

app.get("*", (req, res) => {
  // res.sendFile(path.join(__dirname, 'public/index.html'));
  res.json({ Message: "invalid endpoint" });
  res.end();
});

// app.listen(() =>{
//   console.log('Listening on port ' + process.env.PORT);
// });

app.listen( process.env.PORT || 8080);
