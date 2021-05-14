module.exports = {
   intercept: (req, res, next) => {
      console.log(`intercept( Delaying the request by 1000 to simulate a real network. )`);
      setTimeout(function () {
         next();
      }, 1000);
   }
};
