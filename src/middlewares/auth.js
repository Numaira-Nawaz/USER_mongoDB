const jwt = require("jsonwebtoken");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const ErrorResponse = require("../composer/error-response");
const userService = require("../services/userService");

exports.auth = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(HttpCodes.FORBIDDEN)
      .send(new ErrorResponse(AppMessages.APP_ACCESS_DENIED));
  }
  try {
    const decoded = jwt.verify(token, process.env.NODE_SECRET_KEY);
    req.user = decoded;
    const user = await userService.getSingle(req.user.email);
    console.log("Request is from User: ", user);
    if (!user) {
      return res
        .status(HttpCodes.FORBIDDEN)
        .send(new ErrorResponse(AppMessages.INVALID_USER_CREDENTIALS));
    }
    next();
  } catch (error) {
    return res
      .status(HttpCodes.FORBIDDEN)
      .send(new ErrorResponse(AppMessages.APP_ACCESS_DENIED));
  }
};
