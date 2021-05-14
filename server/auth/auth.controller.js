const express = require("express");
const router = express.Router();
const httpStatus = require("http-status");
const authService = require("./auth.service");
const util = require("../util");

router.post("/login", login);
router.post("/register", register);
router.post("/sendpasswordresetemail", sendPasswordResetEmail);

module.exports = router;

function login(req, res, next) {
   var email = req.body.email;
   var password = req.body.password;
   try {
      var token = authService.authenticate(email, password);
      util.createSuccessResponse(res, { token: token, email: email });
   }
   catch (error) {
      util.createErrorResponse(res, httpStatus.UNAUTHORIZED, error);
   }
}

function register(req, res, next) {
   let idNo = null;
   let firstname = null;
   let lastname = null;
   let contactNo = null;
   let email = null;
   let password = null;
   let confirmPassword = null;
   let registrationOrigin = null;

   try {
      idNo = req.body.idNo;
      firstname = req.body.firstname;
      lastname = req.body.lastname;
      contactNo = req.body.contactNo;
      email = req.body.email;
      password = req.body.password;
      confirmPassword = req.body.confirmPassword;
      registrationOrigin = req.body.registrationOrigin;
      var token = authService.register(idNo, firstname, lastname, contactNo, email, password, confirmPassword, registrationOrigin);
      util.createSuccessResponse(res, { token: token, email: email });
   }
   catch (error) {
      util.createErrorResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error);
   }
}

function sendPasswordResetEmail(req, res, next) {
   let email = null;
   let passwordResetOrigin = null;

   try {
      email = req.body.email;
      passwordResetOrigin = req.body.passwordResetOrigin;
      util.createSuccessResponse(res, { email: email });
   }
   catch (error) {
      util.createErrorResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error);
   }
}
