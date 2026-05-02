const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {createProject, getMyProjects} = require("../controllers/projectController");
const {addProjectMember} = require("../controllers/projectController");
const project = require("../models/project");

router.post("/create", authMiddleware, roleMiddleware("admin"), createProject);
router.post("/addmember", authMiddleware, roleMiddleware("admin"), addProjectMember);
router.get("/my-projects", authMiddleware, getMyProjects);
router.get("/", async(requestAnimationFrame,res) => {
    try{
        const projects = await project.find();
        res.json(projects);
    }catch(err){
        res.status(500).json({msg: "Error"});
    }
})

module.exports = router;