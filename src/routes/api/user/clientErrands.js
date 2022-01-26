const prisma = require("../../../services/prismaClient");

module.exports = async (req, res) => {
    
    const packages = await prisma.packageHistory.findMany({
        where: {
            client: {
                uuid: req.body.user.uuid
            }
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
                        } 
                    },
                    price: true,
                    weight: true,
                }
            },
            status: true
        }
    });

    res.json(packages);
    return;
}