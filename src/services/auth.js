const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = async (req, res, next) => {

    if(!req.headers.authorization) {
        res.status(401).send("No authorization token");
        return;
    }

    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET_TOKEN);
    
    req.body.user = {
        uuid: user.uuid
    };
    next();
}