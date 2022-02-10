const nanoexpress = require('nanoexpress');
const app = nanoexpress();
const port = 3200;

const http = require('http');

app.get('/*', async (req, res) => {
  http.get("http://localhost:3000"+req.url, rez => {
    let data = [];
    rez.on('data', chunk => {
      data.push(chunk);
    });

    rez.on('end', () => {
      res.send(Buffer.concat(data).toString());
    });
  }).on('error', err => {
    console.log(err.message);
  });
});
app.listen(port);
