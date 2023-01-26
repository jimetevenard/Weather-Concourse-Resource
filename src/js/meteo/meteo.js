const httpClient = require('./https-client');

// Saint-Mandé (94) France
const geoLoc = {
  lat: 48.84,
  long: 2.42
};

// URL du endpoint API météo
const URL = `https://api.open-meteo.com/v1/forecast?latitude=${geoLoc.lat}&longitude=${geoLoc.long}&current_weather=true`;



const sendWeatherRequest = function() {
  return new Promise((resolve) => {
    httpClient.sendRequest(URL)
      .then(weatherJSON => {
        const weatherObject = JSON.parse(weatherJSON);
        const weathercode = weatherObject.current_weather.weathercode;
        const time = weatherObject.current_weather.time;

        // https://open-meteo.com/en/docs#weathervariables
        const goodWeatherCodes = [0, 1, 2, 3];

        const isWeatherGood = goodWeatherCodes.includes(weatherObject.current_weather.weathercode);
        resolve({
            weathercode,
            time,
            good: isWeatherGood
        });
      });
  });
};

module.exports = sendWeatherRequest;

