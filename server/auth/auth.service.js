const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config.json");
const emailValidator = require("email-validator");
const userService = require("../database/user.service");

function authenticate(email, password) {
   if (!emailValidator.validate(email)) {
      throw "Invalid email!";
   }
   if (!password) {
      throw "Invalid password!";
   }
   var user = userService.getUserByEmail(email);
   if (user == null) {
      throw "Invalid email!";
   }
   if (!bcrypt.compareSync(password, user.hash)) {
      throw "Invalid email or password!";
   }
   return createToken({
      userId: user.userId,
      profileId: user.profileId,
      email: user.email
   });
}

function createToken(payload) {
   const jwtConfig = {
      expiresIn: config.jwt.expiresIn
   };
   return jwt.sign(payload, config.jwt.secretKey, jwtConfig)
}

function getCurrentUser(req) {
   const token = req.headers.authorization.split(" ")[1];
   const payload = jwt.decode(token);
   return userService.getUserByEmail(payload.email);
}

function register(idNo, firstname, lastname, contactNo, email, password, confirmPassword, registrationOrigin) {
   if (!emailValidator.validate(email)) {
      throw "Invalid email!";
   }
   if (!password) {
      throw "Invalid password!";
   }
   if (password != confirmPassword) {
      throw "Passwords do not match!";
   }
   if (userService.doesEmailExist(email)) {
      throw `${email} is already registered!`;
   }

   var user = userService.createUser(idNo, firstname, lastname, contactNo, email, password, confirmPassword, registrationOrigin);

   return createToken({
      userId: user.userId,
      profileId: user.profileId,
      email: user.email
   });
}

module.exports = {
   authenticate,
   getCurrentUser,
   register
};
