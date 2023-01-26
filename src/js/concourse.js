const sendMeteoRequest = require('./meteo/meteo');
const fs = require('fs');

const IN_FLAG = "--in";
const CHECK_FLAG = "--check";

/**
 * Le format d'input sera le suivant :
 * <code>
    {
      "source": {
        "latitude": 48.84,
        "longitude": 2.42
      },
      "version": { "time": "2023-01-26T17:00" } // La dernière version connue de Concourse
    }
 * </code>
 * 
 * Depuis la config YAML suivante :
 * <code>
    resources:
    - name: blop
      type: weather
      source:
        latitude: 48.84
        longitude: 2.42
 * </code>
 */
process.stdin.on('data', data => {
    const input = JSON.parse(data.toString());

    if(!(input.source && input.source.latitude && input.source.longitude)){
      throw new Error('Invalid input format !');
    }

    sendMeteoRequest(input.source)
      .then(result => {
        const operation = process.argv[2];
        switch(operation){

          case IN_FLAG:
            const resultPath = process.argv[3] + '/weather.json';
            fs.writeFileSync(resultPath, JSON.stringify(result));
            console.log(JSON.stringify({
              version: { time: result.time },
              metadata: []
            }));
            break;

          case CHECK_FLAG:
            console.log(JSON.stringify([{time: result.time}]));
            break;

          default:
            throw new Error('Unsupported operation');
        }
      });
    
});
