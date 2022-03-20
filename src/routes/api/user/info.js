const prisma = require("../../../services/prismaClient");

module.exports = async (req, res, next) => {
    
    let user = null;
    if(req.body.user.role === "client") {
        user = await prisma.client.findFirst({
            where: {
                uuid: req.body.user.uuid
            },
            select: {
                name: true,
                lastname: true,
                address: true
            }
        });
    } else if(req.body.user.role === "courier") {
        user = await prisma.courier.findFirst({
            where: {
                uuid: req.body.user.uuid
            },
            select: {
                name: true,
                lastname: true,
            }
        });
    }
    
    if(user === null) {
        res.sendStatus(400);
        return;
    }
    
    res.json({
        role: req.body.user.role,
        name: user.name,
        lastname: user.lastname
    });
    return;
}