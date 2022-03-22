const prisma = require("../../../services/prismaClient.js");
const customAlphabet = require("nanoid").customAlphabet;
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const fetch = require("node-fetch");

dotenv.config()

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 24)

module.exports = async (req, res) => {

    if(req.body.email === undefined || req.body.name === undefined || req.body.lastname === undefined || req.body.address === undefined || req.body.password === undefined) {
        res.sendStatus(400);
        return;
    }

    const address = req.body.address;

    if(address.country === undefined || address.city === undefined || address.street === undefined || address.flatNumber === undefined || address.postCode === undefined) {
        res.sendStatus(400);
        return;
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const lastname = req.body.lastname;

    const foundClient = await prisma.client.count({
        where: {
            email: req.body.email
        }
    });

    const foundCourier = await prisma.courier.count({
        where: {
            email: req.body.email
        }
    });

    if(foundClient > 0 || foundCourier > 0) {
        res.status(400).send("User already exists")
        return;
    }

    const uuid = nanoid();
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);


    //get coords from geo api
    let lat, lon;
    
    let url = `https://api.geoapify.com/v1/geocode/search?text=${address.street} ${address.flatNumber} ${address.postCode} ${address.city} ${address.country}&apiKey=${process.env.GEO_API_KEY}`
    
    await fetch(url, { method: "GET" })
        .then(response => response.json())
        .then(data => {
            lat = data.features[0].properties.lat;
            lon = data.features[0].properties.lon;
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
            return;
        })

    try {
        await prisma.client.create({
            data: {
                uuid: uuid,
                email: email,
                name: name,
                lastname: lastname,
                address: {
                    create: {
                        country: address.country,
                        city: address.city,
                        street: address.street,
                        flatNumber: address.flatNumber,
                        apartmentNumber: address.apartmentNumber,
                        postCode: address.postCode,
                        location: {
                            create: {
                                lat: lat,
                                lon: lon
                            }
                        }
                    }
                },
                hash: hash
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