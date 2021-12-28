const request = require("request");
const geocode = (address, callback) =>
{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?limit=1&access_token=pk.eyJ1IjoiZG9sZXZsIiwiYSI6ImNreG4yaWlzNDBpenIydXJ6OHh2bWVhYzQifQ.0wXW8tgBYEdnaoHmD4dg1g"
    request({url, json: true}, (error, {body}) =>
    {
        if (error)
        {
            callback('Unable to connect to location services!', undefined)
        }
        else if (body.features.length == 0) {
            callback("Unable to find location. Try another search", undefined)
        }
        else
        {
            const center = body.features[0].center
            // console.log("Latitude is " + center[1] + " and longitude is " + center[0] + ".")
            callback(undefined, {latitude: center[1], longitude: center[0], location: body.features[0].place_name})
        }
    })
}

module.exports = geocode