const express = require('express');
const app = express();
//const User = require('../models/users');
const multer = require('multer');
//const path = require('path');
const router = require("express").Router();


/*app.use(express.static(__dirname+"./public/"));


const Storage = multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req, file, cb)=>{
        cb(null,file.fieldname+"_"+path.extname(file.originalname));
    }
});

const upload = multer({
    storage:Storage
}).single('file');*/

const imageStorage = multer.diskStorage({     
    destination: 'images', 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 1000000
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
}) 

router.post('/uploadImage', imageUpload.single('image'), (req, res) => {
    res.send(req.file)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


/*router.get('/upload', function(req, res, next){

    res.render('upload-file', {title: 'Upload file', succes:''});
    
})*/

module.exports = router;