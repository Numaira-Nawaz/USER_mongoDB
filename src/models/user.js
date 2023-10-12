const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
       // unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
        type: String,
        required: true,
        // select: false,
    }
}, {
    toJSON:{
        transform(ret, doc){
            delete doc.password
        }
    }
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
