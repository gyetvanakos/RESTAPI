const router = require ("express").Router();
const projects = require ("../models/projects");

router.post("/", (req, res) => {

    data = req.body;

    projects.insertMany(data)
    .then(data => { res.status(200).send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); });

});

router.get("/", (req, res) => {

    projects.find()
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); });

});

router.get("/:id", (req, res) => {

    projects.findById(req.params.id)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({ message: err.message }); });

});

router.put("/:id", (req, res) => {

    const id = req.params.id;

    projects.findByIdAndUpdate(id, req.body)
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

    projects.findByIdAndDelete(id)
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