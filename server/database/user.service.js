const bcrypt = require('bcrypt');
const fs = require("fs");

module.exports = {
   createUser: function (idNo, firstname, lastname, contactNo, email, password, confirmPassword, registrationOrigin) {
      var saltRounds = 13;
      var salt = bcrypt.genSaltSync(saltRounds);
      var hash = bcrypt.hashSync(password, salt);
      var users = this.getUsers();
      var userId = 1;
      for (var i = 0; i < users.length; ++i) {
         if (users[i].userId >= userId) {
            userId = users[i].userId + 1;
         }
      }
      var newUser = {
         userId: userId,
         profileId: 1,
         idNo: idNo,
         firstname: firstname,
         lastname: lastname,
         contactNo: contactNo,
         email: email,
         hash: hash,
         notes: ""
      };
      users.push(newUser);
      const data = JSON.stringify({ users: users }, null, 3);
      fs.writeFileSync("./database/mock/users.json", data, "UTF-8");
      return newUser;
   },
   deleteUser: function (user, userId) {
      if (user.userId == userId) {
         throw "Cannot delete yourself!";
      }
      var users = this.getUsers();
      for (var i = 0; i < users.length; ++i) {
         if (users[i].userId == userId) {
            users.splice(i, 1);
            break;
         }
      }
      const data = JSON.stringify({ users: users }, null, 3);
      fs.writeFileSync("./database/mock/users.json", data, "UTF-8");
   },
   doesEmailExist: function (email) {
      var user = this.getUserByEmail(email);
      if (user == null) {
         return false;
      }
      return true;
   },
   getUsers: function () {
      return JSON.parse(fs.readFileSync("./database/mock/users.json", "UTF-8")).users;
   },
   getUserByEmail: function (email) {
      var users = this.getUsers();
      var index = users.findIndex(user => user.email === email);
      if (index == -1) {
         return null;
      }
      return users[index];
   },
   updateUser: function (user) {
      var users = this.getUsers();
      for (var i = 0; i < users.length; ++i) {
         if (users[i].userId == user.userId) {
            users[i].profileId = user.profileId;
            users[i].idNo = user.idNo;
            users[i].firstname = user.firstname;
            users[i].lastname = user.lastname;
            users[i].contactNo = user.contactNo;
            users[i].notes = user.notes;
            break;
         }
      }
      const data = JSON.stringify({ users: users }, null, 3);
      fs.writeFileSync("./database/mock/users.json", data, "UTF-8");
   }
};
