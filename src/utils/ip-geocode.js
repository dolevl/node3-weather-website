const request = require("request");

const geocode = (address, callback) =>
{
    const url = "http://ipinfo.io/" + encodeURIComponent(address) + "/json"
    request({url, json: true}, (error, {body}) =>
    {
        if (error)
        {
            callback('Unable to connect to location services!', undefined)
        }
        else if (!body.loc) {
            callback("Unable to find location. Try another search", undefined)
        }
        else
        {
            // console.log("Latitude is " + center[1] + " and longitude is " + center[0] + ".")
            callback(undefined, {latitude: body.loc.substr(0, body.loc.indexOf(','), body.loc.indexOf(',')),
                longitude: body.loc.substr(body.loc.indexOf(',')+1),
                location: body.city + ", " + body.region + ", " + body.country})
        }
    })
}

module.exports = geocode