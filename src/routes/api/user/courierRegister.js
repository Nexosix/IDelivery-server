const prisma = require("../../../services/prismaClient");
const customAlphabet = require("nanoid").customAlphabet;
const bcrypt = require("bcrypt");

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 24)

module.exports = async (req, res) => {

    if(req.body.email === undefined || req.body.name === undefined || req.body.lastname === undefined || req.body.password === undefined) {
        res.sendStatus(400);
        return;
    }

    //TODO: handle document input

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const lastname = req.body.lastname;

    const foundClient = await prisma.client.count({
        where: {
            email: req.body.email
        }
    });

    const foundCourier = await prisma.courier.count({
        where: {
            email: req.body.email
        }
    });

    if(foundClient > 0 || foundCourier > 0) {
        res.status(400).send("User already exists")
        return;
    }

    const uuid = nanoid();
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const expireDate = new Date();
    expireDate.setFullYear(expireDate.getFullYear() + 1);

    try {
        await prisma.courier.create({
            data: {
                uuid: uuid,
                email: email,
                name: name,
                lastname: lastname,
                active: 1,
                expireDate: expireDate,
                hash: hash
            }
        });

        res.send("OK");
        return;
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
        return;
    }
}