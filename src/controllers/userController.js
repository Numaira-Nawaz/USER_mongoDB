const catchAsync = require("../utils/catchAysnc");
const AppMessages = require("../constants/appMessages");
const HttpCodes = require("../constants/httpCodes");
const { userService } = require("../services");
const HttpCode = require("../constants/httpCodes");

/**
 * Signup User Controller
 */
const create = catchAsync(async (req, res) => {
  const { body } = req;
  const newUser = await userService.create(body);
  return res.status(HttpCode.CREATED).send(newUser);
});

const get = catchAsync(async (req, res) => {
    const users = await userService.get();
    return res.status(HttpCodes.OK).json(users);
});

const getSingle = catchAsync(async (req, res) => {
  const email = req.query.email;
    const user = await userService.getSingle(email);
    return res
      .status(HttpStatus.OK)
      .json({ status: AppMessages.SUCCESS, User: user });
});

const deleteSingle = catchAsync(async (req, res) => {
  const email = req.query.email;
    await userService.deleteSingle(email);
    return res
      .status(HttpStatus.OK)
      .json({ status: AppMessages.RECORD_SUCCESSFULY_DELETED });
});

const updateSingle = catchAsync(async (req, res) => {
  const { body } = req;
  const email = req.query.email;
    await userService.updateSingle(body, email);
    return res
      .status(HttpCodes.OK)
      .json({ status: AppMessages.USER_SUCCESSFULY_UPDATED });
});

const login = catchAsync(async (req, res) => {
  const result = await userService.login(req.body)
  return res
      .status(HttpCode.OK)
      .json({ status: AppMessages.SUCCESS, result});
});

module.exports = {
  create,
  get,
  getSingle,
  deleteSingle,
  updateSingle,
  login,
};
