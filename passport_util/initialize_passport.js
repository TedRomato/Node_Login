module.exports = (passport, app) => {
  passport.serializeUser(require("./serialize_user"));
  passport.deserializeUser(require("./deserialize_user"));
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(require("./local_strategy.js"));
  console.log("Passport initialized");
}
