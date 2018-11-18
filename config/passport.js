const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const userDB = require("../modules/userDB");
const config = require("./config");

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.secret;
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        let user = await userDB.getByUserId(jwt_payload.data[0].id);
        if (user) {
          return done(null, user[0]);
        }
        if (!user) {
          return done("no user", false);
        } else {
          return done(null, false);
        }
      } catch (err) {
        console.log(err);
      }
    })
  );
};
