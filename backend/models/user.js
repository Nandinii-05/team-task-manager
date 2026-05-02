const mongoose = require("mongoose");
const userScehma = new mongoose.Schema({
    username: String,
    email: {
        type: String, 
        unique: true
    },
    password: String,
    role: {
        type: String,
        enum: ["admin", "member"],
        default: "member",
    }
});

userScehma.methods.toJson = function (){
    const User = this.toObject();
    delete user.password;
    delete user._v;
    return user;
}

module.exports = mongoose.model("User", userScehma);