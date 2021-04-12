const request = require('request')
const forecast = (long, lat, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=99e80e271ea670c12990ef0c239d668a&query=" + long + ',' + lat

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('no internet', undefined)
        } else if (body.error) {
            callback('no location found', undefined)
        } else {
            callback(undefined, 'it is ' + body.current.weather_descriptions[0] + ' out there with temperature: ' + body.current.temperature +'°C'
            )
        }
    })
}
module.exports = forecast