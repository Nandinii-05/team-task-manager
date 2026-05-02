const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



module.exports.signup = async (req,res) => {
    console.log(req.body);
    let {username, email, password, role} = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({msg: "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        role
    });

    res.json({
        msg: "User Successfully registered",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    });
}

module.exports.login = async(req,res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) {
        return res.status(400).json({msg:"User not found"});
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if(!isEqual){
        return res.status(400).json({msg: "Invalid data"});
    }

    const token = jwt.sign(
        {id: user._id, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    );

    res.cookie("token", token , {
        httpOnly: true
    });

    res.redirect("/dashboard");
};