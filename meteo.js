const httpClient = require('./https-client');

// Saint-Mandé (94) France
const geoLoc = {
  lat: 48.84,
  long: 2.42
};

// URL du endpoint API météo
const URL = `https://api.open-meteo.com/v1/forecast?latitude=${geoLoc.lat}&longitude=${geoLoc.long}&current_weather=true`;

// Fonction de traitement du code météo
const handleWeatherCode = function (weatherJSON) {

  const weathercode = JSON.parse(weatherJSON).current_weather.weathercode;

  // https://open-meteo.com/en/docs#weathervariables
  const goodWeatherCodes = [0, 1, 2, 3];

  if (goodWeatherCodes.includes(weathercode)) {
    console.log('Il fait beau ! ' + weathercode);
  } else {
    throw new Error('Il ne fait pas beau ! ' + weathercode);
  }
};

httpClient.sendRequest(URL, handleWeatherCode);



