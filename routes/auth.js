const router = require("express").Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const {
    registerValidation
} = require('../validation');
const {
    loginValidation
} = require('../validation');
const {
    verifyToken
} = require("../validation");
const jwt = require('jsonwebtoken');
const users = require("../models/users");
const NodeCache = require('node-cache');
const validator = require('validator');
const cache = new NodeCache({
    stdTTL: 600
});

//picture upload/storage


router.post("/register", async (req, res) => {

    const {
        error
    } = registerValidation(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        })
    }

    const emailExist = await User.findOne({
        email: req.body.email
    });

    if (emailExist) {
        return res.status(400).json({
            error: "Email exists"
        });
    }


    const avatarImg = "https://i.stack.imgur.com/l60Hf.png";
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password,
        avatar: avatarImg
    });

    try {
        const savedUser = await user.save();
        res.json({
            message: "Succesful registration",
            error: null,
            data: savedUser._id
        });


    } catch (error) {
        res.status(400).json({
            error: "Unsuccesful registration"
        })
    }
});

router.put("/:id", verifyToken, async (req, res) => {


    const id = req.params.id;

    users.findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Cannot update user id=" + id
                })
            } else {
                res.send({
                    message: "user profile is updated"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "error updating user with id=" + id
            });
        });

});

router.get("/", /*verifyToken,*/ async (req, res) => {
    try {
        let usersCache = cache.get('allUsers');


        if (!usersCache) {
            let data = await users.find();
            console.log("No cache data found. Fetching from DB....");
            cache.set('allUsers', data, 30);

            res.send((data));
        } else {
            console.log("Cache found :]");
            res.send((usersCache));
        }

    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
});

router.get("/:userId", verifyToken, async  (req, res) => {
    const userId = req.params.userId;

        try{
            let usersCache = cache.get('userByUserId');
    
    
            if(!usersCache) {
                let data = await users.findById(userId);
                console.log("No cache data found. Fetching from DB....");
                //cache.set('userByUserId', data, 30);
    
                res.send((data));
            }
    
            else{
                console.log("Cache found :]");
                res.send((usersCache));
            }
    
        }
        catch(err){
            res.status(500).send({message: err.message})
        }
    });



router.post("/login", async (req, res) => {
    const {
        error
    } = loginValidation(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        })
    }

    //const emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    

    /*if (!emailFormat) {
        return res.status(400).json({
            error: "Incorrect email"
        });
    }*/
    
     const emailCheck = await User.findOne({
        email: req.body.email
    });

    if (!emailCheck) {
        return res.status(400).json({
            error: "Incorrect email"
        });
    }

    const user = await User.findOne({
        email: req.body.email
    });


    if (!user) {
        return res.status(400).json({
            error: "No user"
        });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword) {
        return res.status(400).json({
            error: "Wrong password"
        });
    }

    const token = jwt.sign({
            id: user._id,
        },
        process.env.TOKEN_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        },
    );

    res.header("auth-token", token).json({
        message: "Logged in succesfully",
        error: null,
        data: {
            token,
            userId: user._id,
            email: user.email,
        },

    });
})

module.exports = router;