const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();

const getCoordsByAddress = async (address) => {

    let url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.LOCATION_IQ_API_KEY}&q=${address.street} ${address.flatNumber} ${address.city} ${address.country}&format=json`;

    const response = await fetch(url, { method: "GET" })

    if (!response.ok) {
        throw new Error(`Could not get coordinates from geo api (response status: ${response.status})`)
    }
    
    const data = await response.json();

    if(data.length == 0) {
        return null;
    }

    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);

    return {lat, lon};
}

const getDistance = async (coordsFrom, coordsTo, delay=false) => {
    
    if(delay) {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const url = `https://eu1.locationiq.com/v1/matrix/driving/${coordsFrom.lon},${coordsFrom.lat};${coordsTo.lon},${coordsTo.lat}?sources=0&annotations=distance&key=${process.env.LOCATION_IQ_API_KEY}`

    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
        throw new Error(`Could not get distance from geo api (response status code: ${response.status})`);
    }

    const data = await response.json();

    if(data.code != "Ok") {
        throw new Error(`Could not get distance from geo api (external status code: ${data.code})`);
    }

    const distance = data.distances[0][1];
    return parseInt(Math.round(distance));
}

module.exports = {
    getCoordsByAddress,
    getDistance
}