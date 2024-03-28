const passport = require("passport");

const localAuthenticate = (req, res, next) => {
  passport.authenticate("local", { session: false }, async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json(info);
      }
      
      // If authentication is successful, attach user to req object
      req.user = user;
      
      next();
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};

module.exports = localAuthenticate;
