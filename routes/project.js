const router = require("express").Router();
const projects = require("../models/projects");
const NodeCache = require('node-cache');
const cache = new NodeCache({
    stdTTL: 600
});
const {
    verifyToken
} = require("../validation");

router.post("/", verifyToken, (req, res) => {

    data = req.body;

    projects.create(data)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        })
});


router.get("/all/:id/:email", verifyToken, async (req, res) => {
    const id = req.params.id;
    const email = req.params.email;

    try {

        let ownedProjects = await projects.find().where('ownerId').equals(id);
        let invitedProject = await projects.find().where('users').in([email])

        let data = ownedProjects.concat(invitedProject);

        res.send((data));

    }
    catch (err) {
        res.status(500).send({ message: err.message })
    }
});


router.get("/details/:id", verifyToken, async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        let data = await projects.findById(id);
        res.send(data)
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
        res.send((data));

    }
});

router.put("/:id", verifyToken, (req, res) => {

    const id = req.params.id;

    projects.findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Cannot update project :( id=" + id
                })
            } else {
                res.send({
                    message: "project is updated :)"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "error updating product with id=" + id
            });
        });

});

router.delete("/:id", verifyToken, (req, res) => {

    const id = req.params.id;

    projects.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Cannot delete project :( id=" + id
                })
            } else {
                res.send({
                    message: "Project is deleted :)"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "error deleting product with id=" + id
            });
        });

});



module.exports = router;