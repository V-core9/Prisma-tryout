const http = require("http");
const url = require("url");
const router = require('./router');

const server = http.createServer(async (req, res) => {

  res.send = async(data) => {
    res.write(data);
    return res.end();
  };

  req.parsed = url.parse(req.url, true);
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    return router[req.parsed.pathname][req.method](req, res);
  } catch (error) {
    return res.send(`[!] ERROR 404 : Unknown URL [ ${req.headers.host}${req.parsed.pathname} ]\n`);
  }

});

server.listen(9000);
