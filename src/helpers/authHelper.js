const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.encryptString = async (sourceString) => {
  const salt = await bcrypt.genSalt(10);
  let encryptedString = await bcrypt.hash(sourceString, salt);
  return encryptedString;
};

exports.generateAuthTokenWithObject = async (data) => {
  const token = jwt.sign(data, process.env.NODE_SECRET_KEY);
  return token;
};

exports.addAuthTokenInResponseHeader = async (data) => {
  let token = await this.generateAuthTokenWithObject(data);
  return token;
};

exports.isValidUser = async (requestPassword, encryptedPassword) => {
  let isValidPassword = await bcrypt.compare(
    requestPassword,
    encryptedPassword
  );
  return isValidPassword;
};
