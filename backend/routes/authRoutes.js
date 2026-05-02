const express = require("express");
const router = express.Router();
const {signup, login} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

console.log("working")

router.post("/signup", signup);
router.post("/login", login);



router.get("/profile", authMiddleware, (req,res) => {
    res.json({
        msg: "Protected route accessed",
        user: req.user
    });
});

router.get("/admin", authMiddleware, roleMiddleware("admin"), (req,res) => {
    res.json({msg:"Welcome Admin"});
})

module.exports = router;


