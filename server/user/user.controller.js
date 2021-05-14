const express = require("express");
const router = express.Router();
const httpStatus = require("http-status");
const userService = require("../database/user.service");
const util = require("../util");
const authService = require("../auth/auth.service");

router.delete("/deleteuser", deleteUser);
router.get("/getcurrentuser", getCurrentUser);
router.get("/getusers", getUsers);
router.put("/updateuser", updateUser);

module.exports = router;

function deleteUser(req, res, next) {
   try {
      const user = authService.getCurrentUser(req);
      const userId = req.query.userId;
      userService.deleteUser(user, userId);
      util.createSuccessResponse(res, {});
   }
   catch (error) {
      util.createErrorResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error);
   }
}

function getCurrentUser(req, res, next) {
   const user = authService.getCurrentUser(req);
   util.createSuccessResponse(res, user);
}

function getUsers(req, res, next) {
   try {
      var users = userService.getUsers();
      util.createSuccessResponse(res, users);
   }
   catch (error) {
      util.createErrorResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error);
   }
}

function updateUser(req, res, next) {
   try {
      let user = {
         userId: req.body.userId,
         profileId: req.body.profileId,
         idNo: req.body.idNo,
         firstname: req.body.firstname,
         lastname: req.body.lastname,
         contactNo: req.body.contactNo,
         notes: req.body.notes
      };
      userService.updateUser(user);
      util.createSuccessResponse(res, {});
   }
   catch (error) {
      console.log(error);
      util.createErrorResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error);
   }
}
