const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const axios = require("axios");

const {login} = require("./controllers/authController");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
// middleware
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/project", projectRoutes);
app.use("/task", taskRoutes);

console.log("Auth Routes loaded")

// test route
// app.get("/", (req, res) => {
//   res.send("API Running");
// });

app.get("/", (req,res) => {
  res.render("login");
})

app.get("/login", (req,res) => {
  res.render("login");
})

app.post("/login", login);

app.get("/dashboard", async(req,res) => {
  try{
  const tasks = await Task.find();
  res.render("dashboard", {tasks});
  }catch(err){
    console.log(err);
    res.render("dashboard", {tasks: []});
  }
})


app.get("/create-task", (req,res) => {
  res.render("createTask");
})

app.post("/create-task",  async (req,res)=> {
  try{
    const response = await axios.post(
      {
        title: req.body.title,
        description: req.body.description,
        projectId: req.body.projectId,
        assignedTo: req.body.assignedTo,
        deadline: req.body.deadline
      },
      {
        headers: {
          Authorization: `Bearer ${global.token}`
        }
      }
    );

    res.send("Task Created!");
  }catch(err){
    console.log(err);
    res.send("Error creating task");
  }
})

app.get("/dashboard/:projectId", (req, res) => {
  res.redirect(`/task/${req.params.projectId}`);
});



// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// start server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});


