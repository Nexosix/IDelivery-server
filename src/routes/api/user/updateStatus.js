const prisma = require("../../../services/prismaClient");

module.exports = async (req, res) => {
    const userRole = req.body.user.role;

    if (req.params.packageUuid === undefined) {
        res.sendStatus(400);
        return;
    }

    const packageUuid = req.params.packageUuid;

    try{
        const courier = await prisma.courier.findFirst({
            where: {
                uuid: req.body.user.uuid
            },
            select: {
                id: true
            }
        });

        const client = await prisma.client.findFirst({
            where: {
                uuid: req.body.user.uuid
            },
            select: {
                id: true
            }
        });

        if (courier === null && client === null) {
            res.sendStatus(401);
            return;
        }

        const packageHistory = await prisma.packageHistory.findFirst(
            {
                where: { 
                    package: {
                        uuid: packageUuid
                    }
                },
                select: {
                    id: true,
                    status: true
                }
            }
        )
        
        let dataToUpdate = null;
        switch(packageHistory.status) {
            case "awaiting":
                if (userRole === 'courier'){
                    dataToUpdate = {
                        "courierId": courier.id,
                        "status": "reserved"
                    }
                }
                break;
            
            default:
                res.sendStatus(400)
                break;
        }

        await prisma.packageHistory.update(
            {
                data: dataToUpdate,
                where: {
                    id: packageHistory.id
                }
            }
        )

        res.send("OK")
        return;
    }catch(e){
        console.log(e);
        res.sendStatus(500);
        return;
    }
}