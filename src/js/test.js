const sendWeatherRequest = require('./meteo/meteo');


// Saint-Mandé (94) France
const geoLoc = {
    latitude: 48.84,
    longitude: 2.42
};

sendWeatherRequest(geoLoc).then(
    (result) => console.log(result)
);