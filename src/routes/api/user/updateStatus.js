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

        if (userRole === 'courier'){
            switch(packageHistory.status) {
                case "awaiting":
                    dataToUpdate = {
                        "courierId": courier.id,
                        "status": "reserved"
                    }
                    break;
                
                case "reserved":
                    dataToUpdate = {
                        "status": "ongoing"
                    }
                    break;

                case "ongoing":
                    dataToUpdate = {
                        "status": "delivered"
                    }
                    break;
                
                default:
                    res.sendStatus(400);
                    break;
            }
        } else if(userRole === 'client'){
            if (packageHistory.status !== 'delivered'){
                res.sendStatus(400);
                return;
            }
            dataToUpdate = {
                "status": "received"
            }
        }

        await prisma.packageHistory.update(
            {
                data: dataToUpdate || undefined,
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