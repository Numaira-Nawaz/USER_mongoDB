const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const ErrorResponse = require("../composer/error-response");
const { findRole } = require("../services/userService");

exports.roleCheck = (roles = []) => {
  return async (req, res, next) => {
    //console.log("req.user in roleCheck ", req.user);
    const role_id = req.body?.role_id || req.user?.role_id;
    let userRole;
    try {
      userRole = (await findRole(role_id)).dataValues.type;
    } catch (err) {
      return res
        .status(HttpCodes.FORBIDDEN)
        .send(new ErrorResponse(err.message));
    }
    req.user.role = userRole;
    const roleSet = new Set(roles);

    if (!userRole || !roleSet.has(userRole)) {
      return res
        .status(HttpCodes.FORBIDDEN)
        .send(new ErrorResponse(AppMessages.APP_ACCESS_DENIED));
    }
    next();
  };
};
