const router = require("express").Router();
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();

// Passport configuration
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      scope: ["profile", "email"]
    },
    function (accessToken, refreshToken, profile, callback) {
      console.log(callback, profile);
      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const CLIENT_URL = process.env.CLIENT_URL;

// router.get("/login/success", (req, res) => {
//   console.log("user login ");
//   if (req.user) {
//     res.status(200).json({
//       error: false,
//       message: "Successfully Logged In",
//       user: req.user,
//       isAuthenticated:true
//     });
//   } else {
//     res.status(403).json({ error: true, message: "Not Authorized" });
//     console.log(error);
//   }
// });

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure"
  });
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    successRedirect: `http://localhost:3000/`,
    failureRedirect: "https://paramscience.org/"
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `http://localhost:3000/`,
    failureRedirect: "https://paramscience.org/"
  })
);

router.get("/check", (req, res) => {
  if (req.user) {
    res.status(200).json({ isLoggedIn: true, user: req.user });
  } else {
    res.status(200).json({ isLoggedIn: false });
  }
});


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000/");
});

module.exports = router;
