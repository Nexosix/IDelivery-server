const prisma = require("../../../../services/prismaClient");
const customAlphabet = require("nanoid").customAlphabet;
const bcrypt = require("bcrypt");

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 24)

module.exports = async (req, res) => {

    if(req.body.email === undefined || req.body.name === undefined || req.body.lastname === undefined || req.body.address === undefined || req.body.password === undefined) {
        res.sendStatus(400);
        return;
    }

    const address = req.body.address;

    if(address.country === undefined || address.city === undefined || address.street === undefined || address.flatNumber === undefined || address.postCode === undefined) {
        res.sendStatus(400);
        return;
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const lastname = req.body.lastname;

    const found = await prisma.client.count({
        where: {
            email: req.body.email
        }
    });

    if(found > 0) {
        res.status(400).send("User already exists")
        return;
    }

    const uuid = nanoid();
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    try {
        await prisma.client.create({
            data: {
                uuid: uuid,
                email: email,
                name: name,
                lastname: lastname,
                address: {
                    create: {
                        country: address.country,
                        city: address.city,
                        street: address.street,
                        flatNumber: address.flatNumber,
                        apartmentNumber: address.apartmentNumber,
                        postCode: address.postCode
                    }
                },
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