const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=0fd71d38bcd9bca706526137dceb50ae&query=${latitude},${longitude}&units=m`;
    request(
        {
            url,
            json: true,
        },
        (error, { body }) => {
            if (error) {
                callback("Unable to connect to forecast services!", undefined);
            } else if (body.error) {
                callback("Unable to fetch forecast. Try another search.", undefined);
            } else {
                callback(
                    undefined,
                    `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees.`
                );
            }
        }
    );
};

module.exports = forecast;
