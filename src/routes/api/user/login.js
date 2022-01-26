const prisma = require("../../../services/prismaClient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require('dotenv').config();

module.exports = async (req, res) => {

    if(req.body.email === undefined || req.body.password === undefined) {
        res.sendStatus(400);
        return;        
    }

    const email = req.body.email;
    const plainPassword = req.body.password;

    try {
        let storedUser = await prisma.client.findFirst({
            where: {
                email: email
            },
            select: {
                uuid: true,
                hash: true
            }
        });

        let accountType = null;
        if(!storedUser) {

            storedUser = await prisma.courier.findFirst({
                where: {
                    email: email
                },
                select: {
                    hash: true
                }
            });
    
            if(storedUser) {
                accountType = "courier";
            } else {
                res.status(401).send("Invalid credentials");
                return;
            }
        } else {
            accountType = "client";
        }

        const match = await bcrypt.compare(plainPassword, storedUser.hash);

        if(!match) {
            res.status(401).send("Invalid credentials");
            return;
        }

        const accessToken = jwt.sign({ uuid: storedUser.uuid, role: accountType }, process.env.SECRET_TOKEN);
        const refreshToken = jwt.sign({ uuid: storedUser.uuid, role: accountType }, process.env.SECRET_REFRESH_TOKEN);

        res.json({
            accountType: accountType,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
        return;

    } catch(e) {
        console.log(e);
        res.sendStatus(500);
        return;
    }
}