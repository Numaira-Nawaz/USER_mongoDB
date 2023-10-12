const ErrorResponse = require("../composer/error-response");
const HttpCode = require("../constants/httpCodes");

const errHandler = (err, req, res, next) => {
  console.log("In Global Error Handler");
  console.log(err);
  if (err instanceof ErrorResponse) {
    const status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR;
    return res
      .status(status)
      .json({ errMsg: err.errMsg, result: err.result, stack: err.stack });
  }
  return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
    errMsg: err.message,
    result: err.result,
  });
};

module.exports = errHandler;
