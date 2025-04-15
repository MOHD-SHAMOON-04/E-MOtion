import fetch from 'node-fetch';

async function geocodeAddress(address, apiKey) {
    const url = `https://atlas.mappls.com/advancedmaps/v1/${apiKey}/geoCode?addr=${encodeURIComponent(address)}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data && data.copResults && data.copResults.length > 0) {
        const { lat, lng } = data.copResults[0];
        return { lat, lng };
    } else {
        throw new Error("No results found.");
    }
}

import dotenv from 'dotenv';
dotenv.config();
const apiKey = process.env.MAP_API;
// Example usage:
geocodeAddress("India Gate, New Delhi", apiKey).then(console.log);
