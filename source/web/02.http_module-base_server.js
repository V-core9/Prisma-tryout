var http = require('http');
var url = require('url');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

appModels = async () => {
  return Object.keys(prisma._dmmf.modelMap).map(name => name.toLowerCase());
};

parseURL = async (req) => {
  return url.parse(req.url, true);
};

jsonData = async (req, res) => {
  return JSON.stringify({
    location: req.url,
    query: await parseURL(req),
    models: await appModels(),
  }, true, 2);
};

reqResp = async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/json' });
  res.end(await jsonData(req, res),'utf-8');
};


http.createServer(async (req, res) => await reqResp(req, res)).listen(8080);

//------------------------------------------------------------------------------
//? This one handles ~20k req/sec
//! Missing some usable routing logic.
