const prisma = require("../../../services/prismaClient");

module.exports = async (req, res) => {
    const userRole = req.body.user.role;

    if (userRole !== "courier"){
        console.log(req.body.user)
        res.sendStatus(403);
        return;
    }

    try{
        const courier = await prisma.courier.findFirst({
            where: {
                uuid: req.body.user.uuid
            },
            select: {
                id: true
            }
        });

        if (courier === null) {
            res.sendStatus(401);
            return;
        }

        const packages = await prisma.packageHistory.findMany({
            where: {
                OR: [
                    {
                        status: {
                            equals: 'awaiting'
                        }
                    },
                    {
                        courierId: courier.id
                    }
                ]
                
            },
            select: {
                package: {
                    select: {
                        uuid: true,
                        addressFrom: {
                            select: {
                                country: true,
                                city: true,
                                street: true,
                                flatNumber: true,
                                apartmentNumber: true,
                                postCode: true,
                                location: {
                                    select: {
                                        lat: true,
                                        lon: true
                                    }
                                }
                            }
                            
                        },
                        addressTo: {
                            select: {
                                country: true,
                                city: true,
                                street: true,
                                flatNumber: true,
                                apartmentNumber: true,
                                postCode: true,
                                location: {
                                    select: {
                                        lat: true,
                                        lon: true
                                    }
                                }
                            } 
                        },
                        price: true,
                        weight: true,
                        distance: true,
                    }
                },
                status: true
            }
        })

        res.json(packages);
        return;
    }catch(e){  
        console.log(e);
        res.sendStatus(500);
        return;
    }
}