const LocalStrategy      = require('passport-local').Strategy;
const User               = require('../models/user');
const bcrypt             = require('bcrypt');
const passport = require ("passport");
const FbStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

module.exports = function (app) {
  // NEW
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  
  passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });
  
  // Signing Up
  passport.use('local-signup', new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, next) => {
        console.log("entrando a local-signup")
      // To avoid race conditions
      process.nextTick(() => {
          User.findOne({
              'username': username
          }, (err, user) => {
              if (err){ return next(err); }
  
              if (user) {
                  return next(null, false);
              } else {
                  // Destructure the body
                  const { username, email, description, password } = req.body;
                  const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                  const newUser = new User({
                    username,
                    email,
                    description,
                    password: hashPass
                  });
                  console.log(newUser);
                  newUser.save((err) => {
                      if (err){ next(err); }
                      return next(null, newUser);
                  });
              }
          });
      });
  }));

  passport.use('local-login', new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false, { message: "Incorrect username" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: "Incorrect password" });
      }
      return next(null, user);
    });
  }));
  

  passport.use(new FbStrategy({
    clientID: "356855454794351",
    clientSecret: "81d248af1e15f5bc25ec4fb06181e3cc",
    callbackURL: "/auth/facebook/callback"
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ facebookID: profile.id }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      }
  
      const newUser = new User({
        facebookID: profile.id
      });
  
      newUser.save((err) => {
        if (err) {
          return done(err);
        }
        done(null, newUser);
      });
    });
  
  }));

  passport.use(new GoogleStrategy({
    clientID: "25522018266-1ho2pj55mncj08lnjk5b2de6smmip8cd.apps.googleusercontent.com",
    clientSecret: "t1rvwXk7QLjc3xnrFFzaqMoA",
    callbackURL: "/auth/google/callback"
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleID: profile.id }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      }
  
      const newUser = new User({
        googleID: profile.id
      });
  
      newUser.save((err) => {
        if (err) {
          return done(err);
        }
        done(null, newUser);
      });
    });
  
  }));
  // NEW
  
  app.use(passport.initialize());
  app.use(passport.session());

}