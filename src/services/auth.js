const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = async (req, res, next) => {

    if(!req.headers.authorization) {
        res.status(401).send("No authorization token");
        return;
    }

    const token = req.headers.authorization.split(" ")[1];

    if(token === "") {
        res.status(401).send("No authorization token");
        return;
    }

    let user = null;
    
    jwt.verify(token, process.env.SECRET_TOKEN, (err, payload) => {
        if(err) {
            console.log(err);
            return;
        }

        user = payload;
    });
    
    if(!user) {
        res.status(401).send("Unathorized");
        return;
    }

    req.body.user = {
        uuid: user.uuid,
        role: user.role
    };

    next();
}