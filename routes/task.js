const router = require ("express").Router();
const tasks = require("../models/tasks");
const { verifyToken } = require("../validation");

router.post("/", async (req, res) => {
    const task = new tasks({...req.body,projects:req._id})
    data = req.body;

    tasks.insertMany(data)
    .then(data => { res.status(200).send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); });

});

router.get("/", (req, res) => {

    tasks.find()
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); });

});

router.get("/:id", (req, res) => {

    tasks.findById(req.params.id)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); });

});

router.put("/:id", (req, res) => {

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

router.delete("/:id", (req, res) => {

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