const prisma = require("../../../services/prismaClient");
const geoapi = require("../../../services/geoapi");
const customAlphabet = require("nanoid").customAlphabet;

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 24)

module.exports = async (req, res) => {

    if(req.body.addressFrom === undefined || req.body.addressTo === undefined || req.body.price === undefined || req.body.weight === undefined){
        res.sendStatus(400);
        return;
    }

    const addressFrom = req.body.addressFrom;
    const addressTo = req.body.addressTo;
    const price = req.body.price;
    const weight = req.body.weight;
    const accessCode = req.body.accessCode;
    const description = req.body.description;

    const clientUuid = req.body.user.uuid;

    if(addressFrom.country === undefined || addressFrom.city === undefined || addressFrom.street === undefined || addressFrom.flatNumber === undefined || addressFrom.postCode === undefined) {
        res.sendStatus(400);
        return;
    }

    if(addressTo.country === undefined || addressTo.city === undefined || addressTo.street === undefined || addressTo.flatNumber === undefined || addressTo.postCode === undefined) {
        res.sendStatus(400);
        return;
    }

    let coordsFrom, coordsTo, calculatedDistance;

    try {
        coordsFrom = await geoapi.getCoordsByAddress(addressFrom);

        if(coordsFrom == null) {
            throw new Error('Address not found');
        }

        coordsTo = await geoapi.getCoordsByAddress(addressTo);
    
        if(coordsTo == null) {
            throw new Error('Address not found');
        }

        calculatedDistance = await geoapi.getDistance(coordsFrom, coordsTo);

        if(calculatedDistance === null) {
            throw new Error(`Could not calculate distance`);
        }
    
    } catch(e) {
        console.log(e);
        res.status(400).send(e.message);
        return;
    }

    const uuid = nanoid();
    
    try{

        const package = await prisma.package.create({
            data: {
                uuid: uuid,
                addressFrom: {
                    create: {
                        country: addressFrom.country,
                        city: addressFrom.city,
                        street: addressFrom.street,
                        flatNumber: addressFrom.flatNumber,
                        apartmentNumber: addressFrom.apartmentNumber,
                        postCode: addressFrom.postCode,
                        location: {
                            create: {
                                lat: coordsFrom.lat,
                                lon: coordsFrom.lon
                            }
                        }
                    }
                },
                addressTo: {
                    create: {
                        country: addressTo.country,
                        city: addressTo.city,
                        street: addressTo.street,
                        flatNumber: addressTo.flatNumber,
                        apartmentNumber: addressTo.apartmentNumber,
                        postCode: addressTo.postCode,
                        location: {
                            create: {
                                lat: coordsTo.lat,
                                lon: coordsTo.lon
                            }
                        }
                    }
                },
                price: price,
                weight: weight,
                distance: calculatedDistance,
                accessCode: accessCode,
                description: description
            },
            select: {
                id: true
            }
        });

        const client = await prisma.client.findFirst({
            where: {
                uuid: clientUuid
            },
            select: {
                id: true
            }
        });

        if (client === null) {
            res.sendStatus(401);
            return;
        }

        const startDate = new Date();

        await prisma.packageHistory.create({
            data: {
                packageId: package.id,
                clientId: client.id,
                startDate: startDate,
                status: "awaiting"
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