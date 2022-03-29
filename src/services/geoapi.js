const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();

const getCoordsByAddress = async (address) => {

    let url = `https://api.geoapify.com/v1/geocode/search?text=${address.street} ${address.flatNumber} ${address.postCode} ${address.city} ${address.country}&apiKey=${process.env.GEO_API_KEY}`

    const response = await fetch(url, { method: "GET" })

    if (!response.ok) {
        throw new Error(`Could not get coordinates from geo api (response status: ${response.status})`)
    }
    
    const data = await response.json();

    if(data.features[0] == undefined) {
        return null;
    }

    const lat = parseFloat(data.features[0].properties.lat);
    const lon = parseFloat(data.features[0].properties.lon);

    return {lat, lon};
}

const getDistance = async (coordsFrom, coordsTo) => {
    
    const url = `https://api.geoapify.com/v1/routematrix?apiKey=${process.env.GEO_API_KEY}`

    const payload = {
        mode: "walk",
        sources: [
            { location: [coordsFrom.lon, coordsFrom.lat] }
        ],
        targets: [
            { location: [coordsTo.lon, coordsTo.lat] }
        ]
    }

    const opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }

    const response = await fetch(url, opts);

    if (!response.ok) {
        throw new Error(`Could not get distance from geo api (response status: ${response.status})`);
    }

    const data = await response.json();

    if(data.sources_to_targets[0][0].distance == null) {
        return null;
    }

    return parseInt(data.sources_to_targets[0][0].distance);
}

module.exports = {
    getCoordsByAddress,
    getDistance
}