const prisma = require("../../../../services/prismaClient");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {

    if(req.body.email === undefined || req.body.password === undefined) {
        res.sendStatus(400);
        return;        
    }

    const email = req.body.email;
    const plainPassword = req.body.password;

    try {
        const storedUser = await prisma.client.findFirst({
            where: {
                email: email
            },
            select: {
                hash: true
            }
        });

        if(!storedUser) {
            res.status(401).send("Invalid credentials");
            return;
        }

        const match = await bcrypt.compare(plainPassword, storedUser.hash);

        if(match) {
            res.send("Logged in");
            return;
        } else {
            res.status(401).send("Invalid credentials");
            return;
        }

    } catch(e) {
        console.log(e);
        res.sendStatus(500);
        return;
    }
}