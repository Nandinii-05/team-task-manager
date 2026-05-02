
const Task = require("../models/task");

module.exports.createTask = async (req,res) => {
    try{
        const {title, description, projectId, assignedTo, deadline} = req.body;

        if(!deadline) {
            return res.status(400).json({msg: "Deadline is required"});
        }
        const task = await Task.create ({
            title,
            description,
            projectId,
            assignedTo,
            deadline
        });

        res.status(201).json(task);

    }
    catch(err){
        console.log(err);
        res.status(500).json({msg: "Server error"});
    }
}

module.exports.getTasks = async (req,rees) => {
    const {projectId} = req.params;
    const tasks = await Task.find({projectId}).populate("assignedTo");

    res.render("dashboard", {tasks});
}

module.exports.updateTaskStatus = async (req,res) => {
    const {taskId} = req.params;
    const {status} = req.body;

    const task = await Task.findById(taskId);

    if(!task){
        return res.status(404).json({msg: "Task not Found"});
    }

    if(task.assignedTo.toString() !== req.user.id){
        return res.status(403).json({msg: "Not allowed"});
    }

    task.status = status;
    await task.save();

    res.json({
        msg: "Task Updated",
        task
    });
}

module.exports.getTasks = async (req, res) => {
    try{
        let tasks;
        if(req.user.role == "admin"){
            tasks = await Task.find();
        }else{
            tasks = await Task.find({assignedTo: req.user.id});
        }

        res.json(tasks);
    }catch(err){
        console.log(err);
        res.status(500).json({msg: "Server error"});
    }
}

module.exports.getTaskSummary = async (req,res) => {
    try{
        const projectId = req.params.projectId;

        const tasks = await Task.find({projectId});

        const total = task.length;
        const completed = task.filter(t => t.status === "completed").length;
        const pending = total-completed;

        const overdue = tasks.filter((t) => t.deadline && new Date(t.deadline) < newDate() && t.status !== "completed").length

        res.json({
            total,
            completed,
            pending,
            overdue
        });
    
    }catch(err){
        console.log(err);
        res.status(500).json({msg: "Server error"});
    }
};