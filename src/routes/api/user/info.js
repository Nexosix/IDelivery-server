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
                address: {
                    select: {
                        country: true,
                        city: true,
                        street: true,
                        flatNumber: true,
                        apartmentNumber: true,
                        postCode: true
                    }
                }
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
        lastname: user.lastname,
        address: user.address ? user.address : null,
    });
    return;
}