const http = require('http');

doRequest = async (url) => new Promise((resolve, reject) => {
  http.get(url, res => {
    let data = [];

    res.on('data', chunk => {
      data.push(chunk);
    });

    res.on('end', () => {
      resolve(JSON.parse(Buffer.concat(data).toString()));
    });
  }).on('error', err => {
    reject(err.message);
  });
}).catch(err => console.log(err));


demo_01 = async () => console.log(await doRequest("http://localhost:3000/api"));

demo_01();
