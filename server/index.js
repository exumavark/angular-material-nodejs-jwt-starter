const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const authTokenHttpRequestInterceptor = require("./http-interceptor/auth-token.http-request-interceptor");
const mockDataHttpRequestInterceptor = require("./http-interceptor/mock-data.http-request-interceptor");
const authController = require("./auth/auth.controller");
const userController = require("./user/user.controller");
const util = require("./util");
const config = require("./config.json");

// Create the json-server.
const server = jsonServer.create();

// Setup express request body parsing.
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

// Add a security filter to intercept and inspect requests for valid tokens.
server.use(authTokenHttpRequestInterceptor.intercept);

// Delay all mock data request.
server.use(mockDataHttpRequestInterceptor.intercept);

// API routes.
server.use("/api/auth", authController);
server.use("/api/user", userController);
//tbd-remove server.use("/api", router);

// Start the server.
server.listen(config.port, () => {
   util.consoleReset();
   console.log(`----------------------------------------------------------------------`);
   console.log(`Running API Server on: http://localhost:${config.port}`);
   console.log(`----------------------------------------------------------------------`);
   console.log("\n");
});
