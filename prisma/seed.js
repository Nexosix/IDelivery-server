const prisma = require("../src/services/prismaClient");

const clients = [
    {
        email: "clientOne@client.com",
        password: "test",
        name: "Klient",
        lastname: "Jeden",
        address: {
            country: "Polska",
            city: "Szczecin",
            street: "Żołnierska",
            flatNumber: "40",
            postCode: "71-210",
            location: {
                lat: 53.44609651282099,
                lon: 14.494167555502678
            }
        }
    },
    {
        email: "clientTwo@client.com",
        password: "test",
        name: "Klient",
        lastname: "Dwa",
        address: {
            country: "Polska",
            city: "Szczecin",
            street: "Żołnierska",
            flatNumber: "50",
            postCode: "71-210",
            location: {
                lat: 53.44763229018578, 
                lon: 14.491334882811726
            }
        }
    }
]

const couriers = [
    {
        email: "courierOne@client.com",
        password: "test",
        name: "Kurier",
        lastname: "Jeden",
    },
    {
        email: "courierTwo@client.com",
        password: "test",
        name: "Kurier",
        lastname: "Dwa",
    }
]

const packages = [
    {
        addressFrom: {
            country: "Polska",
            city: "Szczecin",
            street: "Klemensa Janickiego",
            flatNumber: "33",
            postCode: "71-270"
        },
        addressTo: {
            country: "Polska",
            city: "Szczecin",
            street: "Żołnierska",
            flatNumber: "40",
            postCode: "71-210"
        },
        price: 5,
        weight: 20,
        distance: 800
    },
    {
        addressFrom: {
            country: "Polska",
            city: "Szczecin",
            street: "Klemensa Janickiego",
            flatNumber: "22",
            postCode: "71-270"
        },
        addressTo: {
            country: "Polska",
            city: "Szczecin",
            street: "Żołnierska",
            flatNumber: "40",
            postCode: "71-210"
        },
        price: 5,
        weight: 20,
        distance: 1200
    },
    {
        addressFrom: {
            country: "Polska",
            city: "Szczecin",
            street: "Sosabowskiego",
            flatNumber: "2",
            postCode: "71-213"
        },
        addressTo: {
            country: "Polska",
            city: "Szczecin",
            street: "Żołnierska",
            flatNumber: "50",
            postCode: "71-210"
        },
        price: 5,
        weight: 20,
        distance: 1400
    },
    {
        addressFrom: {
            country: "Polska",
            city: "Szczecin",
            street: "Sosabowskiego",
            flatNumber: "12",
            postCode: "71-213"
        },
        addressTo: {
            country: "Polska",
            city: "Szczecin",
            street: "Żołnierska",
            flatNumber: "50",
            postCode: "71-210"
        },
        price: 5,
        weight: 20,
        distance: 1500
    }
]

const main = async () => {

}
main().catch((err) => {console.error(err);})