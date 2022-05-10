const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");
const taskRoutes = require("./routes/task");
const uploadRoutes = require("./routes/image");
const swaggerUI= require('swagger-ui-express');
const yaml = require('yamljs');
const { TokenExpiredError } = require("jsonwebtoken");

const swaggerDefinition = yaml.load('./swagger.yaml');
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDefinition));

require("dotenv-flow").config();

app.use(bodyParser.json());

app.use(function (req, res, next) {
 res.header("Access-Control-Allow-Origin", "*")
 res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept")
 res.header('Access-Control-Allow-Credentials', true);
 if (req.method === "OPTION"){
    res.header("Access-Control-Allow-Method", "GET, HEAD, OPTION, POST, PUT, DELETE");
    return res.status(200).json({});
} 
 next();
})


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
app.use("/api/users", authRoutes);
app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, function(){
    console.log("Server is running on port:" + PORT);
})

module.exports = app;