const httpClient = require('./https-client');


// URL du endpoint API météo




const sendWeatherRequest = function(geoloc) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${geoloc.latitude}&longitude=${geoloc.longitude}&current_weather=true`;

  return new Promise((resolve) => {
    httpClient.sendRequest(url)
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

