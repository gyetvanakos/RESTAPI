const joi = require('joi');
const jwt = require('jsonwebtoken')

const registerValidation = (data) => {
    const schema = joi.object(
        {
            first_name: joi.string().max(255).required(),
            last_name: joi.string().max(255).required(),
            email: joi.string().max(255).required(),
            password: joi.string().min(6).max(255).required(),
        });
    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = joi.object(
        {
            email: joi.string().min(6).max(255).required(),
            password: joi.string().min(6).max(255).required()
        });
    return schema.validate(data);
}

const verifyToken = (req, res, next) => {
    const token = req.header("auth-token")

    if (!token) return res.status(401).json({error: "Acces denied"});

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch{
        res.status(400).json({error: "Token is not valid"});
    }
} 


module.exports = { registerValidation, loginValidation, verifyToken };