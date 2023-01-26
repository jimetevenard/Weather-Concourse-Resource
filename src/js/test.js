const sendWeatherRequest = require('./meteo/meteo');

sendWeatherRequest().then(
    (result) => console.log(result)
);