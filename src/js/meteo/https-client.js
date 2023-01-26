const https = require('https');

const httpClient = {
  sendRequest: function(url) {

    return new Promise((resolve, reject) => {
      https.get(url, res => {
        let data = [];
    
        res.on('data', chunk => {
          data.push(chunk);
        });
    
        res.on('end', () => {
          const weatherJSON = Buffer.concat(data).toString();
          resolve(weatherJSON)
        });
    
      }).on('error', err => { reject(err) });
    })
  }
};

module.exports = httpClient;

