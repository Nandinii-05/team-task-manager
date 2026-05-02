const Project = require("../models/project");

exports.createProject = async(req,res) => {
    try{
        const {name} = req.body;

        const project = await Project.create ({
            name,
            createdBy: req.user.id,
            members: [req.user.id]
        });

        res.json(project);
    }catch(err) {
        res.status(500).json({msg: "There is an error creataing this Project"});
    }
}

exports.addProjectMember = async (req,res) => {
    try{
        const {projectId, userId} = req.body;

        const project = await Project.findByIdAndUpdate(projectId, {$addToSet: {members: userId}}, {new:true})
        res.json({
            msg: "Project Updated",
            project
        });
    }catch(err){
        res.status(500).json({msg:"Error adding member"});
    }
}

module.exports.getMyProjects = async (req,res) => {
    try{
        const userId = req.user.id;    

        const projects = await Project.find({
            $or: [
                {createdBy: userId},
                {members: userId}
            ]
        });

        res.json(projects);
    }catch(err){
        console.log(err);
        res.status(500).json({msg: "Server error"});
    }
};