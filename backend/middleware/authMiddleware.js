const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
    try{
        const token = req.cookies.token;

        if(!token) {
            return res.status(401).json({msg: "no token provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    }catch(err){
        res.status(401).json({msg: "Invalid token"});
    }
};