const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require("../models/user");
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWTPRIVATEKEY,
};
passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    if (!payload) {
      return done(null, false, { message: 'Access denied. No token provided.' });
    }

    const user = await User.findById(payload._id);
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.use(new LocalStrategy({
  usernameField: 'email', // assuming email is used as the username
  passwordField: 'password'
}, async (email, password, done) => {
  try {

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log(user)
      return done(null, false, { message: 'Invalid Email or Password' });
    }
    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return done(null, false, { message: 'Invalid Email or Password' });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
