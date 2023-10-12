const users = require("../routes/user");

module.exports = function (app) {

    app.use("/api/user",users);

};