const http = require("http");
const url = require("url");
const router = require('./router');

// Make our HTTP server
const server = http.createServer(async (req, res) => {

  res.send = async(data) => {
    res.write(data);
    return res.end();
  };

  res.setHeader("Access-Control-Allow-Origin", "*");
  req.parsed = url.parse(req.url, true);

  const reqUrl = req.parsed.pathname;
  const method = req.method;

  try {
    return router[reqUrl][method](req, res);
  } catch (error) {
    return res.send(`[!] ERROR 404 : Unknown URL [ ${req.headers.host}${reqUrl} ]\n`);
  }
});

server.listen(9000);
