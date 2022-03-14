const prisma = require("../../../services/prismaClient");

module.exports = async (req, res) => {
    if (req.params.packageUuid === undefined) {
        res.sendStatus(400);
        return;
    }

    const packageUuid = req.params.packageUuid;

    try{
        const client = await prisma.client.findFirst({
            where: {
                uuid: req.body.user.uuid
            },
            select: {
                id: true
            }
        });

        if (client === null) {
            res.sendStatus(401);
            return;
        }
        
        const package = await prisma.package.findFirst(
            {
                where: { 
                    uuid: packageUuid
                },
                select: {
                    id: true
                }
            }
        )

        if (package === null) {
            res.sendStatus(400);
            return;
        }

        const packageHistory = await prisma.packageHistory.findFirst(
            {
                where: { 
                    packageId: package.id
                },
                select: {
                    id: true,
                    clientId: true
                }
            }
        )

        if (packageHistory.clientId !== client.id){
            res.sendStatus(400);
            return;
        }

        await prisma.packageHistory.delete(
            {
                where: {
                    id: packageHistory.id
                }
            }
        )

        await prisma.package.delete(
            {
                where: {
                    id: package.id
                }
            }
        )

        res.send("OK");
        return;
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
        return;
    }
}