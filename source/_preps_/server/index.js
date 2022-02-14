const http = require("http");
const url = require("url");
const router = require('./router');

// Make our HTTP server
const server = http.createServer(async (req, res) => {
  // Set our header
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Parse the request url
  req.parsed = url.parse(req.url, true);
  // Get the path from the parsed URL
  const reqUrl = req.parsed.pathname;
  const method = req.method;

  res.send = async(data) => {
    res.write(data);
    res.end();
  };

  try {
    router[reqUrl][method](req, res);
  } catch (error) {
    res.write(`[!] ERROR 404 : Unknown URL [ ${req.headers.host}${reqUrl} ]\n`);
    //res.write(JSON.stringify(req.headers, true, 2));
    res.end();
  }
});
// Have the server listen on port 9000
server.listen(9000);
