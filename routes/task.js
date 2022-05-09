const router = require ("express").Router();
const tasks = require("../models/tasks");
const users = require("../models/users");
const projects = require("../models/projects");
const { verifyToken } = require("../validation");
const NodeCache = require('node-cache');
const cache = new NodeCache({stdTTL: 600});

router.post("/", /*verifyToken,*/ async (req, res) => {
    const user = new users({...req.body,user:req._id})
    const project = new projects({...req.body,projects:req._id})

    data = req.body;

    tasks.insertMany(data)
    .then(data => { res.status(200).send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); });

});

router.get("/", verifyToken, async (req, res) => {
    try{
        let taskCache = cache.get('allTasks');


        if(!taskCache) {
            let data = await tasks.find();
            console.log("No cache data found. Fetching from DB....");
            cache.set('allTasks', data, 30);

            res.send((data));
        }

        else{
            console.log("Cache found :]");
            res.send((taskCache));
        }

    }
    catch(err){
        res.status(500).send({message: err.message})
    }
});

router.get("/:id", verifyToken, (req, res) => {

    tasks.findById(req.params.id)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); });

});

router.put("/:id", verifyToken, (req, res) => {

    const id = req.params.id;

    tasks.findByIdAndUpdate(id, req.body)
    .then(data => { 
        if(!data)
        {
            res.status(404).send({message: "Cannot update project :( id=" + id})
        }
        else
        {
            res.send({ message: "project is updated :)"})
        }
    })
    .catch(err => { res.status(500).send({ message: "error updating product with id=" + id }); });

});

router.delete("/:id", verifyToken, (req, res) => {

    const id = req.params.id;

    tasks.findByIdAndDelete(id)
    .then(data => { 
        if(!data)
        {
            res.status(404).send({message: "Cannot delete project :( id=" + id})
        }
        else
        {
            res.send({ message: "Project is deleted :)"})
        }
    })
    .catch(err => { res.status(500).send({ message: "error deleting product with id=" + id }); });

});

module.exports = router;