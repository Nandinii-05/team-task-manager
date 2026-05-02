module.exports = (requiredRole) => {
    return (req,res,next) => {
        try{
            if(req.user.role != requiredRole){
                return res.status(403).json({msg: "Access denied"});
            }
            next();
        }catch(error) {
            res.status(500).json({msg: "Server error"});
        }
    }
}