const prisma = require("../../../../services/prismaClient");

module.exports = async (req, res) => {

    try {
        // await prisma.client.create({
        //     data: {
        //         name: "User1",
        //         lastname: "Lastname"
        //     }
        // })

        res.send("OK");
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}