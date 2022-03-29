const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");
const taskRoutes = require("./routes/task");

require("dotenv-flow").config();

app.use(bodyParser.json());

mongoose.connect(
process.env.DBHOST,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
).catch (error => console.log ("Can't connect" + error));

mongoose.connection.once("open", () => console.log("Connected to mongodb"));


//routes
app.get("/api/welcome", (req, res) => {
    res.status(200).send({ message: "Welcome"});
})

app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/user", authRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, function(){
    console.log("Server is running on port:" + PORT);
})

module.exports = app;