const sendWeatherRequest = require('./meteo/meteo');


// Saint-Mandé (94) - France
const geoLoc = {
    latitude: 48.84,
    longitude: 2.42
};

function fail(){
    throw new Error('Test failed !');
}

sendWeatherRequest(geoLoc).then(
    (result) => {
        console.log(result);

        if(result?.weathercode == undefined) fail();
        if(!result?.time) fail();
        if(result?.good == undefined) fail();
    }
);