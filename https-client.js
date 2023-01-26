const https = require('https');

const httpClient = {
  sendRequest: function(url, handler) {
    https.get(url, res => {
      let data = [];
  
      res.on('data', chunk => {
        data.push(chunk);
      });
  
      res.on('end', () => {
        const weatherJSON = Buffer.concat(data).toString();
        handler(weatherJSON)
      });
  
    }).on('error', err => { throw new Error(err.message) });
  }
};

module.exports = httpClient;

