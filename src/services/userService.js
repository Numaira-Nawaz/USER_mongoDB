const UserModel = require("../models/user");
const ErrorResponse = require("../composer/error-response");
const AppMessages = require("../constants/appMessages");
const HttpStatus = require("../constants/httpCodes");
const HttpCode = require("../constants/httpCodes");
const authHelper = require("../helpers/authHelper");

/**
 * 
 * @param {*} body 
 * @returns {Promise<UserModel>}
 */
const create = async (body) => {
  if (await UserModel.findOne({ email: body.email })) {
    throw new ErrorResponse(
      HttpCode.CONFLICT,
      AppMessages.APP_DUPLICATE_RECORD
    );
  }
  body.password = await authHelper.encryptString(body.password);
  return await UserModel.create(body);
};

/**
 * 
 * @returns {Promise<UserModel[] || []>}
 */
const get = async () => {
  return await UserModel.find({});
};

const getSingle = async (email) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ErrorResponse(
      HttpStatus.NOT_FOUND,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  }
  return user;
};

const deleteSingle = async (email) => {
  const user = await getSingle(email);
  await user.remove()
};

const updateSingle = async(body,email) => {
    const user = await getSingle(email);
    Object.assign(user, body)
    return await user.save()
}

const login = async(body) => {
  console.log(body);
  const user = await UserModel.findOne({email: body.email})
  if(!user){
    throw new ErrorResponse(
      HttpCodes.BAD_REQUEST,
      AppMessages.INVALID_USER_CREDENTIALS
    );
  }
  console.log(user);
  await authHelper.isValidUser(body.password, user.password);
  const token = await authHelper.addAuthTokenInResponseHeader(
      {
        email: user.email,
      },
    );
    return {user, token}
}
module.exports = {
  create,
  get,
  getSingle,
  deleteSingle,
  updateSingle,
  login
};
