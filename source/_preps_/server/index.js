const http = require("http");
const url = require("url");
const router = require('./router');

const core = http.createServer(async (req, res) => {

  res.send = async (data) => {
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

addRoute = async (method, path, callback) => {
  if (Object.keys(router).indexOf(path) > -1) {
    router[path][method] = callback;
  } else {
    router[path] = {};
    router[path][method] = callback;
  }
};

core.get = async (path, callback) => {
  return await addRoute("GET", path, callback);
};

core.post = async (path, callback) => {
  return await addRoute("POST", path, callback);
};

core.put = async (path, callback) => {
  return await addRoute("PUT", path, callback);
};

core.delete = async (path, callback) => {
  return await addRoute("DELETE", path, callback);
};

module.exports = core;
