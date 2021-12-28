const request = require('request')


const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8cd9aae2e4d8576dbbbb229f6f52be20&query=' + longitude + ',' + latitude
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error) {
            callback("Unable to find location.", undefined)
        }
    else
        {
        const {temperature, feelslike} = body.current
            callback(undefined, {
                weather: body.current.weather_descriptions[0],
                temperature,
                feelslike
            })
        }
    })
}

module.exports = forecast